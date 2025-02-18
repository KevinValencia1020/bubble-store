import React from "react";
import Carrusel from "../components/Carrusel";
import "../assets/styles/pages/homePage.css";


const HomePage = () => {

  return(
    <>
      <div className="home-main">
        <Carrusel/>

        <div className="home-banner__container">
          <img src="/images/banner/Banner Envio Gratis.png" alt="" className="home-banner__img" />
        </div>

        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio vero accusamus sunt adipisci, dolor quam aliquam! Nam ipsam corporis et dignissimos error corrupti a illo itaque sed. Nesciunt, deserunt debitis?
        </p>

      </div>


    </>
  );

}

export default HomePage;