import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import InfoPage from './pages/Main';
import PositionsPage from './pages/Positions';
import CandidatesPage from './pages/Candidates';
import ContactsPage from './pages/Contacts';
import ApplicationPage from './pages/Application';
import EditPosition from './pages/EditPosition';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-body">
          <div className="title">
            <h1>Akvelon</h1>
          </div>
          <Routes>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="/main" element = {<InfoPage/>}/>
            <Route path="/positions" element = {<PositionsPage/>}/>
            <Route path="/application/:id" element = {<ApplicationPage mode={"create"}/>}/>
            <Route path="/candidates" element = {<CandidatesPage/>}/>
            <Route path="/candidates/:id" element = {<ApplicationPage mode={"edit"}/>}/>
            <Route path="/contacts" element = {<ContactsPage/>}/>
            <Route path="/login" element = {<LoginPage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
