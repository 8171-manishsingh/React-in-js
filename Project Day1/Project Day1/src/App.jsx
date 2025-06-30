import React from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import Footer from './Footer';



function App() {
  return (
    <div style={{ minHeight: '50vh', width:"100%"}}>
      <Navbar />
      <ProductCard />
      <Footer />
    </div>
  );
}

export default App;
