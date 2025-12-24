import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
    progress: number;
    status?: string;
    showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    status,
    showPercentage = true,
}) => {
    const getStatusMessage = () => {
        if (status) return status;
        if (progress === 0) return 'Initializing...';
        if (progress < 25) return 'Starting...';
        if (progress < 75) return 'Processing...';
        if (progress < 100) return 'Almost done...';
        return 'Complete!';
    };

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-header">
                <span className="progress-bar-status">{getStatusMessage()}</span>
                {showPercentage && (
                    <span className="progress-bar-percentage">{Math.round(progress)}%</span>
                )}
            </div>

            <div className="progress-bar-track">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                >
                    <div className="progress-bar-shimmer" />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
