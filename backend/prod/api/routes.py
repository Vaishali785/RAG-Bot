from fastapi import APIRouter, File, Header,  UploadFile
from fastapi.responses import StreamingResponse
from prod.schemas.chat import ChatRequest, ChatResponse
from prod.schemas.document import DeleteDocumentRequest, DocumentInfo, StatusResponse
from prod.services.agent_service import AgentService
from prod.services.document_service import DocumentService

router = APIRouter()

document_service = DocumentService()
agent_service = AgentService()


@router.get('/health')
async def health() -> StatusResponse:
    return StatusResponse(status= "ok")


@router.post('/upload')
async def upload_document(
    file:UploadFile = File(...),  
    user_session_id:str= Header(...)
) -> StatusResponse:
    await document_service.upload_pdf(file,user_session_id)
    return StatusResponse(status="success")


@router.get('/docs-list', response_model=list[DocumentInfo])
def list_documents(
    user_session_id:str= Header(...)
) -> list[DocumentInfo]:
    docs = document_service.list_documents(user_session_id)
    return docs

@router.post('/remove-doc')
async def remove_document (
    body: DeleteDocumentRequest, 
    user_session_id:str= Header(...)
)-> StatusResponse:
    document_service.delete_document(user_session_id, body.source)
    return StatusResponse(status= "success")

@router.post('/chat', response_model=ChatResponse)
async def chat(
    body:ChatRequest, 
    user_session_id:str= Header(...)
):
    answer = agent_service.answer(
        ques=body.question,
        msgs=[message.model_dump() for message in body.msgs],
        user_session_id=user_session_id,
    )
    return ChatResponse(answer=answer)
    