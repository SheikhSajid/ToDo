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

function CheckboxList({
  AppState,
  SetAppState,
  completedTasks,
  incompleteTasks
}) {
  const classes = useStyles();
  // const [checked, setChecked] = React.useState([0]);

  const handleToggle = clickedTask => () => {
    const flippedDoneField = clickedTask.done ? 0 : 1;

    db.main.update(clickedTask.id, { done: flippedDoneField }).then(() => {
      const newMainTasks = AppState.main.filter(
        task => task.id !== clickedTask.id
      );
      clickedTask.done = flippedDoneField;
      SetAppState({ main: [...newMainTasks, clickedTask] });
    });
  };

  return (
    <List className={classes.root}>
      <Typography
        variant="h5"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        Test
      </Typography>

      {incompleteTasks.map(task => {
        const { id, done, description } = task;

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
            <ListItemText primary={description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}

      {completedTasks.map(task => {
        const { id, done, description } = task;

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
              primary={description}
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
}

export default CheckboxList;
