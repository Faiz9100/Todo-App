import React from 'react'

export default function Footer() {
  return (
    <footer className="text-center text-white py-4 mt-auto" style={{
      background: 'rgba(15, 32, 39, 0.8)', // Deep ocean blue transparency
      backdropFilter: 'blur(5px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        <p className="mb-2">Made by <span className="fw-bold">Faiz Mansuri</span></p>
        <div className="mb-3">
          {/* <a href="#" className="text-white me-3 text-decoration-none hover-effect">About</a>
          <a href="#" className="text-white me-3 text-decoration-none hover-effect">Privacy</a>
          <a href="#" className="text-white text-decoration-none hover-effect">Contact</a> */}
        </div>
        <p className="small mb-0 text-white-50">
          © {new Date().getFullYear()} My Todo App. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

