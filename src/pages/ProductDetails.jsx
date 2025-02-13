import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { fetchProductsAsync } from '../features/products/productsSlice';
import { addToWishlistAsync } from '../features/wishlist/wishlistSlice';
import { addToCartAsync } from '../features/cart/cartSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log(productId);

  const products = useSelector((state) => {
    return state.products.products;
  });
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  // console.log(products);
  const findProduct = products.find((product) => product._id === productId);
  // console.log(findProduct);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [productId]);
  return (
    <>
      <Header />
      <main className="bg-body-tertiary mt-3">
        <section className="container py-3">
          {error && <p>{error}</p>}
          <div className="card mb-3">
            <div className="row">
              {findProduct ? (
                <>
                  <div className="col-md-4" style={{ height: '500px' }}>
                    <img
                      src={findProduct.imageUrl}
                      className="object-fit-cover img-fluid rounded-start h-75"
                      alt={findProduct.imageUrl}
                    />
                    <div className="mt-3 text-center">
                      <button
                        className="card-link btn"
                        style={{ backgroundColor: '#fbbf24' }}
                        onClick={() =>
                          dispatch(
                            addToCartAsync({
                              user: '678661161046fcf9a4996dd5',
                              product: findProduct._id,
                            })
                          )
                        }
                      >
                        Add to Cart
                      </button>
                      <button
                        className="card-link btn btn-primary"
                        onClick={() =>
                          dispatch(
                            addToWishlistAsync({
                              product: findProduct._id,
                              user: '678661161046fcf9a4996dd5',
                            })
                          )
                        }
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title mb-3">
                        {findProduct.productTitle}
                      </h2>
                      <p>
                        <i
                          className="bi bi-star-fill me-2"
                          style={{ fontSize: '1rem', color: '#f1c40f' }}
                        ></i>
                        {findProduct.rating} ({findProduct.numberOfReviews}{' '}
                        Reviews)
                      </p>

                      <p className="card-text">{findProduct.description}</p>
                      <h5>Ingredients: </h5>
                      <p className="card-text">{findProduct.ingredients}</p>
                      <h5>₹ {findProduct.sellingPrice}</h5>
                      <p className="text-decoration-line-through">
                        ₹ {findProduct.originalPrice}
                      </p>
                      <p>
                        You save ₹
                        {findProduct.originalPrice - findProduct.sellingPrice}
                      </p>
                      <p>Weight: {findProduct.netWeight}g</p>
                    </div>
                  </div>
                </>
              ) : (
                <>{status === 'loading' && <p>Loading...</p>}</>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
