import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

export default function Sign() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const showToggle = () => {
    setShow(!show);
  };
  const onSubmit = (values, { setSubmitting, setFieldError, restForm }) => {
    setSubmitting(true);
    console.log("asas");
    axios
      .post("https://vm.tasawk.net/rest-api/ecommerce/auth/sign-in", values, {
        headers: {
          "Accept-language": "ar",
        },
      })
      .then((response) => {
        setSubmitting(false);
        console.log(response);
        localStorage.setItem("item_api", response.data.data.api_token);
        toast.success(successMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/otp");
        }, 2500);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          setFieldError("password", data.data.message);

          setSubmitting(false);
        }
        if (!error.response.data.phone_verified) {
          navigate("/otp");
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
      name: "",
      password: "",
    },
    validationSchema: signInSchema,
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
            <h2 className="section-head">تسجيل دخول</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="model-input">
                <div className="form-group">
                  <label className="form-label">الإسم بالكامل</label>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="اسم المستخدم"
                    className="form-input custom-input"
                  />
                  {errors.name && touched.name && (
                    <p className="error">{errors.name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">كلمة المرور</label>
                  <div className="form-input-relative">
                    <label className={`password-show ${show ? "active" : ""}`}>
                      <input type="checkbox" onClick={showToggle} />
                      <i className="las la-eye-slash"></i>
                    </label>
                    <input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="password"
                      name="password"
                      type={`${show ? "text" : "password"}`}
                      className="form-input custom-input"
                      placeholder="كلمة المرور"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <Link className="forget-link" to="/forget-password">
                  هل نسيت كلمة المرور ؟
                </Link>
                <button
                  className="submit-btn"
                  type="submit"
                  style={{ marginBottom: "10px" }}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? "دخول" : <div className="spinner-btn"></div>}
                </button>
                <Link className="register-link" to="/">
                  تسجيل حساب جديد
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
