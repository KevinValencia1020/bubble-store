import brands from "@/constants/brands";
// import "../styles/sectionBrands.css";
const SectionBrands = () => {
  return(
    <>
      <section className="section-brands">
        <div className="section-brands__container">
          <h3 className="section-brands__title">Lleva a casa las mejores marcas!</h3>

            <ul className="section-brands__ul">
              {brands.map((item, i) => (
                <li key={i}     className="section-brands__li">
                  <a href="#" className="section-brands__link">
                    <img src={item.image} alt="" className="section-brands__img" />
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