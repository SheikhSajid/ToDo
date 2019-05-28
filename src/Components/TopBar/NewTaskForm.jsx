// import React, { Component } from 'react';
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import db from "db";

import useStyles from "./style";

export default function NewTaskForm({
  AppState,
  SyncAppStateWithDb,
  closeModal
}) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: "",
    description: "",
    categories: AppState.category,
    selectedCategory: AppState.category[0].name,
    date: "",
    time: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const [year, month, day] = values.date.split("-");

    const newTask = {
      ...values,
      category: values.selectedCategory,
      starred: 0,
      month,
      year,
      day,
      done: 0
    };
    delete newTask.selectedCategory;
    delete newTask.categories;

    db.main
      .add(newTask)
      .then(() => SyncAppStateWithDb("main"))
      .catch(err => alert(err));

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">New Task</Typography>

      <TextField
        id="outlined-name"
        label="Title"
        className={classes.textField}
        value={values.title}
        onChange={handleChange("title")}
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        rowsMax="6"
        value={values.description}
        onChange={handleChange("description")}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={values.selectedCategory}
        onChange={handleChange("selectedCategory")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        margin="normal"
        variant="outlined"
      >
        {values.categories.map(category => (
          <MenuItem key={category.name} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="date"
        label="Date"
        type="date"
        // defaultValue="2017-05-24"
        defaultValue={values.date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange("date")}
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="time"
        label="Time"
        type="time"
        // defaultValue="07:30"
        defaultValue={values.time}
        className={classes.textField}
        onChange={handleChange("time")}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
        margin="normal"
        variant="outlined"
      />

      {/* <Button
        variant="contained"
        className={classes.button}
        onClick={closeModal}
      >
        Close
      </Button> */}

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}
