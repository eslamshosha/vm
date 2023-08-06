import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import flagImg from "../flag-ar.png";

function userRegister(values, { setSubmitting, resetForm, setFieldError }) {
  const { accept_terms_and_conditions, ...restValues } = values;

  axios
    .post("https://vm.tasawk.net/rest-api/ecommerce/auth/register", restValues)
    .then((response) => {
      setSubmitting(true);
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.log(restValues);
        const { data } = error.response;
        // console.log(data)
        // console.log(data.errors)
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key][0]);
        });
      }
    });
}

const onSubmit = async (values, actions) => {
  userRegister();
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
    // handleSubmit,
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
      city_id: "",
      zone_id: "",
      accept_terms_and_conditions: false,
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  const [show, setShow] = useState(false);
  const [countriesList, setCountriesList] = useState();
  const [citiesList, setCitiesList] = useState();
  const [zonesList, setZonesList] = useState();
  const [membershipList, setMembershipList] = useState("");
  const [loading, setLoading] = useState(false);
  const [countriesSelectedOpt, setCountriesSelectedOpt] = useState();
  const [citySelectedOpt, setCitySelectedOpt] = useState();
  const [zoneSelectedOpt, setZoneSelectedOpt] = useState();
  const showToggle = () => {
    setShow(!show);
  };

  function getMembershipList() {
    setLoading(true);
    axios
      .get("https://vm.tasawk.net/rest-api/ecommerce/memberships", {
        headers: {
          "Accept-Language": "ar",
        },
      })
      .then((res) => {
        setMembershipList(res.data.data);
        setLoading(false);
      });
  }
  function getCountries() {
    axios
      .get(`https://vm.tasawk.net/rest-api/locations/countries`, {
        headers: {
          "Accept-Language": "ar",
        },
      })
      .then((res) => {
        const updatedOptions = res.data.data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setCountriesList(updatedOptions);
      });
  }
  function getCitiesByCountry(id) {
    axios
      .get(`https://vm.tasawk.net/rest-api/locations/countries/${id}/cities`, {
        headers: {
          "Accept-Language": "ar",
        },
      })
      .then((res) => {
        const updatedOptions = res.data.data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        const cityUrl = res.config.url;
        setCitiesList(() => updatedOptions);
      });
  }
  function getZoneByCity(id) {
    const country__id = countriesSelectedOpt.value;
    axios
      .get(
        `https://vm.tasawk.net/rest-api/locations/countries/${country__id}/cities/${id}/districts`,
        {
          headers: {
            "Accept-Language": "ar",
          },
        }
      )
      .then((res) => {
        const updatedOptions = res.data.data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setZonesList(() => updatedOptions);
      });
  }

  useEffect(() => {
    getMembershipList();
    getCountries();
  }, []);

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
            <form action="" autoComplete="off" onSubmit={onSubmit}>
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
                      getCitiesByCountry(selected.value);
                    }}
                    placeholder="اختر"
                    value={countriesSelectedOpt}
                    onBlur={handleBlur}
                  />
                  {errors.country_id && touched.country_id && (
                    <p className="error">{errors.country_id}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="city_id">
                    المدينة
                  </label>
                  <Select
                    className="react-select-container form-input"
                    options={citiesList}
                    id="city_id"
                    onChange={(selected) => {
                      setFieldValue("city_id", selected.value);
                      setCitySelectedOpt(selected);
                      getZoneByCity(selected.value);
                      console.log();
                    }}
                    placeholder="اختر"
                    value={citySelectedOpt}
                    onBlur={handleBlur}
                  />
                  {errors.city_id && touched.city_id && (
                    <p className="error">{errors.city_id}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="zone_id">
                    المنطقة
                  </label>
                  <Select
                    className="react-select-container form-input"
                    options={zonesList}
                    id="zone_id"
                    onChange={(selected) => {
                      setFieldValue("zone_id", selected.value);
                      setZoneSelectedOpt(selected);
                    }}
                    placeholder="اختر"
                    value={zoneSelectedOpt}
                    onBlur={handleBlur}
                  />
                  {errors.zone_id && touched.zone_id && (
                    <p className="error">{errors.zone_id}</p>
                  )}
                </div>
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
                        <input
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.accept_terms_and_conditions}
                          id="accept_terms_and_conditions"
                        />
                        <span className="checkmark custom-checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="accept">
                    لقد قرأت وأوافق على
                    <a href="#!">الشروط والأحكام</a>
                  </div>
                </div>
                {errors.accept_terms_and_conditions &&
                  touched.accept_terms_and_conditions && (
                    <p className="error">
                      {errors.accept_terms_and_conditions}
                    </p>
                  )}
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
