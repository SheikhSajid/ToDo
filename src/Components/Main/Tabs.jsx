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
  },
  searchResultString: {
    color: "1px solid rgba(0, 0, 0, 0.12)",
    marginLeft: theme.spacing(1)
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

  function withCategoryName(ListComponent, name) {
    return function HOC(props) {
      return (
        <ListComponent
          category={name}
          AppState={AppState}
          SetAppState={SetAppState}
          {...props}
        />
      );
    };
  }

  function generateTabContainers(timerange) {
    return (
      <TabContainer>
        {categoriesToRender.map(({ name }) => {
          const CategoryList = withCategoryName(List, name);
          return <CategoryList key={name} timerange={timerange} />;
        })}
      </TabContainer>
    );
  }

  const timeRanges = ["ALL", "TODAY", "WEEK", "MONTH"];

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
      {AppState.searchTerm && (
        <Typography className={classes.searchResultString} variant="h6">
          Showing Results from the {`"${timeRanges[value]}"`} tab and the{" "}
          {`"${AppState.selectedCategory}"`} category
        </Typography>
      )}
      {value === 0 && generateTabContainers("all")}
      {value === 1 && generateTabContainers("today")}
      {value === 2 && generateTabContainers("week")}
      {value === 3 && generateTabContainers("month")}
    </div>
  );
}

export default SimpleTabs;
