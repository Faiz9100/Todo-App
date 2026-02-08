import React from 'react';

export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{props.tittle}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* About Link Removed */}
          </ul>
          {props.searchbar ? <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form> : ""}
        </div>
      </div>
    </nav>
  );
}