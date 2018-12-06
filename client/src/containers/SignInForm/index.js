import React, { Component } from "react";
import { SIGNIN_USER } from "./../../graphql";

const INITIALSTATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

class SignInForm extends Component {
  constructor(props) {
    super();
    this.state = {
      ...INITIALSTATE
    };
  }
  clearState() {
    this.setState({ ...INITIALSTATE });
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div>
        <h1>SignInForm</h1>
      </div>
    );
  }
}

export default SignInForm;
