// Importa los componentes de swiper react
import { Swiper, SwiperSlide } from "swiper/react";

// Importa los modulos requeridos del swiper
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importa los estilos del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carrusel = () => {

  return(
    <>
      <Swiper>
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      </Swiper>
    </>
  );

}

export default Carrusel;