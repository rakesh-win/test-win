import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";

const FeedbackSlider = () => {
	return (
		<div className="feedback-area ptb-100" style={{paddingTop:"20px", paddingBottom:"20px"}}>
			<div className="container">
				<Swiper 
				navigation={true}
				modules={[Keyboard, Pagination, Navigation]}
				className="feedback-slides-two owl-carousel owl-theme"
				>

				









					<SwiperSlide>
						<div className="single-feedback-box">
							<p>
								One of the best Training Institutes in India and Globally. Proficient teaching staff and sales coordination team. I have been using their services for 3 years -- by far the best!
							</p>
							<div className="client-info d-flex align-items-center">
								
								<div className="title" style={{"margin": "0px"}}>
									<h3>Ameet Balakrishnan</h3>
									
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="single-feedback-box">
							<p>
								They have really good programs, followed by great teaching faculty. The knowledge they carry is immensely great and the overall staff is very supportive.
			 				</p>
							<div className="client-info d-flex align-items-center">
								
								<div className="title" style={{"margin": "0px"}}>
									<h3>Aditya Kurup</h3>
									
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="single-feedback-box">
							<p>
								Very nice experience in fulfilling the IT Certifications. Nice Customer Support, Sales Support, Knowledgable Tutoring & Professional environment of Learning and achievement. Thanks for your support!

							</p>
							<div className="client-info d-flex align-items-center">
								
								<div className="title" style={{"margin": "0px"}}>
									<h3>Vrajesh Pathak</h3>
									
								</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>

			<div className="divider2" style={{backgroundColor:"#fff"}}></div>
			<div className="divider3" style={{backgroundColor:"#fff"}}></div>
			
		</div>
	);
};

export default FeedbackSlider;
