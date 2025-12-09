# 🏥 Medical Assistant Chatbot (Baymax)

A production-ready AI-powered medical chatbot built with RAG (Retrieval-Augmented Generation) architecture. Upload medical documents and ask questions powered by state-of-the-art language models.

![Medical Chatbot Banner](https://img.shields.io/badge/Status-Live-success) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green) ![Python](https://img.shields.io/badge/Python-3.11+-blue)

**Live Demo:** [https://baymax-tawny.vercel.app](https://baymax-tawny.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This medical assistant chatbot allows users to:
- **Upload medical documents** (PDFs like textbooks, research papers, clinical notes)
- **Ask questions** about the uploaded content
- **Get AI-powered answers** grounded in the provided medical literature
- **Store conversation history** in a PostgreSQL database for analysis

The system uses **Retrieval-Augmented Generation (RAG)** to ensure responses are accurate and based on the uploaded documents, reducing hallucinations common in vanilla LLMs.

---

## ✨ Features

### Core Functionality
- 📄 **PDF Upload & Processing**: Automatic text extraction and chunking
- 🔍 **Semantic Search**: Vector embeddings stored in Pinecone for fast retrieval
- 🤖 **AI-Powered Responses**: LLaMA3-70B via Groq API
- 💾 **Conversation Logging**: PostgreSQL database stores all interactions
- 🌐 **Web Interface**: Modern, responsive Next.js frontend

### Technical Features
- ⚡ **Fast Inference**: Groq's LPU architecture for sub-second responses
- 🔒 **Secure Deployment**: Environment-based configuration
- 📊 **Analytics Ready**: Database schema designed for conversation analysis
- 🚀 **Production Deployment**: Hosted on Render (backend) + Vercel (frontend)

---

## 🏗️ Architecture

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│     Next.js Frontend (Vercel)           │
│  - File Upload Component                │
│  - Chat Interface                       │
│  - API Integration                      │
└──────────────┬──────────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────────┐
│   FastAPI Backend (Render)              │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  /upload_pdfs/                  │   │
│  │  1. Extract text from PDF       │   │
│  │  2. Split into chunks           │   │
│  │  3. Generate embeddings         │   │
│  │  4. Store in Pinecone           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  /ask/                          │   │
│  │  1. Embed user query            │   │
│  │  2. Search Pinecone (top 3)     │   │
│  │  3. Build RAG chain             │   │
│  │  4. Generate response (Groq)    │   │
│  │  5. Save to PostgreSQL          │   │
│  └─────────────────────────────────┘   │
└──────┬──────────────────┬───────────────┘
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│  Pinecone   │    │  Neon DB    │
│  (Vectors)  │    │ (PostgreSQL)│
└─────────────┘    └─────────────┘
       ▲
       │
┌─────────────┐
│ HuggingFace │
│ Embeddings  │
└─────────────┘
```

### RAG Flow Explained

1. **Document Upload**:
   - User uploads PDF → Backend extracts text
   - Text split into 500-character chunks (50 char overlap)
   - Each chunk embedded using `sentence-transformers/all-MiniLM-L6-v2`
   - Vectors stored in Pinecone with metadata

2. **Question Answering**:
   - User query → Embedded using same model
   - Semantic search in Pinecone → Top 3 relevant chunks retrieved
   - Chunks + Query → Sent to LLaMA3-70B via Groq
   - LLM generates contextual answer
   - Conversation saved to PostgreSQL

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **LLM Orchestration**: LangChain
- **Vector DB**: Pinecone (serverless)
- **Embeddings**: HuggingFace Sentence Transformers
- **LLM**: Groq API (LLaMA3-70B)
- **Database**: PostgreSQL (Neon)
- **ORM**: SQLAlchemy
- **Deployment**: Render

### Key Libraries
```python
# Backend
fastapi==0.115.5
langchain==0.3.13
langchain-groq==0.2.1
langchain-huggingface==0.1.2
pinecone-client==5.0.1
sentence-transformers==3.3.1
sqlalchemy
psycopg2-binary
pypdf==5.1.0
```

```json
// Frontend
"next": "^14.0.0",
"react": "^18.0.0",
"tailwindcss": "^3.4.0",
"axios": "^1.6.0",
"lucide-react": "^0.263.1"
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**
- API Keys:
  - [Groq API Key](https://console.groq.com/)
  - [Pinecone API Key](https://www.pinecone.io/)
  - [Neon PostgreSQL](https://neon.tech/) (optional for local dev)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/JamesLemonss/medical-chatbot.git
cd medical-chatbot
```

#### 2. Backend Setup

```bash
cd server

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
GROQ_API_KEY=your_groq_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=medical
DATABASE_URL=your_neon_postgresql_url_here
EOF

# Run the server
uvicorn main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

#### 3. Frontend Setup

```bash
cd medical-chatbot-client

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 🌐 Deployment

### Backend (Render)

1. **Create Account**: Sign up at [Render.com](https://render.com)

2. **New Web Service**:
   - Connect GitHub repository
   - Root Directory: `server`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**:
   ```
   GROQ_API_KEY=your_groq_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=medical
   DATABASE_URL=your_neon_postgresql_url
   ```

4. **Deploy**: Render auto-deploys on git push

### Frontend (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd medical-chatbot-client
   vercel login
   vercel
   ```

3. **Environment Variables** (in Vercel Dashboard):
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL

### Database (Neon)

1. **Create Project**: Sign up at [Neon.tech](https://neon.tech)
2. **Get Connection String**: Copy from dashboard
3. **Tables Auto-Created**: SQLAlchemy creates schema on first run

---

## 🗄️ Database Schema

### `conversations` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key (auto-increment) |
| `user_message` | TEXT | User's question |
| `bot_response` | TEXT | AI-generated answer |
| `timestamp` | TIMESTAMP | When conversation occurred |
| `session_id` | VARCHAR | Session identifier (optional) |

### Example Queries

**Most Common Questions**:
```sql
SELECT user_message, COUNT(*) as count
FROM conversations
GROUP BY user_message
ORDER BY count DESC
LIMIT 10;
```

**Daily Usage Trends**:
```sql
SELECT DATE(timestamp) as date, COUNT(*) as questions
FROM conversations
GROUP BY date
ORDER BY date DESC;
```

**Response Quality Analysis**:
```sql
SELECT 
  AVG(LENGTH(bot_response)) as avg_length,
  COUNT(*) as total_conversations
FROM conversations
WHERE bot_response NOT LIKE '%No response%';
```

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:8000`
- **Production**: `https://medical-chatbot-api-ys9e.onrender.com`

### Endpoints

#### 1. Upload PDFs

**POST** `/upload_pdfs/`

Upload one or more PDF files to be processed and indexed.

**Request**:
```bash
curl -X POST "http://localhost:8000/upload_pdfs/" \
  -F "files=@document.pdf" \
  -F "files=@another.pdf"
```

**Response**:
```json
{
  "messages": "Files processed and vectorstore updated"
}
```

#### 2. Ask Question

**POST** `/ask/`

Ask a question about uploaded documents.

**Request**:
```bash
curl -X POST "http://localhost:8000/ask/" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "question=What is diabetes?"
```

**Response**:
```json
{
  "response": "Diabetes is a chronic condition...",
  "sources": ["chunk_id_1", "chunk_id_2", "chunk_id_3"]
}
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq API key for LLM access | `gsk_...` |
| `PINECONE_API_KEY` | Pinecone API key | `pcsk_...` |
| `PINECONE_INDEX_NAME` | Name of Pinecone index | `medical` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |

### Frontend (`medical-chatbot-client/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://your-api.onrender.com` |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `Error embedding content: 429 quota exceeded`
- **Cause**: Google Gemini API free tier limit
- **Solution**: Already fixed! Using HuggingFace embeddings (unlimited)

**Problem**: Render backend is slow/times out
- **Cause**: Free tier sleeps after 15 mins inactivity
- **Solution**: First request takes 30-60s to wake up. Upgrade to paid tier for always-on.

**Problem**: `ConnectionError` to Pinecone
- **Cause**: Invalid API key or index doesn't exist
- **Solution**: Verify API key, ensure index name matches `PINECONE_INDEX_NAME`

### Frontend Issues

**Problem**: `ERR_CONNECTION_REFUSED` to API
- **Cause**: Backend not running or wrong `NEXT_PUBLIC_API_URL`
- **Solution**: Check backend is live, verify environment variable

**Problem**: Upload button disabled
- **Cause**: No files selected or file type not PDF
- **Solution**: Only `.pdf` files are accepted

### Database Issues

**Problem**: Conversations not saving
- **Cause**: Invalid `DATABASE_URL` or connection timeout
- **Solution**: Test connection in Neon dashboard, check firewall rules

---

## 🔮 Future Improvements

### Planned Features
- [ ] **User Authentication**: Session management with user accounts
- [ ] **Conversation History UI**: Display past conversations in frontend
- [ ] **Multi-modal Support**: Accept images (X-rays, diagrams)
- [ ] **Advanced Analytics Dashboard**: Visualize usage patterns
- [ ] **Citation Display**: Show which document chunks were used
- [ ] **Feedback System**: Thumbs up/down for response quality
- [ ] **Voice Input**: Speech-to-text for questions
- [ ] **Export Conversations**: Download as PDF/CSV

### Performance Optimizations
- [ ] Implement response streaming for real-time feedback
- [ ] Add Redis caching for frequently asked questions
- [ ] Optimize chunk size based on document type
- [ ] Implement batch embedding for faster uploads

### Model Improvements
- [ ] Fine-tune embeddings on medical terminology
- [ ] Add re-ranking step for better retrieval
- [ ] Experiment with larger context windows
- [ ] Implement hybrid search (semantic + keyword)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **LangChain**: For the RAG orchestration framework
- **Groq**: For blazing-fast LLM inference
- **Pinecone**: For serverless vector database
- **HuggingFace**: For open-source embeddings
- **Neon**: For serverless PostgreSQL
- **Vercel & Render**: For seamless deployment

---

## 📧 Contact

**Developer**: James Lemonss  
**GitHub**: [@JamesLemonss](https://github.com/JamesLemonss)  
**Project Link**: [https://github.com/JamesLemonss/medical-chatbot](https://github.com/JamesLemonss/medical-chatbot)

---

**⭐ If you find this project helpful, please give it a star!**

Built with ❤️ using Next.js, FastAPI, and cutting-edge AI technology.
