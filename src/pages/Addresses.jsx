import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAddresses,
  deleteAddressAsync,
} from '../features/address/addressSlice';
import { useEffect, useState } from 'react';

const Addresses = () => {
  const dispatch = useDispatch();
  const userId = '678661161046fcf9a4996dd5';

  const [message, setMessage] = useState(false);

  const addresses = useSelector((state) => state.address.addresses);
  console.log(addresses);
  const { status, error } = useSelector((state) => state.address);
  console.log(status, error);

  const handleDelete = (addressId) => {
    dispatch(deleteAddressAsync(addressId));
    setMessage('Address deleted successfully');
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);
  return (
    <div>
      <Header />
      <main className="container py-3">
        <div className="d-flex justify-content-between">
          <h2 className="mb-3">My Addresses</h2>

          <Link
            className="btn mb-3 btn-outline-primary"
            // style={{ backgroundColor: '#fecdd3', color: '#4c0519' }}
            to={`/account/addresses/add`}
          >
            Add New Address
          </Link>
        </div>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {message && <p className="alert alert-success">{message}</p>}

        <div className="row mb-3">
          {addresses &&
            addresses.map((userAddress, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <div className="card-header">
                    <h4>
                      {userAddress.firstName} {userAddress.lastName}
                    </h4>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      {userAddress.firstName} {userAddress.lastName}
                    </p>
                    <p>
                      {userAddress.addressLine1} {userAddress.addressLine2}
                      <br />
                      {userAddress.landmark}
                      <br />
                      {userAddress.city}
                      <br />
                      {userAddress.state} {userAddress.pincode}
                      <br />
                      {userAddress.country}
                      <br />
                      Phone Number: {userAddress.mobileNumber}
                    </p>
                    <div className="d-flex gap-2">
                      <Link
                        className="btn btn-outline-primary w-50"
                        to={`/account/addresses/edit/${userAddress._id}`}
                        state={userAddress}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger w-50"
                        onClick={() => handleDelete(userAddress._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Addresses;
