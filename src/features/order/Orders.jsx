import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersAsync } from './orderSlice';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function Orders() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">Order History</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="row w-75">
          {orders.length > 0 ? (
            <div>
              {orders.map((order) => (
                <div key={order._id} className="card mb-3">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-4">
                        <span className="">
                          Order Placed:
                          {dateFormat(order.orderDate, 'dd mmmm yyyy')}
                        </span>
                      </div>
                      <div className="col-md-8">
                        <span>Order Id: {order._id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={order.product?.imageUrl}
                          alt={order.product?.productTitle}
                          className="rounded img-fluid"
                          style={{ height: 200 }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h6 className="card-title my-3">
                          {order.product?.productTitle}
                        </h6>
                        <p>Selling Price: ₹ {order.product?.sellingPrice}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>
                          Total Price: ₹{' '}
                          {order.product?.sellingPrice * order.quantity}
                        </p>
                        <p>
                          Ship to: {order.shippingAddress.firstName}{' '}
                          {order.shippingAddress.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <i
                className="bi bi-list-task"
                style={{ fontSize: '5rem', color: 'grey' }}
              ></i>
              <p className="fs-5">You have not placed any orders yet.</p>
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
}

export default Orders;
