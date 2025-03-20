import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function OrderSuccess(props) {
  return (
    <>
      <Header />
      <main className="container py-5 text-center">
        <i
          className="bi bi-check-circle-fill"
          style={{ color: 'green', fontSize: '3rem' }}
        ></i>
        <h4 className="mb-5">Order placed successfully !!!</h4>

        <div className="d-grid col-3 mx-auto">
          <Link className="btn btn-primary mb-3" to="/orders">
            View Orders
          </Link>
          <Link className="btn btn-outline-primary" to="/">
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

OrderSuccess.propTypes = {};

export default OrderSuccess;
