import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CustomItemContext from './context/ItemContext';
import './App.css';

function App() {
  return (
    <CustomItemContext>
      <Header />
      <ProductList />
    </CustomItemContext>
  );
}

export default App;