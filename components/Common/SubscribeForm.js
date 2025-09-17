import React from 'react'; 

const SubscribeForm = () => {
    return (
        <div className="subscribe-area bg-f9f9f9 ptb-100">
            <div className="container">
                <div className="subscribe-content">
                    <span className="sub-title">Go At Your Own Pace</span>
                    <h2>Subscribe To Our Newsletter</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    <form className="newsletter-form">
                        <input type="text" className="input-newsletter" placeholder="Enter your email address" name="EMAIL" required />

                        <button type="submit" className="default-btn">
                            <i className="flaticon-user"></i> Subscribe Now <span></span>
                        </button>
                    </form>
                </div>
            </div>

           </div>
    )
}

export default SubscribeForm;