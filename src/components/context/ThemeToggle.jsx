import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === "dark");

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <div
      className={`absolute right-0 top-7 inline-block w-9 h-5 switcher ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleToggle}
              name="toggleSwitch"
              color="primary"
            />
          }
          label=""
          labelPlacement="start"
          sx={{
            position: "absolute",
            right: "70px",
            top: "0px",
          }}
        />
      </FormGroup>
    </div>
  );
};

export default ThemeToggle;
