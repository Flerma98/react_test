import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Home} from "./components/pages/home/Home";
import {Login} from "./components/pages/login/Login";

export default function App() {
    return (<Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>);
}

