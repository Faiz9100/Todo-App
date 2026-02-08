import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom Calendar Icon Component
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-calendar-event"
    viewBox="0 0 16 16"
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.5', // Bolder stroke
      filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' // Subtle shadow for contrast
    }}
  >
    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
  </svg>
);

export default function AddTodo(props) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [duration, setDuration] = useState('');
  const [energy, setEnergy] = useState('Medium');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be blank');
      return;
    }
    const deadlineStr = deadline ? deadline.toISOString() : '';
    props.addTodo && props.addTodo(title.trim(), desc.trim(), deadlineStr, duration, energy);
    setTitle('');
    setDesc('');
    setDeadline(null);
    setDuration('');
    setEnergy('Medium');
  };

  return (
    <div className="container my-3">
      <h4>Add a Todo</h4>
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="desc" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Todo description"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="deadline" className="form-label">Deadline</label>
          <div style={{ position: 'relative' }}>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
              className="form-control"
              placeholderText="Select deadline"
              wrapperClassName="w-100"
            />
            <CalendarIcon />
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="duration" className="form-label">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 30"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="energy" className="form-label">Energy Required</label>
          <select
            className="form-select"
            id="energy"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-sm btn-primary">Add Todo</button>
        </div>
      </form>
    </div>
  );
}
