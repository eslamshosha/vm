import React, { Fragment } from "react";
import Breadcrumb from "../components/breadcrumb";
import OtpPage from "../components/otp";

const Otp = () => {
  return (
    <Fragment>
      <Breadcrumb name="التحقق من كلمة المرور"/>
      <OtpPage />
    </Fragment>
  );
};

export default Otp;
