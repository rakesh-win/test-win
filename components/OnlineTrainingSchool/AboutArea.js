import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
import Image from 'next/image';
const AboutArea = () => {
	const [display, setDisplay] = React.useState(false);

	React.useEffect(() => {
		setDisplay(true);
	}, []);
	
	// Popup Video
	const [isOpen, setIsOpen] = React.useState(true);
	const openModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<React.Fragment>
			<div className="about-area-two pb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5 col-md-12">
							<div className="about-content-box">
								<h2>
									Build your IT management skills online, anytime
								</h2>
								<p>
									Learn from anywhere, at any time of your choice. Our courses are live, online, and flexible to suit your busy schedule.
								</p>

								<p>
									<strong>
										Register and enjoy the power of hybrid learning + career assistance services, and win!
									</strong>
								</p>

								
							</div>
						</div>

						<div className="col-lg-7 col-md-12">
							<div className="about-video-box">
								<div className="image">
									
									<Image
                                                          src="/images/bloom.png"
                                                          alt="bloom-video-cover-win-upskill"
                                                          width={900}
                                                          height={533}
                                        />
								</div>

								<Link href="#play-video">
									<a
										onClick={(e) => {
											e.preventDefault();
											openModal();
										}}
										className="video-btn popup-youtube"
									>
										<i className="flaticon-play"></i>
									</a>
								</Link>

								<div className="shape10">
									<Image
                                                          src="/images/shape9.png"
                                                          alt="texture-imgage-win-upskill"
                                                          width={150}
                                                          height={400}
                                        />
								</div>
							</div>
						</div>
					</div>
				</div>

				
			</div>

			{/* If you want to change the video need to update videoID */}
			{display ? (
				<ModalVideo
					channel="youtube"
					isOpen={!isOpen}
					videoId="n-PNz7R9J-8"
					onClose={() => setIsOpen(!isOpen)}
				/>
			) : (
				""
			)}
		</React.Fragment>
	);
};

export default AboutArea;
