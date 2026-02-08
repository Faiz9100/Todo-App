import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./my-components/withHeader";
import Footer from "./my-components/Footer";
import AddTodo from "./my-components/AddTodo";
import Todos from "./my-components/Todos";

function App() {
  const [userEnergy, setUserEnergy] = useState('Medium');
  const [currentTheme, setCurrentTheme] = useState('Sunset');
  const [todos, setTodos] = useState([
    {
      sno: 1,
      title: "Gym",
      desc: "At 10:00 AM",
      deadline: "",
      duration: 60,
      energy: "High",
      priority: 0
    },
    {
      sno: 2,
      title: "Study",
      desc: "React JS",
      deadline: "",
      duration: 120,
      energy: "Medium",
      priority: 0
    },
    {
      sno: 3,
      title: "Meeting",
      desc: "At 1:00 PM",
      deadline: "",
      duration: 30,
      energy: "Low",
      priority: 0
    },
  ]);

  const calculatePriority = (todo, currentEnergy) => {
    let score = 0;

    // 1. Deadline Score
    if (todo.deadline) {
      const now = new Date();
      const deadline = new Date(todo.deadline);
      const diffHours = (deadline - now) / (1000 * 60 * 60);

      if (diffHours < 2) score += 40;
      else if (diffHours < 24) score += 30;
      else if (diffHours < 72) score += 20;
      else score += 10;
    }


    if (todo.duration) {
      if (todo.duration <= 30) score += 30;
      else if (todo.duration <= 60) score += 20;
      else if (todo.duration <= 120) score += 10;
      else score += 5;
    }

    // 3. Energy Match Score
    if (todo.energy === currentEnergy) {
      score += 30;
    }

    return score;
  };

  // Recalculate priorities when userEnergy or todos change
  useEffect(() => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => ({
        ...todo,
        priority: calculatePriority(todo, userEnergy)
      }));

      // Only update if priorities actually changed to avoid infinite loop
      // Simple check: compare JSON string or just trust React's state update batching?
      // Actually, if we set state inside useEffect which depends on state, we might loop.
      // But here we depend on userEnergy.
      // Wait, if we depend on `todos` and `setTodos`, we loop.
      // We should only run this when `userEnergy` changes.
      // When `todos` are added/deleted, we handle priority there.
      return updatedTodos.sort((a, b) => b.priority - a.priority);
    });
  }, [userEnergy]);

  const onDelete = (todo) => {
    setTodos((prev) => prev.filter((t) => t.sno !== todo.sno));
  };

  // Function to handle task completion with animation
  const markAsCompleted = (sno) => {
    // 1. Mark as completed to trigger animation
    setTodos(prev => prev.map(t => t.sno === sno ? { ...t, completed: true } : t));

    // 2. Remove after animation (e.g., 800ms to match CSS)
    setTimeout(() => {
      setTodos(prev => prev.filter(t => t.sno !== sno));
    }, 800);
  };

  const addTodo = (title, desc, deadline, duration, energy) => {
    setTodos((prev) => {
      const sno = prev.length > 0 ? prev[prev.length - 1].sno + 1 : 1;
      const newTodo = {
        sno,
        title,
        desc,
        deadline,
        duration: parseInt(duration) || 0,
        energy,
        completed: false // Default state
      };

      // Calculate priority immediately
      newTodo.priority = calculatePriority(newTodo, userEnergy);

      const newTodoList = [...prev, newTodo];
      return newTodoList.sort((a, b) => b.priority - a.priority);
    });
  };

  return (
    <div className={`animated-bg theme-${currentTheme.toLowerCase()}`}>
      <div className="astrology-content">
        <Header tittle="My Todo App" searchbar={false} />

        <div className="container mt-3 d-flex justify-content-end align-items-center">
          <span className="me-2 fw-bold text-white">Theme:</span>
          <select
            className="form-select w-auto bg-transparent text-white border-white"
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            style={{ cursor: 'pointer' }}
          >
            <option value="Water" className="text-dark">Water 🌊</option>
            <option value="Sunset" className="text-dark">Sunset 🌅</option>
            <option value="Forest" className="text-dark">Forest 🌲</option>
            <option value="Space" className="text-dark">Space 🚀</option>
          </select>
        </div>

        <div className="container my-3">
          <div className="card p-3 text-white" style={{
            background: 'rgba(25, 135, 84, 0.2)', // Transparent green
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <label className="form-label fw-bold">My Current Energy Level:</label>
            <div className="btn-group" role="group">
              {['Low', 'Medium', 'High'].map(level => (
                <button
                  key={level}
                  type="button"
                  className={`btn ${userEnergy === level ? 'btn-danger border-white' : 'btn-light border-white text-success fw-bold'}`}
                  style={{ borderWidth: '2px' }}
                  onClick={() => setUserEnergy(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <small className="text-white-50 mt-2 fw-bold" style={{ color: 'rgba(255,255,255,0.8) !important' }}>
              Tasks matching your energy level and quick wins will be prioritized!
            </small>
          </div>
        </div>

        <AddTodo addTodo={addTodo} />
        <Todos todos={todos} onDelete={onDelete} markAsCompleted={markAsCompleted} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
