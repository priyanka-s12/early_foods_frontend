import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlistAsync } from '../features/wishlist/wishlistSlice';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="card mb-3">
      <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
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
        <div className="d-flex justify-content-between">
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
          <button
            className="card-link btn btn-primary"
            onClick={() =>
              dispatch(
                addToWishlistAsync({
                  product: product._id,
                  user: '678661161046fcf9a4996dd5',
                })
              )
            }
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
