import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Gallery from './pages/Gallery';
import Manufacturing from './pages/Manufacturing';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <div className="app-container" style={{ position: 'relative' }}>
        <div className="grain-overlay"></div>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
