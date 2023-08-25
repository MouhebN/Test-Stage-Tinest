import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './Views/Accueil.jsx';
import Parcellist from './Views/Parcellist.jsx';
import ExchangeColis from './Views/exchangeparcel';
import SuiviEchange from './Views/Suiviexchange';
import Addparcel from './Views/Addparcel';
import ManagementParcel from './Views/Managementparcel';
import MiniDrawerfourisseur from './components/Sidebar'; 
// import DisplayColis from './pages/DisplayColis';
const App = () => {
  return (
    <BrowserRouter>
      <MiniDrawerfourisseur/>
        <Routes>
          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/parcellist" element={<Parcellist/>} />
          <Route path="/echangeparcel" element={<ExchangeColis/>} />  
          <Route path="/suiviechange" element={<SuiviEchange/>} />  
          <Route path="/Addparcel" element={<Addparcel/>} /> 
          <Route path="/parcelmanagement" element={<ManagementParcel/>} />
          {/* <Route exact path="/display-colis" component={DisplayColis} /> */}
        </Routes>
      
    </BrowserRouter>

    


  );
};



export default App;