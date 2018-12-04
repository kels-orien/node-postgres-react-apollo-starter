import React from "react";
import SignInForm from "../../containers/SignInForm";

const SignIn = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
  </div>
);

export default SignIn;
