import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <span className="logo-text text-gradient">ePDF</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <Link to="/" className="nav-link">All Tools</Link>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                        <Link to="/about" className="nav-link">About</Link>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <button
                            onClick={toggleDarkMode}
                            className="icon-btn"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={toggleMenu}
                            className="mobile-menu-btn"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="nav-mobile">
                        <Link to="/" className="nav-link-mobile" onClick={toggleMenu}>
                            All Tools
                        </Link>
                        <Link to="/pricing" className="nav-link-mobile" onClick={toggleMenu}>
                            Pricing
                        </Link>
                        <Link to="/about" className="nav-link-mobile" onClick={toggleMenu}>
                            About
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
