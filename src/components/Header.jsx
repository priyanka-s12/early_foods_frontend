import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [title, setTitle] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title);
  };
  return (
    <header className="">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link
            className="navbar-brand fw-medium"
            to="/"
            style={{ color: '#581c87' }}
          >
            Early Foods
          </Link>
          <button
            className="navbar-toggler mb-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <form className="d-flex" role="search" onSubmit={submitHandler}>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by product title..."
                    aria-label="Search"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </form>
            </ul>
            <div className="w-25 mt-3 d-flex justify-content-evenly">
              {/* <div className="d-flex justify-content-evenly"> */}
              <button type="button" className="btn btn-secondary">
                <i className="bi bi-person me-2"></i>
                Account
              </button>
              <i
                className="bi bi-suit-heart"
                style={{ fontSize: '1.5rem' }}
              ></i>
              <i className="bi bi-cart2" style={{ fontSize: '1.5rem' }}></i>
            </div>
            {/* </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
