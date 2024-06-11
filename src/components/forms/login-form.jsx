import { notifyError, notifySuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// internal
import {
  useLoginMutation,
  useLoginSellerMutation,
  useLoginUserMutation,
} from "@/redux/features/auth/authApi";
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import Link from "next/link";

// schema
const schema = Yup.object().shape({
  phone: Yup.string().required().label("phone"),
  password: Yup.string().required().min(6).label("Password"),
  isSeller: Yup.boolean().default(false).label("isSeller"),
});
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  // const [loginUser, {}] = useLoginUserMutation();
  const [login, {}] = useLoginMutation();
  const router = useRouter();
  const { redirect } = router.query;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = async (data) => {
    const res = await login(data);

    if (res.data?.success) {
      notifySuccess("লগইন সম্পন্ন হয়েছে");
      router.push(redirect || "/profile");
    } else {
      notifyError(res.error.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("phone", { required: `ফোন নম্বর দিন!` })}
              name="phone"
              id="phone"
              type="tel"
              placeholder="আপনার ফোন নাম্বার দিন"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="phone">ফোন</label>
          </div>
          <ErrorMsg msg={errors.phone?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `পাসওয়ার্ড দিন` })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড দিন"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <Link href="/register" style={{ color: "blue" }}>
            নতুন একাউন্ট করুন
          </Link>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">পাসওয়ার্ড ভুলে গেছেন?</Link>
        </div>
      </div>
      <div
        className="tp-login-bottom"
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <button type="submit" className="tp-login-btn w-100">
          লগইন
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
