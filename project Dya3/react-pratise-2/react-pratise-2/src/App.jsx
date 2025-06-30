import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';

const UserCard = () => {
  return (
    <div style={{ fontFamily: 'serif', padding: '30px',backgroundColor:'white' }}>
      <h1 style={{ color: '#006666', fontWeight: 'bold', fontSize: '2rem',textAlign:'start' }}>
        Users Display
      </h1>

      <div style={{
        border: '2px solid black',
        padding: '30px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '800px',
        background:'white'
      }}>
        
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#56aaff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: 'white'
        }}>
          200 x 200
        </div>

      
        <div style={{ marginLeft: '30px', flex: 1 }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color:'black'}}>Chrisse</div>
          <div style={{ marginBottom: '15px',color:'black' }}>4018 Sachs Trail</div>

          <button style={{
            padding: '10px 20px ',
            borderRadius: '10px',
            border: '3px solid #444',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            color:'black',
            button:'left'
            
          }}>
            follow
          </button>


          <div style={{ display: 'flex', marginTop: '20px', gap: '60px' }}>
            <div>
              <div style={{ fontWeight: 'bold' ,color:'black'}}>Posts</div>
              <div style={{fontWeight: 'bold',color:'black' }}>1841</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold',color:'black' }}>Followers</div>
              <div style={{fontWeight: 'bold',color:'black' }}>66868</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

