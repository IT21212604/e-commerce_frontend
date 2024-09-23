import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import AddProduct from './Components/Product/AddProduct';
import Sidebar from './Components/NavBar/Sidebar';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path ="/register" element={<Register/>}></Route>
          <Route path ="/login" element={<Login/>}></Route>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/sidebar" element={<Sidebar/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
