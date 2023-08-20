import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { phoneSchema } from "../schemas";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

export default function Forget() {
  const onSubmit = async (
    values,
    { setSubmitting, setFieldError, restForm }
  ) => {
    axios
      .post("https://vm.tasawk.net/rest-api/ecommerce/auth/forget-password", values, {
        headers: {
          "Accept-language": "ar",
        },
      })
      .then((response) => {
        setSubmitting(true);
        console.log(response);
        // localStorage.setItem("item_key", );
        toast.success(successMessage, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setTimeout(() => {
        //   navigate("/signin");
        // }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          setFieldError("phone", error.response);

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
    // setSubmitting,
    // setFieldError,
    handleChange,
    restForm,
    handleBlur,
  } = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: phoneSchema,
    onSubmit,
  });
  const successMessage = (
    <>
      <div className="toast-text-box">
        <div className="d-flex align-items-end mb-3 justify-content-center">
          <FaCheckCircle size={18} color={"#07bc0c"} />
          <h3 className="toast-text-h3"> التسجيل صحيح</h3>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <CgSpinner size={20} className="spinner-load" />
          <p className="m-0">سيتم الآن توجيهك الى صفحة الرئيسيه </p>
        </div>
      </div>
    </>
  );
  return (
    <>
      <ToastContainer />
      <section className="form-section">
        <div className="container">
          <div className="form-cont">
            <h2 className="section-head">استعادة كلمة المرور</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="model-input">
                <div className="form-group">
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input custom-input"
                    placeholder="رقم الجوال"
                  />
                  {errors.phone && touched.phone && (
                    <p className="error">{errors.phone}</p>
                  )}
                </div>
                <button
                  className="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
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
    </>
  );
}
