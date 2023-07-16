import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb";
import Forget from "../components/forget-password";

const Forgetpassword = () => {
  return (
    <Fragment>
      <Breadcrumb name="استعادة كلمة المرور"/>
      <Forget />
    </Fragment>
  );
};

export default Forgetpassword;
