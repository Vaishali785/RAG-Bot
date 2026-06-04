from pydantic import BaseModel


class DocumentInfo(BaseModel):
    id: str | None
    name: str | None
    pages: int | None
    upload_date: str | None

class DeleteDocumentRequest(BaseModel):
    source:str

class StatusResponse(BaseModel):
    status: str