import Link from "next/link";
import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

function RelatedCourse({ relatedCourse }) {
  return (
    <div className="swiper-container-half">
      <h3 style={{ marginLeft: 5 }}>Related Courses</h3>

      <Swiper
        autoplay={{delay:5000}}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {relatedCourse.map((crs, index) => (
          <SwiperSlide key={index}>
            <div className="card-rel">
              <Link href={crs.previewurl}>
                <a className="related-course-container">
                  <img
                    src={crs.image}
                    alt={crs.name}
                    style={{
                      width: "100%",
                      height: "90%",
                      borderRadius: "1px",
                    }}
                  />
                  <div className="profiletabl ">
                    <p>
                      <h5 style={{ color: "white", padding: 5 }}>{crs.name}</h5>
                      <h6 style={{ color: "white", fontSize: 15, padding: 5 }}>
                        <i class="flaticon-agenda"></i>
                        {crs.duration}
                      </h6>
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}

export default RelatedCourse;
