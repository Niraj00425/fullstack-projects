
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Todo API (FastAPI)")

# CORS for local dev (React on Vite default port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Todo(BaseModel):
    id: int
    title: str
    done: bool = False

# super simple in-memory "DB"
todos = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todo(todo: Todo):
    todos.append(todo.dict())
    return {"msg": "created", "todo": todo}

@app.put("/todos/{todo_id}")
def toggle_todo(todo_id: int):
    for t in todos:
        if t["id"] == todo_id:
            t["done"] = not t["done"]
            return {"msg": "toggled", "todo": t}
    return {"error": "not found"}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    before = len(todos)
    todos = [t for t in todos if t["id"] != todo_id]
    return {"msg": "deleted", "count": before - len(todos)}
