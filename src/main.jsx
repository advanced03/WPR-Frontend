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

/* Dit is de navigatie methode, dit zorgt ervoor dat de pagina's correct ingeladen worden */
const App = () => {
    const token = sessionStorage.getItem('jwtToken'); // Haal het token uit sessionStorage

    return (
        <Router>
            <Routes>
                {/* Openbare routes */}
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/PartRegister" element={<PartRegister />} />
                <Route path="/BoRegister" element={<BoRegister />} />
                <Route path="/RegZakelijk" element={<RegZak />} />
                <Route path="/Privacy" element={<Privacy />} />

                {/* Routes waar gebruikers eerst ingelogd moeten zijn */}
                <Route
                    path="/Home"
                    element={token ? <Home /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/AutoVinden"
                    element={token ? <AutoVinden /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/HuurVerzoek"
                    element={token ? <HuurVerzoek /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/HuurGeschiedenis"
                    element={token ? <HuurGeschiedenis /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Profiel"
                    element={token ? <Profiel /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/FoVoertuigInname"
                    element={token ? <FoVoertuigInname /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/FoVoertuigUitgifte"
                    element={token ? <FoVoertuigUitgifte /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/BoHuurVerzoekBehandeling"
                    element={token ? <BoHuurVerzoekBehandeling /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/BoWagenparkBeheer"
                    element={token ? <BoWagenparkBeheer /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbRegister"
                    element={token ? <WbRegister /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbAccountsBeheren"
                    element={token ? <WbAccountsBeheren /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbStatus"
                    element={token ? <WbStatus /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/WbAbboBeheer"
                    element={token ? <WbAbboBeheer /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Wbaccbeheer"
                    element={token ? <Wbaccbeheer /> : <Navigate to="/Login" />}
                />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
