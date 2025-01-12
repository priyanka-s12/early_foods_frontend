import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  fetchProducts,
  setCategoryFilter,
  setRatingFilter,
  setSortByPriceFilter,
  setPriceRangeFilter,
  clearAllFilters,
} from './productsSlice';
import { fetchCategories } from '../category/categorySlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProductsView = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const { state: item } = location;

  // state variables
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  // console.log(products);

  const priceRange = useSelector((state) => state.products.priceRange);
  console.log(priceRange);

  const maxPrice = useSelector((state) => state.products.maxPrice);

  const minPrice = useSelector((state) => state.products.minPrice);

  const categoryFilter = useSelector((state) => state.products.categoryFilter);

  const ratingFilter = useSelector((state) => state.products.ratingFilter);

  const sortByPrice = useSelector((state) => state.products.sortByPrice);

  const categories = useSelector((state) => {
    return state.categories.categories;
  });

  const filterByPriceRange = products?.filter(
    (product) =>
      product.sellingPrice >= minPrice && product.sellingPrice <= priceRange
  );

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      dispatch(setCategoryFilter([...categoryFilter, value]));
    } else {
      dispatch(
        setCategoryFilter(
          categoryFilter.filter((category) => category !== value)
        )
      );
    }
  };

  const filterByCategory = filterByPriceRange?.filter((product) =>
    categoryFilter.includes(product.category.categoryName)
  );

  const filterByRating = filterByCategory?.filter(
    (product) => product.rating >= ratingFilter
  );

  const handleSort = (e) => {
    dispatch(setSortByPriceFilter(e.target.value));
  };

  const sortByPriceFilter = filterByRating.sort((a, b) =>
    sortByPrice === 'lowToHigh'
      ? a.sellingPrice - b.sellingPrice
      : b.sellingPrice - a.sellingPrice
  );

  useEffect(() => {
    dispatch(setCategoryFilter([...categoryFilter, item.categoryName]));
  }, []);

  useEffect(() => {
    dispatch(setPriceRangeFilter(maxPrice));
  }, [maxPrice]);

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
                <button
                  className="btn text-primary fw-medium"
                  onClick={() => dispatch(clearAllFilters())}
                >
                  Clear
                </button>
              </div>
              <div className="my-3">
                <h6>Price</h6>
                <span>{priceRange}</span>
                <input
                  type="range"
                  className="form-range"
                  id="priceRange"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  step="10"
                  onChange={(e) =>
                    dispatch(setPriceRangeFilter(e.target.value))
                  }
                />
                <div className="d-flex justify-content-between">
                  <span>{minPrice}</span>
                  <span>{maxPrice}</span>
                </div>
              </div>
              <div>
                <h6>Category</h6>
                {categories?.map((category) => (
                  <div key={category._id}>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value={category.categoryName}
                        onChange={(e) => handleCheckbox(e)}
                        checked={categoryFilter.includes(category.categoryName)}
                      />
                      {category.categoryName}
                    </label>
                    <br />
                  </div>
                ))}
              </div>

              <div className="my-4">
                <h6>Rating</h6>
                {[4, 3, 2, 1].map((ratingNumber, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingNumber}
                        onChange={(e) =>
                          dispatch(setRatingFilter(e.target.value))
                        }
                      />{' '}
                      {ratingNumber} stars and above
                    </label>
                  </div>
                ))}
              </div>

              <div className="my-3">
                <h6>Sort by</h6>
                <label>
                  <input
                    type="radio"
                    name="sortByPrice"
                    value="lowToHigh"
                    onChange={handleSort}
                  />{' '}
                  Price - Low to High
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="sortByPrice"
                    value="highToLow"
                    onChange={handleSort}
                  />{' '}
                  Price - High to Low
                </label>
              </div>
            </div>

            {/* right col */}
            <div className="col-md-9 bg-body-tertiary">
              {status === 'loading' && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <div className="row">
                <h4 className="mb-3">
                  Showing {sortByPriceFilter.length} products
                </h4>
                {sortByPriceFilter?.length > 0 ? (
                  <>
                    {sortByPriceFilter?.map((product) => (
                      <div className="col-sm-6 col-md-4" key={product._id}>
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
                  <p>No matching product found.</p>
                )}
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
