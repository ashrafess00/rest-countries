import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [fil, setFil] = useState("all");
  const [search, setSearch] = useState("");
  const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const dataa = await response.json();
    setData(dataa);
    console.log(dataa);
  };
  useEffect(() => {
    getCountries();
  }, []);

  function fo(e) {
    setFil(e.value);
  }
  const searchC = (e) => {
    setSearch(e.value.toLowerCase());
  };

  return (
    <React.Fragment>
      <section>
        <div className="searchNdFilter">
          <input
            type="search"
            placeholder="Search for a country"
            onChange={(e) => searchC(e.target)}
          />
          <select name="filter" onChange={(e) => fo(e.target)}>
            <option value="all">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="countries">
          {data
            .filter((e) => {
              return fil !== "all" ? e.region === fil : e;
            })
            .filter((j) => {
              return j.name.common.toLowerCase().startsWith(search);
            })
            .map((h) => {
              return (
                <Link to={`${h.name.common}`} className="countryContainer">
                  <Countries
                    key={Math.floor(Math.random() * Date.now())}
                    img={h.flags.png}
                    name={h.name.common}
                    population={h.population.toLocaleString()}
                    region={h.region}
                    capital={h.capital}
                  />
                </Link>
              );
            })}
        </div>
      </section>
    </React.Fragment>
  );
};

const Countries = (props) => {
  return (
    <div className="">
      <img src={props.img} alt="" />
      <div className="info">
        <h2>{props.name}</h2>
        <p>
          <span>Population: </span>
          {props.population}
        </p>
        <p>
          <span>Region: </span>
          {props.region}
        </p>
        <p>
          <span>Capital: </span>
          {props.capital}
        </p>
      </div>
    </div>
  );
};

export default Home;