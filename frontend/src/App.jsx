
import { useEffect, useState } from 'react'

const API = 'http://127.0.0.1:8000'

export default function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  const fetchTodos = async () => {
    const res = await fetch(`${API}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async () => {
    if (!title.trim()) return
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), title, done: false })
    })
    setTitle('')
    fetchTodos()
  }

  const toggleTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'PUT' })
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 16, fontFamily: 'system-ui, Arial' }}>
      <h2 style={{ marginBottom: 16 }}>✅ Todo App (React + FastAPI)</h2>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, borderBottom: '1px solid #eee' }}>
            <span onClick={() => toggleTodo(t.id)} style={{ cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none' }}>
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
              🗑️
            </button>
          </li>
        ))}
        {todos.length === 0 && <p style={{ color: '#777' }}>No todos yet. Add one!</p>}
      </ul>
    </div>
  )
}
