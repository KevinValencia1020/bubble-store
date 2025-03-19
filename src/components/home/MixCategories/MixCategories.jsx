import mixCategories from "@/constants/mixCateg";
// import "../styles/mixCategories.css";
const MixCategories = () => {
  return (
    <div className="home-categ">
      <ul className="mix-categ">
        {mixCategories.map((item, index) => (
          <li key={index} className="mix-categ__container">
            <img src={item.img} alt="" className="mix-categ__img" />
            <p className="mix-categ__name">
              {item.name}
            </p>
            <box-icon name = "chevron-right" className="mix-categ__icon"></box-icon>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MixCategories;