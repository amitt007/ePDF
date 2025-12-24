import React from 'react';
import ToolCard from '../components/ui/ToolCard';
import Button from '../components/ui/Button';
import { FileText, Scissors, Minimize2, Image, FileImage, Download } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
    const tools = [
        {
            icon: <FileText />,
            title: 'Merge PDF',
            description: 'Combine multiple PDFs into one document',
            href: '/merge-pdf',
        },
        {
            icon: <Scissors />,
            title: 'Split PDF',
            description: 'Extract pages from your PDF files',
            href: '/split-pdf',
        },
        {
            icon: <Minimize2 />,
            title: 'Compress PDF',
            description: 'Reduce file size while maintaining quality',
            href: '/compress-pdf',
        },
        {
            icon: <Image />,
            title: 'PDF to JPG',
            description: 'Convert PDF pages to images',
            href: '/pdf-to-jpg',
        },
        {
            icon: <FileImage />,
            title: 'JPG to PDF',
            description: 'Convert images to PDF documents',
            href: '/jpg-to-pdf',
        },
        {
            icon: <Download />,
            title: 'PDF to Word',
            description: 'Convert PDF to editable Word documents',
            href: '/pdf-to-word',
        },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title animate-fade-in-up">
                        Every <span className="text-gradient">PDF tool</span> you need in one place
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up stagger-1">
                        Fast, secure, and completely free. Merge, split, compress, convert, and edit PDFs with ease.
                    </p>
                    <div className="hero-cta animate-fade-in-up stagger-2">
                        <Button size="lg">Get Started</Button>
                        <Button variant="outline" size="lg">View All Tools</Button>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="tools-section">
                <div className="container">
                    <h2 className="section-title">Popular PDF Tools</h2>
                    <div className="tools-grid">
                        {tools.map((tool, index) => (
                            <ToolCard
                                key={index}
                                icon={tool.icon}
                                title={tool.title}
                                description={tool.description}
                                href={tool.href}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card animate-fade-in">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Lightning Fast</h3>
                            <p className="feature-description">
                                Process your PDFs in seconds with our optimized tools
                            </p>
                        </div>
                        <div className="feature-card animate-fade-in stagger-1">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">100% Secure</h3>
                            <p className="feature-description">
                                Your files are encrypted and automatically deleted after processing
                            </p>
                        </div>
                        <div className="feature-card animate-fade-in stagger-2">
                            <div className="feature-icon">💎</div>
                            <h3 className="feature-title">Always Free</h3>
                            <p className="feature-description">
                                All essential PDF tools are completely free with no limits
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
