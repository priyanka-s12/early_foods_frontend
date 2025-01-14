import { Link, useNavigate } from 'react-router-dom';
import { setSearchTitle } from '../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTitle = useSelector((state) => state.products.searchTitle);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(searchTitle);
    navigate(`/products/search/q=${searchTitle}`);
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
                    onChange={(e) =>
                      dispatch(setSearchTitle(e.target.value.toLowerCase()))
                    }
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
