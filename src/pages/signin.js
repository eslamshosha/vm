import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb";
import SignIn from "../components/sign";

const SignInPage = () => {
  return (
    <Fragment>
      <Breadcrumb name="تسجيل دخول"/>
      <SignIn />
    </Fragment>
  );
};

export default SignInPage;
