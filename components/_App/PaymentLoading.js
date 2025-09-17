import React from 'react';

const Paymentloading = () => {
    return (
        <>
            <div className="preloader">
                <div className="loader">
                    <div className="loadingio-spinner-reload">
                        <div className="ldio">
                            <div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                    <p className="loading-message">Processing your payment...<br />Please do not refresh or close this page.</p>
                </div>
            </div>

            <style jsx>{`
                .preloader {
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 999999999999;
                    position: fixed;
                    background-color: rgba(255, 255, 255, 0.85);
                }

                .preloader .loader {
                    top: 50%;
                    left: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
                    text-align: center;
                }

                .preloader .ldio > div {
                    animation: ldio 1s infinite linear;
                    transform-origin: 50px 50px;
                }

                .preloader .ldio > div div {
                    position: absolute;
                }

                .preloader .ldio > div div:nth-child(1),
                .preloader .ldio > div div:nth-child(2) {
                    width: 75px;
                    height: 75px;
                    border: 5px solid;
                    border-radius: 50%;
                    border-color: transparent #fe4a55 #fe4a55 #fe4a55;
                    box-sizing: border-box;
                    position: absolute;
                    transform: rotate(45deg);
                    transform-origin: 50px 50px;
                }

                .preloader .ldio > div div:nth-child(1) {
                    transform: rotate(45deg) translate(12.5px, 12.5px);
                }

                .preloader .ldio > div div:nth-child(2) {
                    transform: rotate(0deg) translate(12.5px, 12.5px);
                }

                .preloader .ldio > div div:nth-child(3) {
                    width: 0;
                    height: 0;
                    border: 12px solid;
                    border-color: transparent transparent transparent #fe4a55;
                    transform: translate(50px, 6.5px);
                }

                .preloader .loadingio-spinner-reload {
                    width: 100px;
                    height: 100px;
                    overflow: hidden;
                    display: inline-block;
                }

                .preloader .ldio {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform: translateZ(0) scale(1);
                    backface-visibility: hidden;
                    transform-origin: 0 0;
                }

                @keyframes ldio {
                    0% { transform: rotate(0); }
                    100% { transform: rotate(360deg); }
                }

                .loading-message {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #444;
                    max-width: 300px;
                    line-height: 1.5;
                }
            `}</style>
        </>
    );
};

export default Paymentloading;
