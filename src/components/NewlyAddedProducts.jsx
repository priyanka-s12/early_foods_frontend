import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsAsync } from '../features/products/productsSlice';
import ProductCard from './ProductCard';

const NewlyAddedProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products.products;
  });
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const lastFourProducts = products?.slice(-4);
  // console.log(lastFourProducts);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  return (
    <main>
      <section>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="row">
          {lastFourProducts?.map((product) => (
            <div className="col-md-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default NewlyAddedProducts;
