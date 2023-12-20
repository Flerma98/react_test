import React, {useEffect} from "react";
import logo from '../../../logo.svg';
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user_data');

        if (userData) return;

        navigate('/login');

    }, [navigate]);

    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    );
}