import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import flagImg from "../flag-ar.png";

const onSubmit = async (values, actions) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
  console.log(values);
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      membership_id: "",
      name: "",
      full_name: "",
      phone: "",
      country_id: "",
      email: "",
      personal_info: "",
      password: "",
      password_confirmation: "",
    },
    // validationSchema: basicSchema,
    onSubmit,
  });
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
    setMembershipList(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getMembershipList();
  }, []);
  const [countriesList, setCountriesList] = useState();
  async function getCountries() {
    let { data } = await axios.get(
      `https://vm.tasawk.net/rest-api/locations/countries`,
      {
        headers: {
          "Accept-Language": "ar",
        },
      }
    );
    const updatedOptions = data.data.map((option) => ({
      value: option.id,
      label: option.name,
    }));
    console.log(updatedOptions);
    setCountriesList(updatedOptions);
  }
  useEffect(() => {
    getCountries();
  }, []);
  const [loading, setLoading] = useState(false);
  const [countriesSelectedOpt, setCountriesSelectedOpt] = useState();
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
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    رقم الجوال
                  </label>
                  <div className="form-input-relative">
                    <input
                      type="tel"
                      className={`form-input custom-input ${
                        errors.phone && touched.phone ? "input-error" : ""
                      }`}
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="tel-lang">
                      996+
                      <img src={flagImg} alt="" />
                    </span>
                  </div>
                  {errors.phone && touched.phone && (
                    <p className="error">{errors.phone}</p>
                  )}
                </div>
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
                <div className="form-group">
                  <label className="form-label" htmlFor="country_id">
                    الدولة
                  </label>
                  <Select
                    className="react-select-container form-input"
                    options={countriesList}
                    id="country_id"
                    // value={values.country_id}
                    onChange={(selected) => {
                      setFieldValue("country_id", selected.value);
                      setCountriesSelectedOpt(selected);
                      console.log(selected);
                    }}
                    placeholder="اختر"
                    value={countriesSelectedOpt}
                    onBlur={handleBlur}
                  />
                  {errors.country_id && touched.country_id && (
                    <p className="error">{errors.country_id}</p>
                  )}
                </div>
                {/* <div className="form-group">
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
