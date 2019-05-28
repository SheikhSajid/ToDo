import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import db from "db";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const getTasksFromTimerange = (tasks, range) => {
  const d = new Date();
  let filteredOutput = [];

  if (range === "today") {
    filteredOutput = tasks.filter(
      task =>
        task.date === d.getDate() &&
        task.month === d.getMonth() + 1 &&
        task.year === d.getFullYear()
    );
  } else if (range === "month") {
    filteredOutput = tasks.filter(
      task => task.month === d.getMonth() + 1 && task.year === d.getFullYear()
    );
  } else if (range === "week") {
    const dayOfTheWeek = d.getDay();
    const daysLeft = 7 - dayOfTheWeek;

    for (let i = 1; i <= daysLeft; i += 1) {
      const t = tasks.filter(
        task =>
          task.date === d.getDate() &&
          task.month === d.getMonth() + 1 &&
          task.year === d.getFullYear()
      );
      filteredOutput = [...filteredOutput, ...t];
      d.setDate(d.getDate() + 1); // increment the date object's date
    }
  } else {
    filteredOutput = tasks;
  }

  return filteredOutput;
};

function CheckboxList({ AppState, SetAppState, category, timerange }) {
  const classes = useStyles();
  let dataSource = AppState.main;

  if (AppState.searchTerm) {
    dataSource = dataSource.filter(
      task =>
        task.title.toLowerCase().includes(AppState.searchTerm.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(AppState.searchTerm.toLowerCase())
    );
  }

  const tasksFromTimeRange = getTasksFromTimerange(dataSource, timerange);
  const tasksFromCategory = tasksFromTimeRange.filter(
    task => task.category === category
  );
  const completedTasks = tasksFromCategory.filter(task => task.done === 1);
  const incompleteTasks = tasksFromCategory.filter(task => task.done === 0);

  const handleToggle = clickedTask => () => {
    const flippedDoneField = clickedTask.done ? 0 : 1;

    db.main
      .update(clickedTask.id, { done: flippedDoneField })
      .then(() => {
        const newMainTasks = AppState.main.filter(
          task => task.id !== clickedTask.id
        );
        clickedTask.done = flippedDoneField;
        SetAppState({ main: [...newMainTasks, clickedTask] });
      })
      .catch(err => alert(err));
  };

  const renderTasks = task => {
    const { id, done, title, description, time, month, date } = task;

    function handleDelete() {
      db.main.delete(id).then(() => {
        const newMainState = AppState.main.filter(
          currTask => currTask.id !== id
        );
        SetAppState({ main: newMainState });
      });
    }

    let style = {};
    if (done) style = { textDecoration: "line-through" };

    return (
      <LightTooltip
        key={id}
        title={
          `${description}\nDate: ${date}/${month}\nTime: ${time}` ||
          "No description available"
        }
      >
        <ListItem role={undefined} dense button onClick={handleToggle(task)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={done === 1}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={title} style={style} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Comments" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </LightTooltip>
    );
  };

  const list = (
    <List className={classes.root}>
      <Typography
        variant="h5"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        {category}
      </Typography>

      {incompleteTasks.map(renderTasks)}
      {completedTasks.map(renderTasks)}
    </List>
  );

  const placeholder = <span />;

  const output = tasksFromCategory.length ? list : placeholder;

  return output;
}

export default CheckboxList;
