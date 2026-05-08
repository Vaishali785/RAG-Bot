Notes and TODOS

<!-- 1. Enter into backend/ folder
2. Create virtual environment -> python -m venv .venv
3. Activate virtual environment -> source .venv/bin/activate
4. Upgrade pip (if using uv , then no need) -> python -m pip install --upgrade pip
5. Installed fastapi -> pip install "fastapi[standard]"

---

## But when i import this package it shows error

- First check if package is installed correctly

1. activate virtual env in terminal -> source .venv/bin/activate
2. pip show fastapi -> check location value
3. check value of -> which python
4. Both should be same

- Version on bottom bar

5. Then check the version and path shown in bottom bar of editor -> in my case the path was showing incorrectly there
6. To fix it , click on it and choose the correct path of python (if visible), if not select "Enter interpreter path" -> find path -> choose project folder -> .venv/bin/python3.13

- If still it doesnt work

1. Create a folder in root of project called -> .cursor (or .vs-code based on editor)
2. Inside the folder create settings.json
3. Inside the json file , add this

```json
{
	"python.defaultInterpreterPath": "/Users/vaishali/Desktop/Vaishali/rag/backend/.venv/bin/python"
}
```

4. Cmd + Shift + P
   Developer: Reload Window

---

6. Installing langchain -> pip install -qU langchain langchain-groq langchain-openai

- Models

1. Groq - for chatting
2. OpenAI - for embeddings

- Langchain

1. Semantic Search module for document upload
2. RAG Agent for rest part

- Setting up document loader

1. pip install langchain-community pypdf

- Vector store -> chroma db
  pip install -qU langchain-chroma

## Issue

although i added api key in env variable , it still is not working, so i installed this package => pip install python-dotenv
and added this in my code :
from dotenv import load_dotenv
load_dotenv
still getting error, then i found, i need to call this before importing OpenAIEmbeddings

=================== DocLoader Flow ================
Three functions are there:

1. fileLoader (gets call on doc upload) => which loads the pdf and split it into chunks , then it creates embedding for docs
2. queryDoc (gets call on user query) => embed user query and do similarity search in vector store -->
