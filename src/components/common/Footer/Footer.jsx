import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import styleGlobal from "../../../styles/global.module.css";
import styleFooter from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <div className="footer bg-black text-white py-4 w-full h-60 my-5">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="footer__swiper px4"
        >

          <SwiperSlide className="footer__swiperSlide w-auto">

            <div
              className={`footer__swiperSlideContent text-center ${styleGlobal.containerContent}`}
            >

              <h3 className="footer__title my-3">
                Sobre Nosotros
              </h3>

              <p className="footer__description text-gray-400">
                Somos una empresa dedicada a la creación de productos
                innovadores y de alta calidad.
              </p>

            </div>
          </SwiperSlide>

          <SwiperSlide className="footer__swiperSlide w-auto">

            <div
              className={`footer__swiperSlideContent text-center ${styleGlobal.containerContent}`}
            >

              <h3 className="footer__title my-3">
                Email
              </h3>

              <p className="footer__description text-gray-400">
                bubbleStore@example.com
              </p>

            </div>
          </SwiperSlide>

          <SwiperSlide className="footer__swiperSlide w-auto">

            <div
              className={`footer__swiperSlideContent text-center ${styleGlobal.containerContent}`}
            >

              <h3 className="footer__title my-3">
                Venta Telefónica
              </h3>

              <p className={`footer__description ${styleFooter.footerDescription}`}>
                Servicio al cliente: 
              </p>
              
            </div>
          </SwiperSlide>
        </Swiper>

        
      </div>
    </>
  );
};

export default Footer;
