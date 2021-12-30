import TitleRow from "./TitleRow";
import CountriesList from "./CountriesList";

const TopTen = ({ title, category, topTen }) => {
  return (
    <>
      <TitleRow title={title} />
      <CountriesList category={category} topTen={topTen} />
    </>
  );
};

export default TopTen;
