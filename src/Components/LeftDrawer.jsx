import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import { useTheme } from "@material-ui/core/styles";

import useStyles, { useTheme } from "./TopBar/style";

export default function LeftDrawer({ AppState, SetAppState }) {
  const classes = useStyles();
  const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    SetAppState({ drawerOpenMobile: !AppState.drawerOpenMobile });
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography style={{ marginLeft: theme.spacing(2) }} variant="h5">
        Categories
      </Typography>
      <List>
        {AppState.category.map(({ name }, index) => (
          <ListItem button key={name}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button key="all">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="all" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={AppState.drawerOpenMobile}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
