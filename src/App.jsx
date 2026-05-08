import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Teams from './views/Teams';
import Players from './views/Players';
import SquadBuilder from './views/SquadBuilder';

function App() {
  return (
    
    <BrowserRouter>
      <div className="app-container">
       
        <Navbar />
        
        <main className="main-content">
         
          <Routes>
            
            <Route path="/" element={<Home />} />
            
            
            <Route path="/teams" element={<Teams />} />
            
            <Route path="/teams/:id" element={<Teams />} />
            
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<Players />} />
            <Route path="/squad-builder" element={<SquadBuilder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
