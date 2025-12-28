# 🚀 TaskAligner AI

**From client requirements to execution-ready project plans — automatically.**

TaskAligner AI transforms messy client documents (text or PDFs) into structured projects, assigns work based on developer experience, and tracks execution — all in one workflow.

---


## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router

### Backend
- FastAPI (Python)
- Gemini API (Google Generative AI)
- PyPDF for PDF parsing
- In-memory storage (MVP)

---

## 📂 Project Structure

taskaligner-ai/
├── frontend/ # React app
├── backend/ # FastAPI app
├── .gitignore
└── README.md


---

## ⚙️ Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- Gemini API key

---

## 🔑 Environment Setup

Create a `.env` file inside the **backend** folder:

GOOGLE_API_KEY=your_gemini_api_key_here

---

## ▶️ Run Backend (FastAPI)


cd backend
python -m venv venv
source venv/bin/activate   # Linux / macOS
# venv\Scripts\activate    # Windows

pip install -r requirements.txt

uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

API Docs:

http://127.0.0.1:8000/docs

▶️ Run Frontend (React)

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

