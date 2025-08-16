
# Ready-to-run React + FastAPI (Todo App)

## Prerequisites
- Python 3.9+
- Node.js 18+ and npm
- VS Code (recommended)

## 1) Start the backend (FastAPI)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install fastapi uvicorn "pydantic<3"  # pydantic v1 for simplicity
uvicorn main:app --reload
```
Backend runs at: http://127.0.0.1:8000

Test it: open http://127.0.0.1:8000/health in your browser.

## 2) Start the frontend (React + Vite)
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at the URL Vite prints (likely http://127.0.0.1:5173).

## 3) Use the app
- Add todos, click a todo to toggle done, click the bin to delete.
- Everything is in-memory; restarting the backend clears data.

## Notes
- CORS is enabled wide-open for local dev.
- Keep this structure in interviews; it's simple and fast.
