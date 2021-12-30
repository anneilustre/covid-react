import { Link } from "react-router-dom";

const CountriesList = ({ category, topTen }) => {
  return (
    <ol className="countries-list">
      {topTen.map((item) => (
        <li key={item.ID}>
          <div>
            <Link to={item.Slug}>{item.Country}</Link >
            <span>{String(item[category]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </li>
      ))
      }
    </ol >
  );
};

export default CountriesList;
