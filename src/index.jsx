// import React, { Component, Fragment } from "react";
import React from "react";
import { render } from "react-dom";
// import { HashRouter, Route } from "react-router-dom";

// import Signin from "./Signin";
// import Signup from "./Signup";
// import NoteViewer from "./NoteViewer";

// class Index extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Fragment>
//           <Route path="/signin" component={Signin} />
//           <Route path="/signup" component={Signup} />
//           <Route path="/" component={NoteViewer} />
//         </Fragment>
//       </HashRouter>
//     );
//   }
// }

const Index = () => <p>Hello React</p>;

render(<Index />, document.getElementById("app"));