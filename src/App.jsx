/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { render } from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import db from "db";

import TopBar from "./Components/TopBar";
import LeftDrawer from "./Components/LeftDrawer";
import useStyles from "./Components/TopBar/style";

// db.category.bulkAdd([{ name: "school" }, { name: "home" }]);

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
    </div>
  );
}

export default class App extends Component {
  state = {
    category: [],
    main: [],
    archived: [],
    trash: [],
    drawerOpenMobile: false
  };

  componentDidMount() {
    this.SyncAppStateWithDb("all");
  }

  SetAppState = newState => {
    this.setState(newState);
  };

  SyncAppStateWithDb = (...tableNames) => {
    const syncTable = tableName => {
      db[tableName].toArray().then(arr => this.setState({ [tableName]: arr }));
    };

    if (tableNames[0] === "all")
      tableNames = ["category", "main", "archived", "trash"];

    tableNames.forEach(syncTable);
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

// import { HashRouter, Route } from "react-router-dom";

// class App extends Component {
//   render() {
//     return (
//       // <HashRouter>
//       //   <Fragment>
//       //     <Route path="/signin" component={Signin} />
//       //     <Route path="/signup" component={Signup} />
//       //     <Route path="/" component={NoteViewer} />
//       //   </Fragment>
//       // </HashRouter>
//       <h1>DEXieeeeee</h1>
//     );
//   }
// }
