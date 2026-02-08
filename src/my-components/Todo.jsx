import React from 'react'

export default function Todo({ todo, markAsCompleted }) {
  if (!todo) return <div>No todo available</div>;

  const getPriorityColor = (p) => {
    if (p >= 80) return "text-danger fw-bold";
    if (p >= 50) return "text-warning fw-bold";
    return "text-success fw-bold";
  };

  const getEnergyBadge = (e) => {
    if (e === 'High') return "badge bg-danger";
    if (e === 'Medium') return "badge bg-warning text-dark";
    return "badge bg-success";
  };

  return (
    <div className="d-flex align-items-start">
      <div className="me-3 mt-1">
        <input
          type="checkbox"
          className="form-check-input p-2"
          style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
          checked={todo.completed || false}
          onChange={() => markAsCompleted && markAsCompleted(todo.sno)}
          disabled={todo.completed}
        />
      </div>
      <div style={{ transition: 'all 0.3s ease', opacity: todo.completed ? 0.5 : 1 }} className={todo.completed ? "text-decoration-line-through" : ""}>
        <h4>{todo.title} <span style={{ fontSize: '0.8rem' }} className={getPriorityColor(todo.priority)}>(Priority: {todo.priority})</span></h4>
        {todo.desc && <p>{todo.desc}</p>}
        <div className="d-flex gap-2 flex-wrap">
          {todo.deadline && <span className="badge bg-info text-dark">Deadline: {new Date(todo.deadline).toLocaleString()}</span>}
          {todo.duration > 0 && <span className="badge bg-secondary">Duration: {todo.duration} mins</span>}
          {todo.energy && <span className={getEnergyBadge(todo.energy)}>Energy: {todo.energy}</span>}
        </div>
      </div>
    </div>
  )
}

