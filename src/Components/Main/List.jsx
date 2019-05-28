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

function CheckboxList({ AppState, SetAppState, category }) {
  const classes = useStyles();

  const tasksFromCategory = AppState.main.filter(
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
