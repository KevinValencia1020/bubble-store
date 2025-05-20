import { bannerGrid } from "@/constants/bannerGrid";

const BannerGrid = () => {

  //Asigno la grid class dinamicamente al contenedor de la imagen
  const assignGridClass = (index) => {
    return index % 4 === 0 || index % 5 === 4 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  }

  return(
    <>
      <div className="banner-grid w-[90%] max-h-max my-3 mx-auto grid grid-flow-dense grid-cols-3 gap-1 overflow-x-auto scroll-smooth">

        {bannerGrid.map((banner, i) => (

          <picture className={`banner-grid__picture w-full h-full rounded-xl object-fill overflow-hidden ${assignGridClass(i)}`} key={i}>

            <img src={banner.image} alt="" className="banner-grid__img block w-full h-full" />

          </picture>

        ))}
      </div>
    </>
  );
}

export default BannerGrid;