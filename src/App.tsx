import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation/Navigation';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Gallery from './pages/Gallery/Gallery';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Manufacturing from './pages/Manufacturing/Manufacturing';
import Contact from './pages/Contact/Contact';
import CaseStudy from './pages/CaseStudy/CaseStudy';
import './App.css';

// We need a wrapper component to use useLocation hook from react-router-dom
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        {/* We will add other routes here later */}
        <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Page Under Construction</h1></div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="app-container">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <Navigation />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <BottomNavigation />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
