import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartRegister from './pages/partRegister.jsx';
import Login from './pages/login.jsx';
import ZakelijkRegister from './pages/ZakelijkRegister.jsx';
import Home from './pages/Home.jsx';
import Huren from './pages/Huren.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/PartRegister" element={<PartRegister />} />
                <Route path="/ZakelijkRegister" element={<ZakelijkRegister />} />
                <Route path="/Huren" element={<Huren />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
