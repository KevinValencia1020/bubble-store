import React from "react";
import Carrusel from "../components/Carrusel";
import FeaturedTechnology from "../components/Featured";
import "../assets/styles/pages/homePage.css";


const HomePage = () => {

  return(
    <>
      <div className="home-main">
        <Carrusel/>

        <div className="home-banner__container">
          <img src="/images/banner/Banner Envio Gratis.png" alt="" className="home-banner__img" />
        </div>

        <FeaturedTechnology/>

        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo maiores ex, deleniti odit ratione qui rerum in doloremque quidem dignissimos mollitia rem distinctio sit quibusdam placeat nobis possimus exercitationem soluta?

      </div>


    </>
  );

}

export default HomePage;