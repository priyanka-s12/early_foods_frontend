import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Toaster } from 'react-hot-toast';
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
import Wishlist from './features/wishlist/Wishlist';
import Cart from './features/cart/Cart';

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
  { path: '/account/addresses/:userId', element: <Addresses /> },
  { path: '/account/addresses/edit/:addressId', element: <AddressForm /> },
  { path: '/account/addresses/add', element: <AddressForm /> },
  { path: '/account/wishlist/:userId', element: <Wishlist /> },
  { path: '/account/cart/:userId', element: <Cart /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      <Toaster position="top-right" />;
    </Provider>
  </StrictMode>
);
