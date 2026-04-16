import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PaperSearch from './pages/PaperSearch';
import PaperDetails from './pages/PaperDetails';
import Recommendations from './pages/Recommendations';
import PersonalLibrary from './pages/PersonalLibrary';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/search" element={<PaperSearch />} />
                        <Route path="/paper/:paperId" element={<PaperDetails />} />
                        <Route path="/recommendations" element={<Recommendations />} />
                        <Route path="/library" element={<PersonalLibrary />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;