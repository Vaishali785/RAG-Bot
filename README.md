<!-- pnpm  -->
<!-- node v22 -->

# Aria - RAG Chatbot

A full-stack Retrieval-Augmented Generation (RAG) chatbot that allows users to upload documents and chat with an AI assistant grounded in those documents.

The project supports:

- document upload & deletion
- temporary chat persistence
- shared document state across pages
- contextual responses using uploaded files

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
    Store Vector Data
        ↓
    User Query
        ↓
    Retrieve Relevant Chunks
        ↓
    LLM Response
        ↓
    Stream Response to UI
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
- streaming responses
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

# Chat Persistence

Chat history is temporarily stored using `sessionStorage`.

The chat is automatically cleared when:

- all documents are deleted
- browser session ends

---

# Installation

## Frontend

```bash
    cd frontend
    npm install
    npm run dev
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

## Backend

```env
    GROQ_API_KEY = <api-key>
    NOMIC_API_KEY = <api-key>
```

---

# API Endpoints

## Upload Document

```http id="8yjlwm"
POST /upload
```

---

## Get Documents

```http id="4zjlwm"
GET /docs-list
```

---

## Delete Document

```http id="2a0k2w"
POST /remove-doc
```

---

## Chat

```http id="s9k3zm"
POST /chat
```

---

# Future Improvements

- Persistent chat history
- Streaming responses
- Authentication
- Multi-user support
- Vector database integration
- Source citations
- Conversation memory
- Chat export
- Markdown/code highlighting improvements

---

# Key Learnings

This project explores:

- state architecture in React
- reducer-based chat systems
- streaming UI updates
- shared state management
- RAG application structure
- frontend/backend synchronization
- async state handling
- separation of concerns

---

# License

MIT License

<!-- Things to Do -->

<!--
1. Add Error Notification in chat
   ~~2. session storage time limit~~
   ~~2. Doc upload and delete is working but the update is not visible~~
   ~~2. on page change uplaod comes then chat window comes~~
   ~~2. doc updates are not visible in greetings~~
   ~~2. while ai msg is loading user should not be allowed to send a new msgs~~
   ~~3. loading for doc upload and delete should be different~~
   ~~3. Add real greeting msg with some context , what user can do and cannot ~~
   ~~3. Output formatting~~
   ~~3. Input is scrollable without text~~
   ~~3. Add session for chats and some memory -~~
   ~~2. Toggle btn for admin <-> chat~~
2. Clean code
   ~~3. Header shadow color according to color palette~~
   ~~6. Delete btn for docs~~
   ~~5. Processing and success UI for doc upload~~
   ~~7. Logo click should go to chat~~
3. Sometime page reloads on doc upload
4. Why hook only for chat
5. How long should a session last?
6. Should I add collection option ?
7. fix typing logic for input
   ~~12. Output format- html , bullets~~

-->

<!-- NOTES - FLOW of APP -->

<!-- 1. First time user
   1. Upload one document to start chat
      1. Upload doc -> calls `/upload` api -> read , chunk and store data in vector db
      2. then get list of docs by calling `/list-docs` api , if success, chat window opens , if error , try upload again
      3. user sends msg , calls api `/chat` , it takes user query and calls tool which converts query to embedding, then retrieve related chunks
      4. llm takes the retrieved context and returns the result to frontend
   2. Bot greets the user with list of uploaded docs.
      1. first it checks if any document is there , if yes, chat window opens and greeting comes
      2. for greeting i am calling `sendMsg` which calls `streamResponse` with query="greeting" and then in backend, agent takes different prompt for greeting query and response accordingly
   3. Then user can ask questions
      1. with same flow , sendMsg -> streamResponse -> return the result -->
