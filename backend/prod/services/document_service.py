from pathlib import Path
from fastapi import HTTPException, UploadFile
import tempfile
import os
from uuid import uuid4

from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from prod.core.config import settings
from prod.services.vector_store import create_chroma_dir_if_needed, get_vector_store


class DocumentService:
    async def upload_pdf(self, file:UploadFile , user_session_id) -> None:
        temp_path: str | None = None
        try:
            content = await file.read()
            self._validate_upload(file, content)

            temp_path = self._write_temp_pdf(content)
                
            pages = self._load_pdf(temp_path)
            self._add_metadata(pages, file.filename or 'unknown.pdf')

            chunks = self._split_documents(pages)
            self._save_chunks(chunks,user_session_id)

        finally:
            if temp_path and os.path.exists(temp_path):
                os.remove(temp_path)


    def list_documents(self, user_session_id:str) -> list[dict] :
        if not self._has_chroma_data():
            return []

        vector_store = get_vector_store(user_session_id)
        result = vector_store.get(include=["metadatas"])

        seen_sources: set[str] = set()
        documents: list[dict] = []

        for metadata in result.get("metadatas", []):
            source = metadata.get("source")

            if not source or source in seen_sources:
                continue

            seen_sources.add(source)

            documents.append(
                {
                    "id": metadata.get("doc_id"),
                    "name": source,
                    "pages": metadata.get("total_pages"),
                    "upload_date": metadata.get("creationdate"),
                }
            )
        return documents

    def delete_document(self,user_session_id: str, source: str) -> None:
        if not source.strip():
            raise HTTPException(status_code=400, detail="Document source is required.")
        
        vector_store = get_vector_store(user_session_id)
        vector_store.delete(where={"source": source})


    def _has_chroma_data(self) -> bool:
        return (Path(settings.chroma_persist_dir) / "chroma.sqlite3").exists()
        


    def _validate_upload(self, file: UploadFile, content: bytes) -> None:
        self._validate_pdf(file)
        self._validate_file_size(content)

    def _validate_pdf(self, file: UploadFile) -> None:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        if not file.filename or not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Invalid PDF filename.")

    def _validate_file_size(self, content: bytes) -> None:
        size_mb = len(content) / 1024 / 1024

        if size_mb > settings.max_file_size_mb:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Max allowed size is {settings.max_file_size_mb}MB.",
            )

    def _write_temp_pdf(self,content:bytes)->str:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
            temp.write(content)
            return temp.name

    def _load_pdf(self, temp_path:str) -> list[Document] :
        loader = PyPDFLoader(temp_path)
        return loader.load()

    def _add_metadata(self, pages: list[Document], filename: str) -> None:
        for index,page in enumerate(pages):
            page.metadata["source"] = filename
            page.metadata["doc_id"] = str(uuid4())
            page.metadata["page_index"] = index

    def _split_documents(self, pages: list[Document]) -> list[Document]:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.chunk_size,
            chunk_overlap=settings.chunk_overlap,
        )
        return splitter.split_documents(pages)

    def _save_chunks(self, chunks: list[Document], user_session_id: str) -> None:
        create_chroma_dir_if_needed()

        vector_store = get_vector_store(user_session_id)
        vector_store.add_documents(chunks) 
    