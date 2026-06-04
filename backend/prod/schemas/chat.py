

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    sender:str
    content: str = ''

class ChatRequest(BaseModel):
    question: str = Field(min_length=1)
    msgs: list[ChatMessage] = []


class ChatResponse(BaseModel):
    answer: str