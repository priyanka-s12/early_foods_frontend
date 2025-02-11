import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../features/category/categorySlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => {
    return state.categories.categories;
  });
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const fourFeatured = categories?.slice(0, 4);
  // console.log(fourFeatured);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  // console.log(categories, status);
  return (
    <main>
      <section>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="row">
          {fourFeatured?.map((category) => (
            <div className="col-md-3 mb-3" key={category._id}>
              <Link
                className="card text-decoration-none"
                to={`/categories/${category._id}`}
                state={category}
              >
                <img
                  src={category.categoryImageUrl}
                  className="oject-fit-cover img-fluid rounded"
                  placeholder={category.categoryName}
                />
                <div className="card-body text-bg-secondary">
                  <h5 className="text-center">{category.categoryName}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturedCategories;
