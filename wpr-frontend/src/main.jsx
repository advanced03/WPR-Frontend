import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login.jsx';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* Voeg hier andere routes toe als je die hebt */}
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
