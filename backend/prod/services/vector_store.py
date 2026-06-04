

from functools import lru_cache
import chromadb
from langchain_chroma import Chroma
from langchain_nomic import NomicEmbeddings
from pathlib import Path
import re
from prod.core.config import settings


@lru_cache
def get_embeddings() -> NomicEmbeddings:
    return NomicEmbeddings(model=settings.embedding_model) 

def sanitize_collection_name(user_session_id: str) -> str:
    safe_id = re.sub(r"[^a-zA-Z0-9_-]", "_", user_session_id)
    return f"user_{safe_id}"[:63]

@lru_cache
def get_vector_store(user_session_id:str) -> Chroma:
    
    return Chroma(
        collection_name=sanitize_collection_name(user_session_id) ,
        embedding_function=get_embeddings(),

        persist_directory=settings.chroma_persist_dir,
    )

def create_chroma_dir_if_needed() -> None:
    Path(settings.chroma_persist_dir).mkdir(parents=True, exist_ok=True)