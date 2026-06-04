
from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
# this points to: backend/prod

class Settings(BaseSettings):
    app_name:str = "Aria - RAG Bot"

    allowed_origins:list[str] =[
        "http://localhost:5173", 
        "https://aria-rag-bot.netlify.app"
    ]

    max_file_size_mb: int = 20
    chroma_persist_dir: str = str(BASE_DIR / ".chroma_langchain_db_nomic") 

    embedding_model: str = "nomic-embed-text-v1.5"
    chat_model: str = "openai/gpt-oss-20b"

    chunk_size: int = 1000
    chunk_overlap: int = 200
    retrieval_k: int = 3

settings = Settings()