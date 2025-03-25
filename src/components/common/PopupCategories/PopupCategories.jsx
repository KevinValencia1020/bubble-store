import React from "react";
import menuData from "../../../constants/menuData";
import styleGlobal from "../../../styles/global.module.css";
// import "../styles/popupCategories.css";

const PopupCategories = ({isCategoriesActive, closeCategories}) => {
  return (
    <>
      <div
        className={`popup-categories bg-color-secundario w-full h-screen my-0 mx-auto fixed bottom-0 left-0  z-40 transform transition-all duration-300 ease-in-out ${
          isCategoriesActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <button className="popup-categories__btn text-xl absolute top-5 left-3"
          onClick={(e) =>{
            e.stopPropagation();
            closeCategories();
          }}
        >
          <box-icon name="x-circle"></box-icon>
        </button>
        <h4 className="popup-categories__title mt-4 text-center font-bold text-xl">Categorías</h4>

        <div className="popup-categories__container">
          <ul className="popup-categories__ul w-[90%] my-6 mx-auto border-t-4 border-color-primario pt-3 grid grid-cols-2 grid-rows-2 text-center gap-2">

            {menuData.map((item, index) => (

              <li key={index} className="popup-categories__li mt-5">

                <button className="popup-categories__cta">

                  <span className="popup-categories__icon     material-symbols-outlined text-color-primario text-4xl">
                      {item.icon}
                  </span>

                  <p className="popup-categories__name font-semibold">
                    {item.label}
                  </p>

                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PopupCategories;
