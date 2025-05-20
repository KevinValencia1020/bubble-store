"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useRef, useState } from "react";
import styleGlobal from "../../../styles/global.module.css";
import styleFooter from "./footer.module.css";
import AccordionCustomized from "../Accordeon/Accordeon";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },

});
const Footer = () => {

  // Ref para el contenedor de footer
  const footerRef = useRef(null);

  // Estado para controlar si el acordeon esta expandido
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (isExpanded) => {

    setExpanded(isExpanded);
    
  };

  return (
    <>

      <div 
      ref={footerRef}
      className="footer relative bg-slate-800 text-white py-4 pb-40 w-full h-auto my-5 mt-28"
      >

        <div className="wave-footer absolute -top-20 left-0 w-full h-20 bg-cover bg-center" style={
          { backgroundImage: "url('/images/waves/wave-footer.svg')" }
          } >

        </div>

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

        <div className="footer-accordion h-auto my-5 transition-all duration-300 ease-in-out">

          <ThemeProvider theme={darkTheme}>

            <AccordionCustomized onExpandedChange={handleAccordionChange}/>

          </ThemeProvider>

        </div>

        <div className="w-full border border-white mt-1"></div>

        <div className="footer-social">

          <div className={`footer-social__container ${styleGlobal.containerContent}`}>

            <p className="footer-social__tittle mt-4">Siguenos: </p>

            <ul className="footer-social__icons flex flex-row items-center justify-evenly mt-5">

              <li className="footer-social__icon">
                <FacebookIcon fontSize="large" color="white" />
              </li>

              <li className="footer-social__icon">
                <InstagramIcon fontSize="large" color="white"/>
              </li>

              <li className="footer-social__icon">
                <XIcon fontSize="large" color="white"/>
              </li>

            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Footer;
