import React from "react";

export default function Forget() {
  return (
    <section className="form-section">
      <div className="container">
        <div className="form-cont">
          <h2 className="section-head">استعادة كلمة المرور</h2>
          <form action="">
            <div className="model-input">
              <div className="form-group">
                <input
                  type="tel"
                  className="form-input custom-input"
                  placeholder="رقم الجوال"
                />
              </div>
              <button className="submit-btn">إرسال كود التحقق</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
