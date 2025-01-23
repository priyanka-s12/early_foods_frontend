import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserByIdAsync } from './userSlice';
import { Link } from 'react-router-dom';

const Account = () => {
  const dispatch = useDispatch();
  const userId = '678661161046fcf9a4996dd5';

  const { user, status, error } = useSelector((state) => state.user);
  console.log(user, status, error);

  useEffect(() => {
    dispatch(fetchUserByIdAsync(userId));
  }, []);

  return (
    <div>
      <Header />
      <main className="container py-3">
        <h2 className="mb-5">My Account</h2>

        <div className="row">
          {status === 'loading' && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {user && (
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4>Profile</h4>
                </div>
                <div className="card-body">
                  <div className="card-text">
                    <p>
                      <strong>Name: </strong>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div className="card-text">
                    <p>
                      <strong>Email: </strong>
                      {user.email}
                    </p>
                  </div>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/account/addresses`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
