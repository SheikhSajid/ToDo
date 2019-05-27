import React from "react";
import { render } from "react-dom";

import Header from "./Components/Header";

// import { HashRouter, Route } from "react-router-dom";

// import Signin from "./Signin";
// import Signup from "./Signup";
// import NoteViewer from "./NoteViewer";

// class App extends Component {
//   componentDidMount() {
//     testDixie().then(id => console.log(id));
//   }

//   render() {
//     return (
//       // <HashRouter>
//       //   <Fragment>
//       //     <Route path="/signin" component={Signin} />
//       //     <Route path="/signup" component={Signup} />
//       //     <Route path="/" component={NoteViewer} />
//       //   </Fragment>
//       // </HashRouter>
//       <h1>DEXieeeeee</h1>
//     );
//   }
// }

const App = () => <Header />;

render(<App />, document.getElementById("app"));
