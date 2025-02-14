import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserByIdAsync } from '../features/user/userSlice';
import { fetchAddressesAsync } from '../features/address/addressSlice';
import {
  fetchCartAsync,
  calculateTotal,
  calculateTotalCartItems,
} from '../features/cart/cartSlice';
const Checkout = () => {
  const [selectAddress, setSelectAddress] = useState();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userId = '678661161046fcf9a4996dd5';

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const { addresses, status, error } = useSelector((state) => state.address);
  console.log(addresses);

  const { cartItems, totalPrice, totalCartItems } = useSelector(
    (state) => state.cart
  );
  console.log(
    'Cart data: ',
    cartItems,
    totalPrice,
    cartItems.length,
    totalCartItems
  );

  useEffect(() => {
    dispatch(fetchUserByIdAsync(userId));
    dispatch(fetchAddressesAsync());
    dispatch(fetchCartAsync());
    dispatch(calculateTotal());
    dispatch(calculateTotalCartItems());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectAddress);
    if (selectAddress) {
      setMessage('Order Placed Successfully...!!!');
    } else {
      setMessage('Please select an address.');
    }
  };
  return (
    <>
      <Header />
      <main className="container py-3">
        {message && <p className="alert alert-success">{message}</p>}
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Name: </strong> {user.firstName} {user.lastName}
            </p>
            <hr />
            <p>
              <strong>Account: </strong> {user.email}
            </p>
            <hr />
            <p>
              <strong>Ship to: </strong>
            </p>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="list-group">
              {addresses.map((item) => (
                <div key={item._id}>
                  <li className="list-group-item d-flex">
                    <input
                      type="radio"
                      name="address"
                      value={item._id}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      className="form-check-input"
                    />
                    <span className="ms-2">
                      {item.firstName} {item.lastName}, {item.addressLine1},{' '}
                      {item.addressLine2} {item.landmark}, {item.city},{' '}
                      {item.state}, {item.pincode}, {item.country}
                    </span>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="col-md-6 mt-3">
            <ul className="list-group">
              {cartItems.map((item) => (
                <div key={item._id}>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <img
                      src={item.product?.imageUrl}
                      className="img-fluid rounded"
                      style={{ height: '75px' }}
                    />
                    <span>
                      {item.product?.productTitle} x {item.quantity}
                    </span>
                    <span>₹ {item.quantity * item.product?.sellingPrice}</span>
                  </li>
                </div>
              ))}
            </ul>

            <ul className="list-group mt-3">
              <li className="list-group-item d-flex justify-content-between">
                <p>Subtotal - ({totalCartItems} items) </p>
                <p>₹ {totalPrice}</p>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <h5>Total Price</h5>
                <h5>₹ {totalPrice}</h5>
              </li>
            </ul>
            <div className="d-grid">
              <button className="mt-3 btn btn-primary" onClick={handleSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
