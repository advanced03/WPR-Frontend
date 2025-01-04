import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartRegister from './pages/partRegister.jsx';
import Login from './pages/login.jsx';
import ZakelijkRegister from './pages/ZakelijkRegister.jsx';
import Home from './pages/Home.jsx';
import AutoZoeken from './pages/AutoZoeken.jsx';
import AutoVinden from './pages/AutoVinden.jsx';
import HuurVerzoek from './pages/HuurVerzoek.jsx';
import HuurGeschiedenis from './pages/HuurGeschiedenis.jsx';
import Profiel from './pages/Profiel.jsx';
import FoVoertuigInname from './pages/FoVoertuigInname.jsx';
import FoVoertuigUitgifte from './pages/FoVoertuigUitgifte.jsx';
import BoHuurVerzoekBehandeling from './pages/BoHuurVerzoekBehandeling.jsx';
import BoSchadeRegister from './pages/BoSchadeRegister.jsx';
import BoWagenparkBeheer from './pages/BoWagenparkBeheer.jsx';

const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/PartRegister" element={<PartRegister />} />
                <Route path="/ZakelijkRegister" element={<ZakelijkRegister />} />
                <Route path="/AutoZoeken" element={<AutoZoeken />} />
                <Route path="/AutoVinden" element={<AutoVinden />} />
                <Route path="/HuurVerzoek" element={<HuurVerzoek />} />
                <Route path="/Geschiedenis" element={<HuurGeschiedenis />} />
                <Route path="/Profiel" element={<Profiel />} />
                <Route path="/FoVoertuigInname" element={<FoVoertuigInname />} />
                <Route path="/FoVoertuigUitgifte" element={<FoVoertuigUitgifte />} />
                <Route path="/BoHuurVerzoekBehandeling" element={<BoHuurVerzoekBehandeling />} />
                <Route path="/BoSchadeRegister" element={<BoSchadeRegister />} />
                <Route path="/BoWagenparkBeheer" element={<BoWagenparkBeheer />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
