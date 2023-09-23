import { useState } from 'react';

import Router from '../routes/Router';
import Header from '../components/UI/Header/Header';
import Footer from '../components/UI/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../assets/styles/reset.scss';
import '../assets/styles/global.scss';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [selectedProductData, setSelectedProductData] = useState(null);

  function toggleModal(val: string) {
    setIsOpenModal(val);
  }

  return (
    <div className="App">
      <Header />
      <Router
        products={products}
        setProducts={setProducts}
        toggleModal={toggleModal}
        isOpenModal={isOpenModal}
        loadingProduct={loadingProduct}
        setLoadingProduct={setLoadingProduct}
        selectedProductData={selectedProductData}
        setSelectedProductData={setSelectedProductData}
      />
      <Footer />
    </div>
  );
}

export default App;
