import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartRegister from './pages/partRegister.jsx';
import Login from './pages/login.jsx';
import BoRegister from './pages/BoRegister.jsx';
import Home from './pages/Home.jsx';
import AutoVinden from './pages/AutoVinden.jsx';
import HuurVerzoek from './pages/HuurVerzoek.jsx';
import HuurGeschiedenis from './pages/HuurGeschiedenis.jsx';
import Profiel from './pages/Profiel.jsx';
import FoVoertuigInname from './pages/FoVoertuigInname.jsx';
import FoVoertuigUitgifte from './pages/FoVoertuigUitgifte.jsx';
import BoHuurVerzoekBehandeling from './pages/BoHuurVerzoekBehandeling.jsx';
import BoWagenparkBeheer from './pages/BoWagenparkBeheer.jsx';
import WbRegister from './pages/WbRegister.jsx';
import WbAccountsBeheren from './pages/WbAccountsBeheren.jsx';
import WbStatus from './pages/WbStatus.jsx';
import WbAbboBeheer from './pages/WbAbboBeheer.jsx';
import RegZak from './pages/regZakelijk.jsx';
import Wbaccbeheer from './pages/wbAccbeheer.jsx';
import Privacy from './pages/Privacy.jsx';

/* Functie om te controleren of de gebruiker is ingelogd */
const isAuthenticated = () => {
    return sessionStorage.getItem('jwtToken') !== null;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Publieke route voor de loginpagina */}
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/RegZak" element={<RegZak />} />

                {/* Beschermde routes, alleen toegankelijk met een geldig token */}
                <Route
                    path="/Home"
                    element={isAuthenticated() ? <Home /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/PartRegister"
                    element={isAuthenticated() ? <PartRegister /> : <Navigate to="/Login" />}
                />

                <Route
                    path="/BoRegister"
                    element={isAuthenticated() ? <BoRegister /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/AutoVinden"
                    element={isAuthenticated() ? <AutoVinden /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/HuurVerzoek"
                    element={isAuthenticated() ? <HuurVerzoek /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Geschiedenis"
                    element={isAuthenticated() ? <HuurGeschiedenis /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Profiel"
                    element={isAuthenticated() ? <Profiel /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/FoVoertuigInname"
                    element={isAuthenticated() ? <FoVoertuigInname /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/FoVoertuigUitgifte"
                    element={isAuthenticated() ? <FoVoertuigUitgifte /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/BoHuurVerzoekBehandeling"
                    element={isAuthenticated() ? <BoHuurVerzoekBehandeling /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/BoWagenparkBeheer"
                    element={isAuthenticated() ? <BoWagenparkBeheer /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbRegister"
                    element={isAuthenticated() ? <WbRegister /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbAccountsBeheren"
                    element={isAuthenticated() ? <WbAccountsBeheren /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbStatus"
                    element={isAuthenticated() ? <WbStatus /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbAbboBeheer"
                    element={isAuthenticated() ? <WbAbboBeheer /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Privacy"
                    element={isAuthenticated() ? <Privacy /> : <Navigate to="/Login" />}
                />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
