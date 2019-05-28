import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import useStyles from "./style";

export default function SearchBox({ SetAppState }) {
  const classes = useStyles();

  function handleChange(event) {
    SetAppState({ search: event.target.value });
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={handleChange}
      />
    </div>
  );
}
