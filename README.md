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

<!-- am i passing the query with retrieved chunks to llm? -->
<!-- once chunks are retrieved , what is happening after that? -->
<!--
Q. As the conversation gets longer, you're sending more and more message history to the LLM. What problems can this cause, and did you handle it in your app?
Honest answer — good. Most first RAG apps don't handle it, and that's fine.
For the interview though, you should know the common solutions:

Sliding window — only keep the last N messages, drop the oldest
Summarization — periodically summarize older conversation into one message to compress history
Token counting — track actual token usage and trim when approaching the limit rather than guessing by message count -->
