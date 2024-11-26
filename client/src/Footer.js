import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-info">
                &copy; 2024 woodvale. all rights reserved.
            </div>
            <div className='footer-links'>
                <span><Link to="/about">About Us</Link></span>
                <span><Link to="/careers">Careers</Link></span>
                <span><Link to="/rules">Rules</Link></span>
            </div>
        </footer>
    );
};

export default Footer;