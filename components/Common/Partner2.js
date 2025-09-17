import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";

const Partner2 = () => {
	return (


		 	
		

		<div className="partner-area ptb-70">
			<div className="container">

			<div className="section-title" style={{"max-width": "1200px"}}>
					<h2 style={{"max-width": "1200px"}}>Clients our Consultants have Served</h2>
					
				</div>

			<div style={{
				display: 'flex',
                    alignItems: 'center'
                    
			}}
				>
 			




				<Swiper
					slidesPerView={1}
					spaceBetween={5}
					breakpoints={{
						0: {
							slidesPerView: 2,
						},
						567: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 4,
						},
						992: {
							slidesPerView: 6,
						},
					}}
					navigation={true}
       				modules={[Keyboard, Pagination, Navigation]}
       				className="partner-slides"
				>
					
					<SwiperSlide style={{"margin-left":"45px"}}>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust1.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust2.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust3.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust4.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust5.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust6.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust7.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust8.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust9.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust10.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust11.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<img
									style={{"width":"100px"}}
										src="/images/partner/cust12.png"
										alt="image"
									/>
								</div>
							</SwiperSlide>
				</Swiper>
			</div>
			</div>
		</div>
	);
};

export default Partner2;
