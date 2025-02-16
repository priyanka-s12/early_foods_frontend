import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartAsync,
  removeFromCartAsync,
  moveFromCartToWishlist,
  increaseQuantityAsync,
  decreaseQuantityAsync,
  calculateTotal,
} from './cartSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const userId = '678661161046fcf9a4996dd5';
  const [message, setMessage] = useState('');

  const { cartItems, status, error, totalPrice, totalCartItems } = useSelector(
    (state) => state.cart
  );
  // console.log(
  //   'Cart data: ',
  //   cartItems,
  //   totalPrice,
  //   cartItems.length,
  //   totalCartItems
  // );

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  // console.log('Wishlist data from cart: ', wishlistItems, wishlistItems.length);

  useEffect(() => {
    dispatch(fetchCartAsync());
    // dispatch(fetchWishlistAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  const handleDelete = (cartId) => {
    dispatch(removeFromCartAsync(cartId));
    setMessage('Item removed from cart');
  };

  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">My Cart</h2>

        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="row">
          {cartItems.length > 0 ? (
            <>
              {' '}
              <div className="col-md-8">
                {message && <p className="alert alert-success">{message}</p>}
                <p>
                  {cartItems.length} product
                  {cartItems.length > 1 ? 's' : ''}
                </p>

                <div className="row">
                  {cartItems.map((cart) => (
                    <div className="col-md-4" key={cart._id}>
                      <div className="card mb-3">
                        <Link to={`/products/${cart.product?._id}`}>
                          <img
                            src={cart.product?.imageUrl}
                            alt={cart.product?.productTitle}
                            className="rounded img-fluid"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5>{cart.product?.productTitle}</h5>

                          <div className="d-flex justify-content-between mt-3">
                            <p></p>
                            <p>
                              <i
                                className="bi bi-star-fill me-2"
                                style={{ fontSize: '1rem', color: '#f1c40f' }}
                              ></i>
                              {cart.product?.rating} (
                              {cart.product?.numberOfReviews})
                            </p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p>₹ {cart.product?.sellingPrice}</p>
                            <p>{cart.product?.netWeight}g</p>
                          </div>

                          <div className="d-flex justify-content-around">
                            <button
                              className="btn btn-outline-dark"
                              onClick={() =>
                                dispatch(
                                  decreaseQuantityAsync({
                                    _id: cart._id,
                                  })
                                )
                              }
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            {cart.quantity}
                            <button
                              className="btn btn-outline-dark"
                              onClick={() =>
                                dispatch(
                                  increaseQuantityAsync({
                                    _id: cart._id,
                                  })
                                )
                              }
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>

                          <div className="mt-3">
                            <button
                              className="card-link btn btn-primary"
                              onClick={() =>
                                dispatch(
                                  moveFromCartToWishlist({
                                    _id: cart._id,
                                    product: cart.product?._id,
                                    user: '678661161046fcf9a4996dd5',
                                  })
                                )
                              }
                            >
                              Move to Wishlist
                            </button>

                            <button
                              className="card-link btn btn-outline-danger"
                              onClick={() => handleDelete(cart._id)}
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <h4>Total Price</h4>
                <div className="card">
                  <div className="card-body">
                    <h4>₹ {totalPrice}</h4>
                    <br />
                    <div className="d-grid gap-2">
                      <Link className="btn btn-outline-primary" to="/checkout">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <i
                className="bi bi-cart-x"
                style={{ fontSize: '5rem', color: 'grey' }}
              ></i>
              <p className="fs-5">
                You don't have any products in the cart yet.
              </p>
              <Link to="/" className="btn btn-primary">
                Return to Shop
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
