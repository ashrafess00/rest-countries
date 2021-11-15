import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CountryInfo = ({ match }) => {
  const [info, setInfo] = useState([]);
  let capital = match.params.id;

  const getCountries = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v2/capital/${capital}`
      );
      const data = await response.json();
      setInfo(data);
    } catch (err) {}
  };

  useEffect(() => {
    getCountries();
    window.scrollTo(0, 0);
  }, [capital]);

  return (
    <div className="infoCon">
      <Link to="/" className="back">
        Back
      </Link>

      {info.map((e) => {
        return (
          <Container
            keys={Date.now()}
            img={e.flags.png}
            name={e.name.common}
            nativeName={e.nativeName}
            population={e.population.toLocaleString()}
            region={e.region}
            subRegion={e.subregion}
            capital={e.capital}
            tld={e.tld}
            currencies={e.currencies[Object.keys(e.currencies)[0]].name}
            lang={e.languages.map((e) => e.name).join(" ,")}
            borders={e.borders}
          />
        );
      })}
    </div>
  );
};

const Container = (props) => {
  return (
    <div className="infosff">
      <img src={props.img} alt="" />
      <div>
        <h2>{props.name}</h2>
        <article>
          <div className="infoo1">
            <p>
              <span>Native Name: </span>
              {props.nativeName}
            </p>
            <p>
              <span>Population: </span>
              {props.population}
            </p>
            <p>
              <span>Region: </span>
              {props.region}
            </p>
            <p>
              <span>sub Region: </span>
              {props.subRegion}
            </p>
            <p className="capital">
              <span>Capital: </span>
              {props.capital}
            </p>
          </div>

          <div className="infoo2">
            <p>
              <span>Top Level Domain: </span>
              {props.tld}
            </p>
            <p>
              <span>Currencies: </span>
              {props.currencies}
            </p>
            <p>
              <span>Languages: </span>
              {props.lang}
            </p>
          </div>
        </article>
        <p className="bor">
          <span>Border Countries :</span>
        </p>
        <div className="borContainers">
          {props.borders.length !== 0 ? (
            <Borders borders={props.borders} />
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

const Borders = (props) => {
  const [borders, setBorders] = useState([{ name: "" }]);

  const test = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v2/alpha?codes=${props.borders.join(",")}`
      );
      const data = await response.json();
      setBorders(data);
    } catch (err) {
      console.log("hi");
    }
  };

  useEffect(() => {
    test();
  }, [props.borders]);

  return (
    <>
      {borders.map((b) => {
        return (
          <Link to={b.capital} className="border">
            {b.name}
          </Link>
        );
      })}
    </>
  );
};

Container.defaultProps = {
  borders: [],
};
Borders.defaultProps = {
  borders: [],
};

export default CountryInfo;
