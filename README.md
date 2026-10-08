<!-- pnpm  -->
<!-- node v22 -->

# Aria - RAG Chatbot

A full-stack Retrieval-Augmented Generation (RAG) chatbot that allows users to upload documents and chat with an AI assistant grounded in those documents.

The project supports:

- Document upload & deletion
- Temporary chat persistence
- Shared document state across pages
- Contextual responses using uploaded files
- Per-session user isolation
- Request manual cancellation

---

# Features

- Upload PDF/documents for retrieval
- AI chat powered by RAG
- Session-based chat persistence
- Shared global docs state using React Context
- Admin page for document management
- Dynamic greeting generation from LLM
- Optimistic UI updates
- Markdown response rendering
- Drag-and-drop uploads
- Per-user vector store isolation — multiple concurrent users supported
- Manual stop button to cancel pending requests

---

## Live Demo

🔗 [Rag Bot Demo Link](https://aria-rag-bot.netlify.app)

---

## Screenshots

**Chat View**
![Chat View](https://github.com/Vaishali785/RAG-Bot/blob/main/public/images/ChatScreen.png)

**Document Upload**
![Upload](https://github.com/Vaishali785/RAG-Bot/blob/main/public/images/FirstScreen.png)

**Admin / Document Management**
![Admin](https://github.com/Vaishali785/RAG-Bot/blob/main/public/images/AdminScreen.png)

**Admin / Appearance Management**
![Appearance](https://github.com/Vaishali785/RAG-Bot/blob/main/public/images/AppearanceScreen.png)

---

# Tech Stack

## Frontend

- React
- TypeScript
- Context API
- useReducer
- TailwindCSS
- Session Storage

## Backend

- Python
- FastAPI
- LangChain
- Groq (LLM inference)
- ChromaDB (per-session vector store)
- Nomic Embeddings
- RAG pipeline

---

# Project Structure

```txt
    frontend/
        ├── components/
        ├── context/
        ├── hooks/
        ├── constants/
        ├── pages/
        └── lib/

    backend/
        ├── main.py
        ├── docLaoder

```

---

# Application Flow

```txt
    Upload Docs
        ↓
    Generate Embeddings
        ↓
    Store in Per-Session Vector Store (ChromaDB)
        ↓
    User Query
        ↓
    Retrieve Relevant Chunks
        ↓
    LLM Response
        ↓
    Return Response to UI
```

---

# Frontend Architecture

## Docs Context

Global shared state for:

- documents
- loading/error states
- upload/delete actions
- fetching document list

## Chat Hook

Handles:

- message reducer
- request cancellation (AbortController)
- session persistence
- greeting initialization

## Reducer-Based Chat State

```txt id="t4jlwm"
    ADD_USER_MSG
    START_AI_MSG
    UPDATE_AI_MSG
    FINISH_AI_MSG
    ERROR_AI_MSG
    CLEAR_MSGS
```

---

# Session Isolation

Each user is identified by a unique id header sent with every request. The backend creates a separate ChromaDB collection per session, ensuring documents and retrieval are fully isolated between concurrent users.

---

# Chat Persistence

Chat history is temporarily stored using `sessionStorage`.

The chat is automatically cleared when:

- all documents are deleted
- browser session ends

---

# Installation

## Frontend

```bash
    pnpm install
    pnpm run dev
```

---

## Backend

```bash
    cd backend
    pip install -r requirements.txt
    fastapi dev
```

---

# Environment Variables

## Frontend

```env
    VITE_API_URL=http://localhost:8000
```

## Backend

```env
    GROQ_API_KEY = <api-key>
    NOMIC_API_KEY = <api-key>
```

---

# API Endpoints

## Upload Document

```http
POST /upload
```

---

## Get Documents

```http
GET /docs-list
```

---

## Delete Document

```http
POST /remove-doc
```

---

## Chat

```http
POST /chat
```

---

# Future Improvements

- Persistent chat history
- Streaming responses
- Authentication
- Conversation memory with summarization or sliding window
- Chat export
- Markdown/code highlighting improvements

---

# Key Learnings

This project explores:

- State architecture in React
- Reducer-based chat systems
- Shared state management
- RAG application structure
- Per-session isolation in multi-user backends
- Request cancellation patterns
- Frontend/backend synchronization
- Async state handling
- Separation of concerns

---

