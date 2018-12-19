import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import DashBoard from "../DashBoard";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import * as routes from "../../constants/routes";
import history from "../../constants/history";
import SignInForm from "../../containers/SignInForm";

const App = ({ session, refetch }) => (
  <Router history={history}>
    <div>
      <Navigation />

      <hr />

      <Route
        exact
        path={routes.DASHBOARD}
        component={() => <SignUp refetch={refetch} />}
      />
      <Route
        exact
        path={routes.SIGNUP}
        component={() => <SignUp refetch={refetch} />}
      />
      <Route
        exact
        path={routes.SIGNIN}
        render={props => <SignInForm {...props} refetch={refetch} />}
      />
    </div>
  </Router>
);

export default App;
