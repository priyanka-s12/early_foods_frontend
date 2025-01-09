import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import FeaturedCategories from './components/FeaturedCategories';
import NewlyAddedProducts from './components/NewlyAddedProducts';
function App() {
  const sliderImages = [
    'https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/f/AmazonStores/A21TJRUUN4KGV/3613d5cf330a89dff7529ee3ce38ee50.w3000.h600._CR0%2C0%2C3000%2C600_SX1920_.png',
    'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/7c82c593-7449-4a4b-913f-781ac6b716a3._CR0%2C0%2C3000%2C600_SX1920_.png',
    'https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/0/AmazonStores/A21TJRUUN4KGV/c0ff066cfac8c6911f6528803720183e.w3000.h600._CR0%2C0%2C3000%2C600_SX1920_.png',
    'https://earlyfoods.com/cdn/shop/files/Indian_Website_Home_Page_Banners_8786b49f-ed5a-4c0d-b9f1-d8ab04fc2d02.png?v=1735191858&width=1540',
  ];

  return (
    <>
      <Header />
      <main className="container mt-3 py-3">
        <FeaturedCategories />

        <section className="mt-5">
          <img
            src="https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/f/AmazonStores/A21TJRUUN4KGV/3613d5cf330a89dff7529ee3ce38ee50.w3000.h600._CR0%2C0%2C3000%2C600_SX1920_.png"
            className="img-fluid w-100 object-fit-cover"
            style={{ height: '300px' }}
          />
        </section>

        <section className="mt-5">
          <h3 className="text-center mb-5">Newly Added Products</h3>
          <NewlyAddedProducts />
        </section>

        <section className="my-5">
          <div className="text-center">
            <Link to="/products">View All Products</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
