import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const NavBar = () => {
  const colours = {
    darkBlue: "hsl(209, 23%, 22%)",
    veryDarkBlue: "hsl(207, 26%, 17%)",
    white: "hsl(0, 0%, 100%)",
    VeryLightGray: "hsl(0, 0%, 98%)",
  };

  const [colorChanged, setColourChnaged] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode && JSON.parse(savedMode);
  });

  //
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(colorChanged));
    return () => {};
  }, [colorChanged]);

  let root = document.querySelector(":root");
  if (colorChanged) {
    root.style.setProperty("--Very-Dark-Blue", colours.white);
    root.style.setProperty("--White", colours.darkBlue);
    root.style.setProperty("--Very-Light-Gray", colours.veryDarkBlue);
  } else {
    root.style.setProperty("--Very-Dark-Blue", colours.veryDarkBlue);
    root.style.setProperty("--White", colours.white);
    root.style.setProperty("--Very-Light-Gray", colours.VeryLightGray);
  }

  return (
    <header>
      <h1>Where in the world?</h1>
      <div
        className="changeTheme"
        onClick={() => setColourChnaged(!colorChanged)}
      >
        <FontAwesomeIcon
          icon={colorChanged ? faSun : faMoon}
          className="moonIcon"
        />
        <p>Change Mode</p>
      </div>
    </header>
  );
};

export default NavBar;
