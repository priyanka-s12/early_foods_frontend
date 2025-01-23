import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  updateAddressAsync,
  addAddressAsync,
} from '../features/address/addressSlice';
// import { addUserAddressAsync } from '../features/user/userSlice';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    pincode: '',
    state: '',
    country: 'India',
  });

  const [message, setMessage] = useState(false);
  const userId = '678661161046fcf9a4996dd5';
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const { state: existingAddress } = location;
  console.log(existingAddress);

  useEffect(() => {
    if (existingAddress) {
      setFormData(existingAddress);
    }
  }, [existingAddress]);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === 'checkbox' && checked
          ? value
          : name === 'pincode' || name === 'mobileNumber'
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // const newAddress = { ...formData };
    if (existingAddress) {
      dispatch(updateAddressAsync({ _id: existingAddress._id, ...formData }));
      console.log(formData);
      setMessage('Address updated successfully');
    } else {
      dispatch(
        addAddressAsync({ ...formData, user: '678661161046fcf9a4996dd5' })
      );
      setMessage('Address added successfully');
    }

    setMessage(true);

    console.log(formData);

    const resetValues = {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      pincode: '',
      state: '',
      country: 'India',
      mobileNumber: '',
    };

    setFormData(resetValues);
  };
  return (
    <div>
      <Header />
      <main className="container py-3">
        <h2 className="mb-3">
          {existingAddress ? 'Update' : 'Add New'} Address
        </h2>

        {message && (
          <p className="alert alert-success">
            Address {existingAddress ? 'updated' : 'added'} successfully
          </p>
        )}

        <Link to={`/account/addresses/${userId}`}>Return to Address Page</Link>
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3 mt-3">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <input
              type="text"
              placeholder="Address Line 1"
              className="form-control"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              placeholder="Address Line 2"
              className="form-control"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              placeholder="Landmark"
              className="form-control"
              name="landmark"
              value={formData.landmark}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              placeholder="City"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              placeholder="PIN Code"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              placeholder="State"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <input
              type="number"
              placeholder="Phone Number - 555-555-1234"
              className="form-control"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3 col-md-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#fecdd3', color: '#4c0519' }}
            >
              {existingAddress ? 'Update' : 'Add'} Address
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddressForm;
