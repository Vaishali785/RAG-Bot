import os,tempfile
from fastapi import FastAPI, File, Request, UploadFile, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware

from docLoader import agentCall, fileLoader, list_docs, removeDocs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://aria-rag-bot.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get('/health')
async def health():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post('/upload')
async def uploadDoc(file:UploadFile = File(...),  user_session_id:str= Header(...)):

    try:
        file_size= file.size / 1024 / 1024
        if(file_size < 20 ):
            await fileLoader(file, user_session_id)
            return {"status": "Success"}
        else:
            return {"status": "File too big"}
    except Exception as e: 
        print("UPLOAD ERROR:", e)  # important for debugging
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get('/docs-list')
def docsList (user_session_id:str= Header(...)):
    docs = list_docs(user_session_id) 
    return docs

@app.post('/remove-doc')
async def removeDocsFromList (request:Request, user_session_id:str= Header(...)):
    body = await request.json()
    source = body.get('data')
    if source != '':
        status = removeDocs(user_session_id, source)
        return status
    else:
        return "Document name not mentioned properly"

@app.post('/chat')
async def askAgent(request:Request, user_session_id:str= Header(...)):
    body = await request.json()
    question = body.get("question")
    msgs = body.get("msgs")

    result = agentCall(question, msgs, user_session_id)
    return result 