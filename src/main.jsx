import React from 'react';
import ReactDOM from 'react-dom/client'; // Zorg ervoor dat je 'react-dom/client' gebruikt voor React 18+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import login from './pages/login.jsx';
import Partregister from './pages/partRegister.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<login />} />
                <Route path="/partRegister" element={<Partregister />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
