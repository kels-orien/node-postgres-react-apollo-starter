import React from "react";
import SignUpForm from "../../containers/SignUpForm";

const SignUp = ({ history, refetch }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

export default SignUp;
