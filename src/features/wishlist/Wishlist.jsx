import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlistAsync,
  removeFromWishlistAsync,
  moveFromWishlistToCart,
} from './wishlistSlice';
import { fetchCartAsync } from '../cart/cartSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  // console.log('Wishlist data: ', wishlistItems, wishlistItems.length);

  const { cartItems } = useSelector((state) => state.cart);
  // console.log('Cart data from wishlist: ', cartItems, cartItems.length);

  const { status, error } = useSelector((state) => state.wishlist);
  // console.log(status, error);

  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, []);

  const handleDelete = (wishlistId) => {
    dispatch(removeFromWishlistAsync(wishlistId));
    setMessage('Item removed from wishlist');
  };
  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">My Wishlist</h2>

        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {message && <p className="alert alert-success">{message}</p>}

        {wishlistItems.length > 0 ? (
          <>
            <div className="d-flex justify-content-between">
              <p>
                {wishlistItems.length} product
                {wishlistItems.length > 1 ? 's' : ''}
              </p>
              {/* <button onClick={() => dispatch(clearAll())}>Clear All</button> */}
            </div>

            <div className="row">
              {wishlistItems?.map((wish) => (
                <div className="col-sm-6 col-md-3" key={wish?._id}>
                  <div className="card mb-3">
                    <Link to={`/products/${wish.product?._id}`}>
                      <img
                        src={wish.product?.imageUrl}
                        alt={wish.product?.productTitle}
                        className="rounded img-fluid"
                      />
                    </Link>
                    <div className="card-body text-center">
                      <h5>{wish.product?.productTitle}</h5>

                      <div className="d-flex justify-content-between mt-3">
                        <p></p>
                        <p>
                          <i
                            className="bi bi-star-fill me-2"
                            style={{ fontSize: '1rem', color: '#f1c40f' }}
                          ></i>
                          {wish.product?.rating} (
                          {wish.product?.numberOfReviews})
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p>₹ {wish.product?.sellingPrice}</p>
                        <p>{wish.product?.netWeight}g</p>
                      </div>

                      <div className="mt-3">
                        <button
                          className="card-link btn"
                          style={{ backgroundColor: '#fbbf24' }}
                          onClick={() => {
                            dispatch(
                              moveFromWishlistToCart({
                                _id: wish?._id,
                                product: wish.product?._id,
                                user: '678661161046fcf9a4996dd5',
                              })
                            );
                          }}
                        >
                          Move to Cart
                        </button>
                        <button
                          className="card-link btn btn-outline-danger"
                          onClick={() => handleDelete(wish._id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <i
              className="bi bi-suit-heart"
              style={{ fontSize: '5rem', color: 'grey' }}
            ></i>
            <p className="fs-5">
              You don't have any products in the wishlist yet.
            </p>
            <Link to="/" className="btn btn-primary">
              Return to Shop
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
