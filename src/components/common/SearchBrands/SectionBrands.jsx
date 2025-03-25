import brands from "@/constants/brands";
import styleBrands from "./searchBrands.module.css";

const SectionBrands = () => {
  return(
    <>
      <section className="section-brands mt-4">
        <div className="section-brands__container w-[90%] my-3 mx-auto">

          <h3 className="section-brands__title text-lg font-semibold mb-4">Lleva a casa las mejores marcas!</h3>

            <ul className={styleBrands.sectionBrandsUl}>

              {brands.map((item, i) => (

                <li key={i} className="section-brands__li">

                  <a href="#" className="section-brands__link block w-20 h-20 overflow-hidden border rounded-lg">

                    <img src={item.image} alt="" className="section-brands__img block w-full h-full object-fill" />
                  </a>
                </li>

              ))}

            </ul>
        </div>
      </section>
    </>
  );
}

export default SectionBrands;