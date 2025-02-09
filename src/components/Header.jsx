import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchWishlistAsync } from '../features/wishlist/wishlistSlice';
import { fetchCartAsync } from '../features/cart/cartSlice';
const Header = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = '678661161046fcf9a4996dd5';

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  // console.log('Wishlist data: ', wishlistItems, wishlistItems.length);

  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log('Cart data: ', cartItems, cartItems.length);

  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCartAsync(userId));
  // }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/products/search/${searchTitle}`);
  };

  return (
    <header>
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
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
              </form>
            </ul>
            <div className="w-25 d-flex justify-content-evenly">
              <Link to={`/account/${userId}`}>
                <i
                  className="bi bi-person me-2"
                  style={{ fontSize: '1.5rem', color: 'grey' }}
                ></i>
              </Link>
              <Link to={`/account/wishlist/${userId}`}>
                <i
                  className="bi bi-suit-heart position-relative"
                  style={{ fontSize: '1.5rem', color: 'grey' }}
                >
                  <span
                    className="position-absolute top-0 start-100 badge rounded-pill text-bg-secondary translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {wishlistItems.length}
                  </span>
                </i>
              </Link>
              <Link to={`/account/cart/${userId}`}>
                <i
                  className="bi bi-cart2 position-relative"
                  style={{ fontSize: '1.5rem', color: 'grey' }}
                >
                  <span
                    className="position-absolute top-0 start-100 badge rounded-pill text-bg-secondary translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cartItems.length}
                  </span>
                </i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
