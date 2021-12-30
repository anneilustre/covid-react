import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchLatestlatestSummaryOfCountries } from "../App";
import MainTitle from "./MainTitle";


const CountryProfile = () => {
  let { countryId } = useParams();

  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const getCountryInfo = async () => {
      const latestSummary = await fetchLatestlatestSummaryOfCountries();
      const latestSummaryOfCountries = latestSummary.countries;
      const [countryData] = await latestSummaryOfCountries.filter(item => item["Slug"] === countryId);
      const convertedCountryData = await convertStats(countryData);
      setStatistics(convertedCountryData);
    };
    getCountryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const newCountryData = statistics.map((obj, index) => {
  //   let rObj = {};
  //   rObj[obj[index]] = String(obj[index]).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return rObj;
  // });

  const convertStats = (data) => {
    let newStats = {};
    for (const property in data) {
      newStats[property] = String(data[property]).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return newStats;
  };

  console.log('statistics', statistics);
  const { Country, NewConfirmed, NewDeaths, TotalConfirmed, TotalDeaths } = statistics;
  // console.log('newCountryData', newCountryData);
  console.log(statistics.Country);
  return (
    <div className="main-container">
      {

        statistics.Country !== undefined
          ?
          <>
            <MainTitle title={Country} />
            <ul>
              <li>New Confirmed: {NewConfirmed}</li>
              <li>New Deaths: {NewDeaths}</li>
              <li>Total Confirmed: {TotalConfirmed}</li>
              <li>Total Deaths: {TotalDeaths}</li>
            </ul>
          </>
          :
          <p>Please wait...</p>
      }
      <div className="back"><Link to="/">Go Back</Link></div>
    </div>
  );
};

export default CountryProfile;
