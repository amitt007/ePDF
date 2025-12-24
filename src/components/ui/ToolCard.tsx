import React from 'react';
import { Link } from 'react-router-dom';
import './ToolCard.css';

export interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, href }) => {
    return (
        <Link to={href} className="tool-card hover-lift">
            <div className="tool-card-icon-wrapper">
                <div className="tool-card-icon">{icon}</div>
            </div>
            <h3 className="tool-card-title">{title}</h3>
            <p className="tool-card-description">{description}</p>
            <div className="tool-card-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </Link>
    );
};

export default ToolCard;
