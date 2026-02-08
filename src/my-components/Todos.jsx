import React from 'react'
import Todo from './Todo';

export default function Todos(props) {
  return (
    <div className="container my-3">
      <h3 className="text-center my-3">My Todos List</h3>
      {(!props.todos || props.todos.length === 0) ? (
        <p className="text-center">No todos to display !</p>
      ) : (
        props.todos.map((todo) => (
          <div key={todo.sno ?? todo.id} className={`my-2 d-flex align-items-center justify-content-between ${todo.completed ? 'shrinking-row' : ''}`}>
            <div className="flex-grow-1">
              <Todo todo={todo} markAsCompleted={props.markAsCompleted} />
            </div>
            <div className="ms-3">
              <button onClick={() => props.onDelete && props.onDelete(todo)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}


