import { bannerGrid } from "@/constants/bannerGrid";
import "../styles/bannerGrid.css";

const BannerGrid = () => {

  //Asigno la grid class dinamicamente al contenedor de la imagen
  const assignGridClass = (index) => {
    return index % 4 === 0 || index % 5 === 4 ? "big" : "small";
  }
  return(
    <>
      <div className="banner-grid">
        {bannerGrid.map((banner, i) => (
          <picture className={`banner-grid__picture ${assignGridClass(i)}`} key={i}>

            <img src={banner.image} alt="" className={`banner-grid__img`} />
          </picture>
        ))}
      </div>
    </>
  );
}

export default BannerGrid;