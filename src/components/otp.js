import React from "react";
import { useFormik } from "formik";
import { otpSchema } from "../schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

export default function Otp() {
  const navigate = useNavigate();
  const onSubmit = async (
    values,
    { setSubmitting, setFieldError, restForm }
  ) => {
    axios
      .post(
        "https://vm.tasawk.net/rest-api/ecommerce/auth/code-confirm",
        values,
        {
          headers: {
            "Accept-language": "ar",
          },
        }
      )
      .then((response) => {
        setSubmitting(true);
        console.log("ffff");
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
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          setFieldError("code", data.message);
          console.log(error);
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
      code: "",
      devices_token: Math.floor(Math.random() * 123456789),
      phone: JSON.parse(sessionStorage.getItem("item_key")),
    },
    validationSchema: otpSchema,
    onSubmit,
  });
  console.log(values);
  // success message for toastify
  const successMessage = (
    <>
      <div className="toast-text-box">
        <div className="d-flex align-items-end mb-3 justify-content-center">
          <FaCheckCircle size={18} color={"#07bc0c"} />
          <h3 className="toast-text-h3"> كود التحقق صحيح </h3>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <CgSpinner size={20} className="spinner-load" />
          <p className="m-0">سيتم الآن توجيهك الى صفحة تسجيل الدخول </p>
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
                    name="code"
                    className="form-input custom-input"
                    placeholder="رقم الجوال"
                  />
                  {errors.code && touched.code && (
                    <p className="error">{errors.code}</p>
                  )}
                </div>
                <button className="submit-btn" disabled={isSubmitting}>
                  {!isSubmitting ?  "إرسال كود التحقق" : <div className="spinner-btn"></div>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
