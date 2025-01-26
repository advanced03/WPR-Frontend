import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

/* Dit is de navigatie methode, dit zorgt ervoor dat de pagina's correct ingeladen worden*/
const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Login />} />
                <Route path="/wbaccbeheer" element={<Wbaccbeheer />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/PartRegister" element={<PartRegister />} />
                <Route path="/RegZakelijk" element={<RegZak />} />
                <Route path="/BoRegister" element={<BoRegister />} />
                <Route path="/AutoVinden" element={<AutoVinden />} />
                <Route path="/HuurVerzoek" element={<HuurVerzoek />} />
                <Route path="/Geschiedenis" element={<HuurGeschiedenis />} />
                <Route path="/Profiel" element={<Profiel />} />
                <Route path="/FoVoertuigInname" element={<FoVoertuigInname />} />
                <Route path="/FoVoertuigUitgifte" element={<FoVoertuigUitgifte />} />
                <Route path="/BoHuurVerzoekBehandeling" element={<BoHuurVerzoekBehandeling />} />
                <Route path="/BoWagenparkBeheer" element={<BoWagenparkBeheer />} />
                <Route path="/WbRegister" element={<WbRegister />} />
                <Route path="/WbAccountsBeheren" element={<WbAccountsBeheren />} />
                <Route path="/WbStatus" element={<WbStatus />} />
                <Route path="/WbAbboBeheer" element={<WbAbboBeheer />} />
                <Route path="/Privacy" element={<Privacy />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);