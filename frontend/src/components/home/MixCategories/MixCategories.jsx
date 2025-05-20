import mixCategories from "@/constants/mixCateg";
import styleGlobal from "../../../styles/global.module.css";

const MixCategories = () => {
  return (
    <div className={`home-categ ${styleGlobal.containerContent}`}>

      <ul className="mix-categ grid grid-cols-2 gap-3 my-4">

        {mixCategories.map((item, index) => (

          <li key={index} className="mix-categ__container flex items-center justify-between gap-3 rounded-md border px-1">

            <img src={item.img} alt="" className="mix-categ__img block max-w-7 max-h-7 object-fill" />

            <p className="mix-categ__name text-xs">
              {item.name}
            </p>

            <box-icon name = "chevron-right" className="mix-categ__icon block max-w-6 max-h-6"></box-icon>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MixCategories;