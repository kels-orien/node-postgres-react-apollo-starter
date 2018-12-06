import React, { Component } from "react";
import { SIGNUP_USER } from "./../../graphql";
import { Mutation } from "react-apollo";
import classNames from "classnames"
import {NavLink} from 'react-router-dom';
const INITIALSTATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  passwordMatch: null
};

class SignUpForm extends Component {
  constructor(props) {
    super();
    this.state = {
      ...INITIALSTATE
    };
  }
  clearState() {
    this.setState({ ...INITIALSTATE });
  }
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  validate() {
    const { firstname, lastname, email, username, password, confirmPassword } = this.state
    const isInvalid = !firstname || !lastname || !email || !username || !password || password !== confirmPassword || password.length <= 7;
    return isInvalid;
}
confirmPW() {
    const { password, confirmPassword } = this.state
    const isMatch = password !== confirmPassword && password.length <= 7;
    this.setState({
        passwordMatch: isMatch
    });
}
  onSubmit(event, signupUser) {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
        //Cookies.set('token', data.signupUser.token);
        await this.props.refetch();
        this.clearState();
        this.props.history.push('/dashboard');
    }).catch(error => {
        this.setState({
            error: 'Either your email or username is already taken. Please adjust and try again.'
        })
    });

}
  render() {
    const { firstname, lastname, email, username, password, confirmPassword } = this.state
    return (
      <Mutation mutation={SIGNUP_USER} variables={{ firstname, lastname, email, username, password }}>
        {(signupUser, { loading, error }) => {
        return ( 
            <div>
                <form onSubmit={event => this.onSubmit(event, signupUser)}>

                       <div className="form_wrap">

<div className={classNames({ 'error-label': this.state.error != '' })}>
    {this.state.error}
</div>

<div className="form_row">

    <div className="form_item">
        <div className="form_input">
            <input type="text" name="firstname" placeholder="First Name" value={firstname} onChange={this.onChange.bind(this)} />
            <span className="bottom_border"></span>
        </div>
    </div>

</div>

<div className="form_row">

    <div className="form_item">
        <div className="form_input">
            <input type="text" name="lastname" placeholder="Last Name" value={lastname} onChange={this.onChange.bind(this)} />
            <span className="bottom_border"></span>
        </div>
    </div>

</div>

<div className="form_row">

    <div className="form_item">
        <div className="form_input">
            <input type="email" name="email" placeholder="Email" value={email} onChange={this.onChange.bind(this)} />
            <span className="bottom_border"></span>
        </div>
    </div>

</div>

<div className="form_row">

    <div className="form_item">
        <div className="form_input">
            <input type="text" name="username" placeholder="username" value={username} onChange={this.onChange.bind(this)} />
            <span className="bottom_border"></span>
        </div>
        <div className="helperText">
            Please note that you will not be able to change this after your registration.
        </div>
    </div>

</div>

<div className="form_row">

    <div className={classNames({ 'error-label': true, 'passwordMatch': !this.state.passwordMatch })}>
        Please check that your passwords match and are at least 8 characters.
    </div>

    <div className="form_item">

        <div className="form_input">
            <input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange.bind(this)} />
            <span className="bottom_border"></span>
        </div>

        <div className="helperText">
            Password must be a minium of 8 characters in length.
        </div>

    </div>

</div>

<div className="form_row">

    <div className="form_item">

        <div className="form_input">
            <input type="password" name="confirmPassword" placeholder="Password confirm" value={confirmPassword} onChange={this.onChange.bind(this)} onBlur={this.confirmPW.bind(this)} />
            <span className="bottom_border"></span>
        </div>

    </div>

</div>

<div className="formBottomLinks">
    <p>
        Already have an account? <NavLink to="/signin">Sign-in</NavLink>
    </p>
</div>

<div className="form_buttons">
    <button className="btn" type="submit"
        disabled={loading || this.validate()}>
        Register</button>
</div>

</div>

                </form>
            </div>
        );
        }}
       
      </Mutation>
    );
  }
}

export default  SignUpForm;
