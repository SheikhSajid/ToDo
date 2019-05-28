/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { render } from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import db from "db";

import TopBar from "./Components/TopBar";
import LeftDrawer from "./Components/LeftDrawer";
import useStyles from "./Components/TopBar/style";
import Main from "./Components/Main";

export function Container({ AppState, SetAppState, SyncAppStateWithDb }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar
        AppState={AppState}
        SetAppState={SetAppState}
        SyncAppStateWithDb={SyncAppStateWithDb}
      />
      <LeftDrawer
        AppState={AppState}
        SetAppState={SetAppState}
        SyncAppStateWithDb={SyncAppStateWithDb}
      />
      <Main
        AppState={AppState}
        SetAppState={SetAppState}
        SyncAppStateWithDb={SyncAppStateWithDb}
      />
    </div>
  );
}

export default class App extends Component {
  state = {
    category: [],
    main: [],
    archived: [],
    trash: [],
    search: "",
    drawerOpenMobile: false,
    selectedCategory: "all"
  };

  componentDidMount() {
    this.SyncAppStateWithDb("all").then(() => {
      const { category } = this.state;

      // prepopulate the category db with some default categories
      if (category.length === 0)
        db.category.bulkAdd([
          { name: "work" },
          { name: "health" },
          { name: "entertainment" }
        ]);
    });
  }

  SetAppState = newState => {
    this.setState(newState);
  };

  SyncAppStateWithDb = (...tableNames) => {
    const syncTable = tableName =>
      db[tableName].toArray().then(arr => this.setState({ [tableName]: arr }));

    if (tableNames[0] === "all")
      tableNames = ["category", "main", "archived", "trash"];

    const promises = [];

    tableNames.forEach(tableName => promises.push(syncTable(tableName)));
    return Promise.all(promises);
  };

  render() {
    return (
      <Container
        AppState={this.state}
        SetAppState={this.SetAppState}
        SyncAppStateWithDb={this.SyncAppStateWithDb}
      />
    );
  }
}

render(<App />, document.getElementById("app"));
