import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Search = () => {
  //   const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.products.products;
  });
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  console.log(products);
  const searchTitle = useSelector((state) => state.products.searchTitle);
  //   const title = searchParams.get('q');
  //   console.log(searchTitle);
  //   console.log(title);

  const filteredDataByTitle =
    searchTitle &&
    products?.filter((product) => {
      return product.productTitle.toLowerCase().includes(searchTitle);
    });

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">Search Results</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="row">
          <p>
            {filteredDataByTitle.length} results found for "{searchTitle}"
          </p>
          {filteredDataByTitle.length > 0 ? (
            <>
              {filteredDataByTitle.map((product) => (
                <div className="col-md-3" key={product._id}>
                  <div className="card mb-3">
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
                  </div>
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
