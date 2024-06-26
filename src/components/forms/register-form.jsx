import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required(`নাম দিতে হবে`).label("Name"),
  email: Yup.string().email("ভুল ইমেইল"),
  phone: Yup.string().required(`ফোন নম্বর দিতে হবে`).label("Phone"),
  password: Yup.string()
    .required(`পাসওয়ার্ড দিতে হবে`)
    .min(6)
    .label("Password"),
  address: Yup.string().required(`ঠিকানা দিতে হবে`),
  whatsapp: Yup.string().required(`হোয়াটস্যাপ নম্বর দিতে হবে`),
  facebookProfile: Yup.string().required(`ফেইসবুক প্রোফাইল দিতে হবে`),
  facebookPage: Yup.string(),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [registerSeller, {}] = useRegistrationMutation();
  const router = useRouter();
  const { redirect } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerSeller(data).then((result) => {
      if (result?.error) {
        notifyError("Registration failed Failed");
      } else {
        notifySuccess("Registration Successful");
        router.push(redirect || "/auth");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("name")}
              id="name"
              name="name"
              type="text"
              placeholder="নাম দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">নাম</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="ইমেইল দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">ইমেইল (অপশনাল)</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("phone")}
              id="phone"
              name="phone"
              type="tel"
              placeholder="ফোন নম্বর দিন "
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="phone">ফোন নম্বর</label>
          </div>
          <ErrorMsg msg={errors.phone?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password")}
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="পাসওয়ার্ড দিন (ছয় অক্ষর এর বেশি)"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">পাসওয়ার্ড দিন</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("address")}
              id="address"
              name="address"
              type="text"
              placeholder="ঠিকানা দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="address">ঠিকানা</label>
          </div>
          <ErrorMsg msg={errors.address?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("whatsapp")}
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="হোয়াটস্যাপ নম্বর দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="whatsapp">হোয়াটস্যাপ</label>
          </div>
          <ErrorMsg msg={errors.whatsapp?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("facebookProfile")}
              id="facebookProfile"
              name="facebookProfile"
              type="text"
              placeholder="ফেইসবুক প্রোফাইল দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="facebookProfile">ফেইসবুক প্রোফাইল</label>
          </div>
          <ErrorMsg msg={errors.facebook?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("facebookPage", {
                required: `ফেইসবুক পেজ দিতে হবে`,
              })}
              id="facebookPage"
              name="facebookPage"
              type="text"
              placeholder="ফেইসবুক পেজ দিন "
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="facebookPage">ফেইসবুক পেজ (অপশনাল)</label>
          </div>
          <ErrorMsg msg={errors.facebookPage?.message} />
        </div>
      </div>

      {/* <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input
            {...register("remember", {
              required: `Terms and Conditions is required!`,
            })}
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
            I accept the terms of the Service & <a href="#">Privacy Policy</a>.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div> */}
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          রেজিস্টার
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
