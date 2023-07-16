import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb(prop) {
  return (
    <section className="breadcrumb-sec">
      <div className="container">
        <ol className="breadcrumb">
          <li className="item-home">
            <Link className="bread-link bread-home aFixx" to="/">
              الرئيسية
            </Link>
          </li>
          <li className="active item-23">
            <span className="bread-current">{prop.name}</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
