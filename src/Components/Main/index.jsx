import React from "react";
import Tabs from "./Tabs";
import useStyles from "../TopBar/style";

export default function index({ AppState, SetAppState, SyncAppStateWithDb }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Tabs
        AppState={AppState}
        SetAppState={SetAppState}
        SyncAppStateWithDb={SyncAppStateWithDb}
      />
    </main>
  );
}
