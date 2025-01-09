import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchProducts } from './productsSlice';
import { fetchCategories } from '../category/categorySlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductsView = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  console.log(categoryId);

  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  console.log(products);

  const categories = useSelector((state) => {
    console.log(state.categories);
    return state.categories.categories;
  });
  console.log(categories);

  const filteredProducts = products.filter(
    (product) => product.category._id == categoryId
  );
  console.log(filteredProducts);

  const productList = categoryId ? filteredProducts : products;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <Header />
      <main className="container-fluid p-3">
        <section className="">
          <div className="row">
            {/* left col */}
            <div className="col-md-3 mb-3">
              <div className="d-flex justify-content-between">
                <h5>Filters</h5>
                <Link>Clear</Link>
              </div>
              <div className="my-3">
                <h6>Price</h6>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="1000"
                  step="50"
                  id="priceRange"
                />
                <div className="d-flex justify-content-between">
                  <span>50</span>
                  <span>500</span>
                  <span>1000</span>
                </div>
              </div>
              <div>
                <h6>Category</h6>
                {categories?.map((category, index) => (
                  <div key={category._id}>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value={category.categoryName}
                        onChange={(e) => handleCheckbox(e, category._id, index)}
                      />
                      {category.categoryName}
                    </label>
                    <br />
                  </div>
                ))}
              </div>

              <div className="my-4">
                <h6>Rating</h6>
                <label>
                  <input type="radio" name="rating" /> 4 Stars & above
                </label>
                <br />
                <label>
                  <input type="radio" name="rating" /> 3 Stars & above
                </label>
                <br />
                <label>
                  <input type="radio" name="rating" /> 2 Stars & above
                </label>
                <br />
                <label>
                  <input type="radio" name="rating" /> 1 Stars & above
                </label>
              </div>

              <div className="my-3">
                <h6>Sort by</h6>
                <label>
                  <input type="radio" /> Price - Low to High
                </label>
                <br />
                <label>
                  <input type="radio" /> Price - High to Low
                </label>
              </div>
            </div>

            {/* right col */}
            <div className="col-md-9 bg-body-tertiary">
              {status === 'loading' && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <div className="row">
                <h4 className="mb-3">Showing {productList.length} products</h4>
                {productList?.map((product) => (
                  <div className="col-md-4" key={product._id}>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default ProductsView;
