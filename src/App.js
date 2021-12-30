import { useState, useEffect } from "react";
import MainTitle from "./components/MainTitle";
import TopTen from "./components/TopTen";

const fetchSummary = async () => {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  return data;
};

export const fetchLatestlatestSummaryOfCountries = async () => {
  const summary = await fetchSummary();
  const latestSummary = {
    countries: summary["Countries"],
    date: summary["Date"]
  };
  return latestSummary;
};

const App = () => {
  const CATEGORIES = {
    totalConfirmed: { title: "Total Confirmed Cases", keyName: "TotalConfirmed" },
    totalDeaths: { title: "Total Deaths", keyName: "TotalDeaths" }
  };

  const [topTenByTotalConfirmed, setTopTenByTotalConfirmed] = useState([]);
  const [topTenByTotalDeaths, setTopTenByTotalDeaths] = useState([]);
  const [updateTime, setUpdateTime] = useState({});

  useEffect(() => {
    const getTopTenInfo = async () => {
      const latestSummary = await fetchLatestlatestSummaryOfCountries();
      const latestSummaryDate = latestSummary.date;
      const latestSummaryOfCountries = latestSummary.countries;
      setUpdateTime(latestSummaryDate);

      const topTenByTotalConfirmed = getTopTenCountries(latestSummaryOfCountries, 'TotalConfirmed', 10);
      const topTenByTotalDeaths = getTopTenCountries(latestSummaryOfCountries, 'TotalDeaths', 10);

      setTopTenByTotalConfirmed(topTenByTotalConfirmed);
      setTopTenByTotalDeaths(topTenByTotalDeaths);
    };
    getTopTenInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopTenCountries = (data, sortType, num = 10) => {
    let newSortData = [];
    if (num > Object.keys(data).length) return false;
    let newSort = Object.keys(data).sort((a, b) => data[b][sortType] - data[a][sortType]);
    console.log('newSort', newSort);

    newSort.forEach((item, index) => {
      if (index < num) {
        newSortData[index] = data[item];
      }
    });
    console.log('newSortData', newSortData);
    return newSortData;
  };

  return (
    <div className="main-container">
      <MainTitle title={'Covid-19 Top Ten Countries'} />
      {
        topTenByTotalConfirmed.length > 0 && topTenByTotalDeaths.length > 0
          ?
          <div>
            <p className="update-time">As of {updateTime}</p>
            <TopTen key={'totalConfirmed'} title={CATEGORIES.totalConfirmed.title} category={CATEGORIES.totalConfirmed.keyName} topTen={topTenByTotalConfirmed} />
            <TopTen key={'totalDeaths'} title={CATEGORIES.totalDeaths.title} category={CATEGORIES.totalDeaths.keyName} topTen={topTenByTotalDeaths} />
          </div>
          :
          <p>Please wait...</p>
      }
    </div>
  );
};

export default App;
