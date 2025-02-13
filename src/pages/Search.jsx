import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { searchProductByTitleAsync } from '../features/products/productsSlice';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const { searchTitle } = useParams();
  // console.log(searchTitle);
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  console.log(products, status, error);

  useEffect(() => {
    dispatch(searchProductByTitleAsync(searchTitle));
  }, [searchTitle]);
  return (
    <div>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">Search Results</h2>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>{error}</p>}

        <div className="row">
          {products ? (
            <>
              <p>
                {products.length} results found for "{searchTitle}"
              </p>
              {products.map((product) => (
                <div className="col-sm-6 col-md-3" key={product._id}>
                  {/* <div className="card mb-3">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/products/${product._id}`}
                    >
                      <img
                        src={product.imageUrl}
                        className="rounded img-fluid"
                        alt={product.productTitle}
                      />
                    </Link>
                    <div className="card-body text-center">
                      <h5>{product.productTitle}</h5>
                      <div className="d-flex justify-content-between mt-3">
                        <p></p>
                        <p>
                          <i
                            className="bi bi-star-fill me-2"
                            style={{ fontSize: '1rem', color: '#f1c40f' }}
                          ></i>
                          {product.rating} ({product.numberOfReviews})
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mx-5">
                        <p>₹ {product.sellingPrice}</p>
                        <p>{product.netWeight}g</p>
                      </div>
                      <div className="mt-3">
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
                  </div> */}
                  <ProductCard product={product} />
                </div>
              ))}
            </>
          ) : (
            <p>No data found</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
