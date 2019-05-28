import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import List from "./List";

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    boxShadow: "0 0 grey",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  }
}));

function SimpleTabs({ AppState, SetAppState }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const categoriesToRender =
    AppState.selectedCategory === "all"
      ? AppState.category
      : [{ name: AppState.selectedCategory }];

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="All" />
          <Tab label="Today" />
          <Tab label="This Week" />
          <Tab label="This Month" />
        </Tabs>
      </Paper>
      {value === 0 && (
        <TabContainer>
          {categoriesToRender.map(({ name }) => (
            <List
              key={name}
              category={name}
              AppState={AppState}
              SetAppState={SetAppState}
              timerange="all"
            />
          ))}
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          {categoriesToRender.map(({ name }) => (
            <List
              key={name}
              category={name}
              AppState={AppState}
              SetAppState={SetAppState}
              timerange="today"
            />
          ))}
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          {categoriesToRender.map(({ name }) => (
            <List
              key={name}
              category={name}
              AppState={AppState}
              SetAppState={SetAppState}
              timerange="week"
            />
          ))}
        </TabContainer>
      )}
      {value === 3 && (
        <TabContainer>
          {categoriesToRender.map(({ name }) => (
            <List
              key={name}
              category={name}
              AppState={AppState}
              SetAppState={SetAppState}
              timerange="month"
            />
          ))}
        </TabContainer>
      )}
    </div>
  );
}

export default SimpleTabs;
