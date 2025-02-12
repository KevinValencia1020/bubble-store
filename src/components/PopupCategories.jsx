import React, { useState, useRef } from "react";
import menuData from "./constants/menuData";
import "./css/PopupCategories.css";

const PopupCategories = (isCategoriesActive, closeCategories) => {
  return (
    <>
      <div
        className={`popup-categories ${
          isCategoriesActive ? "categories-open" : "categories-close"
        }`}
      >
        <button className="popup-categories__btn"
          onClick={(e) =>{
            e.stopPropagation();
            closeCategories();
          }}
        >
          <box-icon name="x-circle"></box-icon>
        </button>
        <h4 className="popup-title">Categorías</h4>

        <div className="popup-categories__container">
          <ul className="popup-categories__ul">
            {menuData.map((item, index) => (
              <li key={index} className="popup-categories__li">
                <a href={item.url} className="popup-categories__link">
                  <span className="popup-categories__icon material-symbols-outlined">
                    {item.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PopupCategories;
