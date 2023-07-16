import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb";
import Register from "../components/register";

const RegisterPage = () => {
  return (
    <Fragment>
      <Breadcrumb
        name="تسجيل حساب جديد"
      />
      <Register />
    </Fragment>
  );
};

export default RegisterPage;
