import React from 'react';
import Link from 'next/link';

const PremiumAccess = () => {

    return (
        <div className="premium-access-area bg-f9f9f9 ptb-100">
            <div className="container">
                <div className="premium-access-content">
                    <span className="sub-title">6 Benefits. 1 Membership.</span>
                    <h2>Supercharge your Career. Be a member of win Career Club</h2>
                    <p style={{"text-align":"center"}}>Focusing only on upskilling is not enough to boost your career growth. Gift yourself the power of 6 career-transforming benefits through one power-packed membership.</p>
                    
                    <Link href="/winclub">
                        <a className="default-btn">
                           Know more<span></span>
                        </a>
                    </Link>
                </div>
            </div>

            
        </div>
    )
}

export default PremiumAccess;