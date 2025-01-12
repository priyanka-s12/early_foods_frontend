import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  // console.log(productId);

  const products = useSelector((state) => {
    return state.products.products;
  });
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  // console.log(products);
  const findProduct = products.find((product) => product._id === productId);
  // console.log(findProduct);
  useEffect(() => {
    dispatch(fetchProducts());
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
                      >
                        Add to Cart
                      </button>
                      <button className="card-link btn btn-primary">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title mb-3">
                        {findProduct.productTitle}
                      </h2>
                      <div className="d-flex justify-content-between">
                        <h6>Rating: {findProduct.rating}</h6>
                        <h6 className="">
                          Number of Reviews: {findProduct.numberOfReviews}
                        </h6>
                      </div>
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
