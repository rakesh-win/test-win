import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import Image from 'next/image';

const Partner = () => {
	return (


		 	
		 

		<div className="partner-area ptb-70">
			<div className="container">

			<div className="section-title">
					<h2>Our Alumni Work at Major Brands and High-profile Startups</h2>
					
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
									<Image
		                              src="/images/partner/cust1.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={60}
		                            />


								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust2.png"
		                              alt="win-upskill-partner-logo"
		                             width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust3.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={50}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust4.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust5.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust6.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust7.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust8.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust9.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust10.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust11.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="single-partner-item">
									<Image
		                              src="/images/partner/cust12.png"
		                              alt="win-upskill-partner-logo"
		                              width={150}
		                              height={70}
		                            />
								</div>
							</SwiperSlide>
				</Swiper>
			</div>
			</div>
		</div>
	);
};

export default Partner;
