import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Column 1: Tools */}
                    <div className="footer-column">
                        <h4 className="footer-heading">PDF Tools</h4>
                        <ul className="footer-links">
                            <li><a href="/merge-pdf">Merge PDF</a></li>
                            <li><a href="/split-pdf">Split PDF</a></li>
                            <li><a href="/compress-pdf">Compress PDF</a></li>
                            <li><a href="/pdf-to-jpg">PDF to JPG</a></li>
                            <li><a href="/jpg-to-pdf">JPG to PDF</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Convert */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Convert</h4>
                        <ul className="footer-links">
                            <li><a href="/pdf-to-word">PDF to Word</a></li>
                            <li><a href="/word-to-pdf">Word to PDF</a></li>
                            <li><a href="/pdf-to-excel">PDF to Excel</a></li>
                            <li><a href="/excel-to-pdf">Excel to PDF</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/pricing">Pricing</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Logo & Social */}
                    <div className="footer-column">
                        <h3 className="footer-logo text-gradient">ePDF</h3>
                        <p className="footer-tagline">
                            Every PDF tool you need, all in one place.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} ePDF. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
