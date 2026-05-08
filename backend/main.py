import os,tempfile
from fastapi import FastAPI, File, Request, UploadFile, HTTPException
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

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post('/upload')
async def uploadDoc(file:UploadFile = File(...)):
    try:
        file_size= file.size / 1024 / 1024
        if(file_size < 20 ):
            await fileLoader(file)
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
def docsList ():
    docs = list_docs() 
    return docs

@app.post('/remove-doc')
async def removeDocsFromList (request:Request):
    body = await request.json()
    source = body.get('data')
    if source != '':
        status = removeDocs(source)
        return status
    else:
        return "Document name not mentioned properly"

@app.post('/chat')
async def askAgent(request:Request):
    body = await request.json()
    question = body.get("question")
    msgs = body.get("msgs")

    result = agentCall(question, msgs)
    return result 