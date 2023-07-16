import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

const onSubmit = async (values, actions) => {
  // console.log(values);
  // console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export default function Register() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      membership_id: "",
      name: "",
      email: "",
      full_name: "",
      personal_info: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  // console.log(errors);
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false);
  const showToggle = () => {
    setShow(!show);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [membershipList, setMembershipList] = useState("");
  async function getMembershipList() {
    setLoading(true);
    let { data } = await axios.get(
      "https://vm.tasawk.net/rest-api/ecommerce/memberships",
      {
        headers: {
          "Accept-Language": "ar",
        },
      }
    );
    // console.log(data.data);
    setMembershipList(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getMembershipList();
    // $(".myselect").select2();
  }, []);
  const [loading, setLoading] = useState(false);
  return (
    <section className="form-section">
      <div className="container">
        {loading ? (
          <div className="form-cont">
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) : (
          <div className="form-cont">
            <h2 className="section-head">تسجيل حساب جديد</h2>
            <form action="" autoComplete="off" onSubmit={handleSubmit}>
              <div className="model-input">
                <div className="form-group">
                  <label className="form-label required">نوع العضوية</label>
                  <div className="check-group">
                    {membershipList.length > 0 &&
                      membershipList.map((membership) => (
                        <div key={membership.id} className="check-width">
                          <label
                            htmlFor={membership.id}
                            className="check-label"
                          >
                            <input
                              value={membership.id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="radio"
                              className={`form-input custom-input ${
                                errors.membership_id && touched.membership_id
                                  ? "input-error"
                                  : ""
                              }`}
                              name="membership_id"
                              id={membership.id}
                            />
                            <span className="checkmark"></span>
                            {membership.title}
                          </label>
                        </div>
                      ))}
                    {errors.membership_id && touched.membership_id && (
                      <p className="error">{errors.membership_id}</p>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    اسم المستخدم
                    <span className="label-span">"إنجليزي فقط" </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`form-input custom-input ${
                      errors.name && touched.name ? "input-error" : ""
                    }`}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <p className="error">{errors.name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full_name">
                    الإسم بالكامل
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className={`form-input custom-input ${
                      errors.full_name && touched.full_name ? "input-error" : ""
                    }`}
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.full_name && touched.full_name && (
                    <p className="error">{errors.full_name}</p>
                  )}
                </div>
                {/* <div className="form-group">
            <label className="form-label" htmlFor="phone">
              رقم الجوال
            </label>
            <PhoneInput
              className="tel-input"
              defaultCountry="sa"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              id="phone"
            />
          </div> */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className={`form-input custom-input ${
                      errors.email && touched.email ? "input-error" : ""
                    }`}
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>
                {/* <div className="form-group">
            <label className="form-label" htmlFor="country_id">
              الدولة
            </label>
            <Select
              className="react-select-container form-input"
              options={options}
              id="country_id"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="city_id">
              المدينة
            </label>
            <Select
              className="react-select-container form-input"
              options={options}
              id="city_id"
            />
          </div> */}

                <div className="form-group">
                  <label className="form-label required" htmlFor="password">
                    كلمة المرور
                  </label>
                  <div className="form-input-relative">
                    <label className={`password-show ${show ? "active" : ""}`}>
                      <input type="checkbox" onClick={showToggle} />
                      <i className="las la-eye-slash"></i>
                    </label>
                    <input
                      type={`${show ? "text" : "password"}`}
                      id="password"
                      className={`form-input custom-input ${
                        errors.password && touched.password ? "input-error" : ""
                      }`}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="form-label required"
                    htmlFor="password_confirmation"
                  >
                    تأكيد كلمة المرور
                  </label>
                  <div className="form-input-relative">
                    <label className={`password-show ${show ? "active" : ""}`}>
                      <input type="checkbox" onClick={showToggle} />
                      <i className="las la-eye-slash"></i>
                    </label>
                    <input
                      type={`${show ? "text" : "password"}`}
                      id="password_confirmation"
                      className={`form-input custom-input ${
                        errors.password_confirmation &&
                        touched.password_confirmation
                          ? "input-error"
                          : ""
                      }`}
                      value={values.password_confirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <p className="error">{errors.password_confirmation}</p>
                    )}
                </div>
                <div className="form-group">
                  <label
                    className="form-label required"
                    htmlFor="personal_info"
                  >
                    نبذة شخصية
                  </label>
                  <textarea
                    id="personal_info"
                    className={`form-input custom-input ${
                      errors.personal_info && touched.personal_info
                        ? "input-error"
                        : ""
                    }`}
                    value={values.personal_info}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {errors.personal_info && touched.personal_info && (
                    <p className="error">{errors.personal_info}</p>
                  )}
                </div>

                <div className="terms-cont">
                  <div className="check-group">
                    <div className="check-width">
                      <label className="check-label">
                        <input type="checkbox" />
                        <span className="checkmark custom-checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="accept">
                    لقد قرأت وأوافق على
                    <a href="#!">الشروط والأحكام</a>
                  </div>
                </div>
                <button className="submit-btn" disabled={isSubmitting}>
                  ارسال
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
