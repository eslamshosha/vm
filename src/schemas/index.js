import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  membership_id: yup.mixed().required("الحقل مطلوب"),
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("الحقل مطلوب"),
  full_name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("الحقل مطلوب"),
  personal_info: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("الحقل مطلوب"),
  phone: yup.number("wrong input").required("الحقل مطلوب"),
  email: yup
    .string()
    .email("يرجى إدخال البريد الإلكتروني الصحيح")
    .required("الحقل مطلوب"),
  country_id: yup.mixed().required("الحقل مطلوب"),
  city_id: yup.mixed().required("الحقل مطلوب"),
  zone_id: yup.mixed().required("الحقل مطلوب"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("الحقل مطلوب"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    //equal to password input
    .required("Required"),
  accept_terms_and_conditions: yup.boolean().required().isTrue(),
});
