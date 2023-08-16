import React from "react";
import { useFormik } from "formik";
import { otpSchema } from "../schemas";
import axios from "axios";

export default function Otp() {
  const onSubmit = async (values, actions) => {
    axios
      .post(
        "https://vm.tasawk.net/rest-api/ecommerce/auth/code-confirm",
        { values },
        {
          headers: {
            "Accept-language": "ar",
          },
        }
      )
      .then((response) => {
        setSubmitting(true);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          // setFieldError(key, data.errors[key][0]);
          // Object.keys(data.errors).forEach((key) => {
          // });
        setSubmitting(false);
        }
      });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      code: "",
      devices_token: "",
      phone: JSON.parse(sessionStorage.getItem("item_key")),
    },
    validationSchema: otpSchema,
    onSubmit,
  });
  console.log(values);
  return (
    <section className="form-section">
      <div className="container">
        <div className="form-cont">
          <h2 className="section-head">التحقق من كلمة المرور</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="model-input">
              <div className="form-group">
                <input
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  id="code"
                  className="form-input custom-input"
                  placeholder="رقم الجوال"
                />
                {errors.code && touched.code && (
                  <p className="error">{errors.code}</p>
                )}
              </div>
              <button className="submit-btn" disabled={isSubmitting}>
                {!isSubmitting ? (
                  "إرسال كود التحقق"
                ) : (
                  <div className="spinner-btn"></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
