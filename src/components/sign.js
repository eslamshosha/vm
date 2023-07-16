import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sign() {
  const [show, setShow] = useState(false);
  const showToggle = () => {
    setShow(!show);
  };

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-cont">
          <h2 className="section-head">تسجيل دخول</h2>
          <form action="">
            <div className="model-input">
              <div className="form-group">
                <label className="form-label">الإسم بالكامل</label>
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="form-input custom-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label required">كلمة المرور</label>
                <div className="form-input-relative">
                  <label className={`password-show ${show ? "active" : ""}`}>
                    <input type="checkbox" onClick={showToggle} />
                    <i className="las la-eye-slash"></i>
                  </label>
                  <input
                    type={`${show ? "text" : "password"}`}
                    className="form-input custom-input"
                    placeholder="كلمة المرور"
                  />
                </div>
              </div>
              <Link className="forget-link" to="/forget-password">
                هل نسيت كلمة المرور ؟
              </Link>
              <button className="submit-btn" style={{ marginBottom: "10px" }}>
                دخول
              </button>
              <Link className="register-link" to="/">
                تسجيل حساب جديد
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
