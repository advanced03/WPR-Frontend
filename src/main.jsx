import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartRegister from './pages/PartRegister.jsx';
import Login from './pages/Login.jsx';
import ZakelijkRegister from './pages/ZakelijkRegister.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/PartRegister" element={<PartRegister />} />
                <Route path="/ZakelijkRegister" element={<ZakelijkRegister />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
