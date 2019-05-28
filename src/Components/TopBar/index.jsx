import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
// import Typography from "@material-ui/core/Typography";

import Search from "./SearchBox";
import NewTaskForm from "./NewTaskForm";
import useStyles from "./style";

export default function index(props) {
  const classes = useStyles();
  const { AppState, SetAppState, SyncAppStateWithDb } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  function handleDrawerToggle() {
    SetAppState({ drawerOpenMobile: !AppState.drawerOpenMobile });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Search AppState={AppState} SetAppState={SetAppState} />

          <Button variant="contained" color="primary" onClick={openModal}>
            Add New
          </Button>

          {modalOpen && (
            <Modal open={modalOpen} onClose={closeModal}>
              <div
                style={{
                  transform: "translate(calc(50vw - 200px), calc(50vh - 200px)"
                }}
                className={classes.paper}
              >
                <NewTaskForm
                  AppState={AppState}
                  SetAppState={SetAppState}
                  SyncAppStateWithDb={SyncAppStateWithDb}
                  closeModal={closeModal}
                />
              </div>
            </Modal>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
