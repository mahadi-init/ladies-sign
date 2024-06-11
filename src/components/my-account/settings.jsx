import * as Yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "@/components/common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { useUpdateSellerInfoMutation } from "@/redux/features/sellerApi";

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email("ভুল ইমেইল"),
  phone: Yup.string(),
  password: Yup.string().min(6).label("Password"),
  address: Yup.string(),
  whatsapp: Yup.string(),
  facebookProfile: Yup.string(),
  facebookPage: Yup.string(),
  nid: Yup.string(),
  license: Yup.string(),
});

export default function Settings() {
  // const [showPass, setShowPass] = useState(false);
  const [updateSellerInfo, {}] = useUpdateSellerInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await updateSellerInfo(data);

    if (res?.data?.success) {
      notifySuccess("Information updated");
    } else {
      notifyError("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Update Your Profile
      </p>
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
            <label htmlFor="email">ইমেইল</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("phone")}
              id="phone"
              style={{ background: "#e7e4e4" }}
              name="phone"
              type="tel"
              placeholder="ফোন নম্বর আপডেট করতে অ্যাডমিন এর সাথে যোগাযোগ করুন"
              disabled={true}
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="phone">ফোন নম্বর</label>
          </div>
          <ErrorMsg msg={errors.phone?.message} />
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
              {...register("nid")}
              id="nid"
              name="nid"
              type="text"
              placeholder="ন্যাশনাল আইডি দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="nid">ন্যাশনাল আইডি</label>
          </div>
          <ErrorMsg msg={errors.nid?.message} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("license")}
              id="license"
              name="license"
              type="text"
              placeholder="লাইসেন্স আইডি দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="license">লাইসেন্স আইডি</label>
          </div>
          <ErrorMsg msg={errors.license?.message} />
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
            <label htmlFor="facebookPage">ফেইসবুক পেজ</label>
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
          Update
        </button>
      </div>
    </form>
  );
}
