import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';

const NewlyAddedProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    console.log(state.products);
    return state.products.products;
  });
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const lastFourProducts = products.slice(-4);
  console.log(lastFourProducts);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <main>
      <section>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="row">
          {lastFourProducts?.map((product) => (
            <div className="col-md-3" key={product._id}>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/products/${product._id}`}
              >
                <div className="card mb-3">
                  <img
                    src={product.imageUrl}
                    className="rounded img-fluid"
                    alt={product.productTitle}
                  />
                  <div className="card-body text-center">
                    <h5>{product.productTitle}</h5>
                    <div className="d-flex justify-content-between">
                      <p>₹ {product.sellingPrice}</p>
                      <p>{product.netWeight}g</p>
                    </div>
                    <div className="mt-3">
                      <button className="card-link btn btn-danger">
                        Add to Cart
                      </button>
                      <button className="card-link btn btn-primary">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default NewlyAddedProducts;
