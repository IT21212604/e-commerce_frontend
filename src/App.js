import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path ="/register" element={<Register/>}></Route>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
