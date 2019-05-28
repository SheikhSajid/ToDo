import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";

import db from "db";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

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

  const tasksFromTimeRange = getTasksFromTimerange(AppState.main, timerange);
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

  const list = (
    <List className={classes.root}>
      <Typography
        variant="h5"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        {category}
      </Typography>

      {incompleteTasks.map(task => {
        const { id, done, title } = task;

        return (
          <ListItem
            key={id}
            role={undefined}
            dense
            button
            onClick={handleToggle(task)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={done === 1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}

      {completedTasks.map(task => {
        const { id, done, title } = task;

        return (
          <ListItem
            key={id}
            role={undefined}
            dense
            button
            onClick={handleToggle(task)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={done === 1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={title}
              style={{ textDecoration: "line-through" }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );

  const placeholder = <span />;

  const output = tasksFromCategory.length ? list : placeholder;

  return output;
}

export default CheckboxList;
