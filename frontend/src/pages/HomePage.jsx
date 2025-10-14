import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div className="home-page">
            <div className="page-header text-center">
                <h1>Welcome to the CSIS-279 Management App</h1>
            </div>

            <div className="text-center my-4">
                <img
                    src="/homePage.png" 
                    alt="Project banner"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
                />
            </div>

            <div className="intro-section mt-5">
                <h2>About This Project</h2>
                <p>
                    The system is designed to manage two main entities:
                </p>
                <ul>
                    <li><strong>Books:</strong> Create, edit, search, and view book details.</li>
                    <li><strong>Customers:</strong> Manage customer information and interactions.</li>
                </ul>
                <p>
                    Each module showcases concepts like component composition, props,
                    event handling, and controlled forms — all implemented purely on the frontend.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
