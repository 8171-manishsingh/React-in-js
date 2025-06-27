import React from 'react';
import Navbar from './Navbar';
function ProductCard  () {
  return (
    
    <div style={{
      display: 'flex',
      background: '#fff',
      Width: '100px',
      
      margin: '2rem auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '5px',
      overflow: 'hidden'
      
    }}>
      <img src="Project Day1/public/img.jpg" alt=""
        style={{ width: '50%', objectFit: 'cover', backgroundColor:"green"
         }}
      />
      <div style={{ padding: '1.5rem', flex: 1 }}>
        <h2>CLASSIC PEACE LILY</h2>
        <p style={{ color: 'gray', marginBottom: '1rem' }}>POPULAR HOUSE PLANT</p>
        <h3>$18</h3>
        <p style={{ margin: '1rem 0' }}>
          Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a bow & butterfly pick.
        </p>
        <button style={{
          padding: '10px 20px',
          marginRight: '10px',
          border: '1px solid black',
          background: '#fff',
          cursor: 'pointer',
          borderRadius: '5px',
          

        }}>
          ADD TO CART
        </button>
        <button style={{
          padding: '10px 20px',
          border: '1px solid black',
          background: '#fff',
          cursor: 'pointer'
        }}>
          WISHLIST
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
