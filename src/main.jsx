import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import ProductsView from './features/products/ProductsView';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Account from './features/user/Account';
import Addresses from './pages/Addresses';
import AddressForm from './pages/AddressForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/categories/:categoryId',
    element: <ProductsView />,
  },
  { path: '/products/:productId', element: <ProductDetails /> },
  { path: '/products', element: <ProductsView /> },
  { path: '/products/search/:searchTitle', element: <Search /> },
  { path: '/account/:userId', element: <Account /> },
  { path: '/account/addresses', element: <Addresses /> },
  { path: '/account/addresses/:addressId', element: <AddressForm /> },
  { path: '/account/:userId/addresses/add', element: <AddressForm /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
