import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlistAsync } from './wishlistSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlistItems, status, error } = useSelector(
    (state) => state.wishlist
  );
  console.log(wishlistItems, status, error);
  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, []);
  return (
    <>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">My Wishlist</h2>

        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {wishlistItems.length === 0 ? (
          <div className="d-flex justify-content-between">
            <p>{wishlistItems.length} products</p>
            <Link>Clear All</Link>
          </div>
        ) : (
          <div className="row">
            {wishlistItems.length > 0 ? (
              <>
                {wishlistItems.map((item) => (
                  <div className="col-md-3" key={item._id}>
                    <div className="card mb-3">
                      <Link to={`/products/${item.product._id}`}>
                        <img
                          src={item.product.imageUrl}
                          className="rounded img-fluid"
                        />
                      </Link>
                      <div className="card-body text-center">
                        <h5>{item.product.productTitle}</h5>
                        <div className="d-flex justify-content-between mx-5">
                          <p>₹ {item.product.sellingPrice}</p>
                          <p>{item.product.netWeight}g</p>
                        </div>
                        <div className="mt-3">
                          <button
                            className="card-link btn"
                            style={{ backgroundColor: '#fbbf24' }}
                          >
                            Add to Cart
                          </button>
                          <button className="card-link btn btn-outline-danger">
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
