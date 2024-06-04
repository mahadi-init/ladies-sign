import { notifyError, notifySuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// internal
import {
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
  const [loginUser, {}] = useLoginUserMutation();
  const [loginSeller, {}] = useLoginSellerMutation();
  const router = useRouter();
  const { redirect } = router.query;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = async (data) => {
    const isSeller = data.isSeller;
    let res;

    if (isSeller) {
      res = await loginSeller(data);
    } else {
      res = await loginUser(data);
    }

    if (res.data?.success) {
      notifySuccess("Login successfully");
      router.push(redirect || "/");
    } else {
      notifyError("Account not found");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("phone", { required: `Phone is required!` })}
              name="phone"
              id="phone"
              type="tel"
              placeholder="01712345678"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="phone">Your Phone</label>
          </div>
          <ErrorMsg msg={errors.phone?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 character"
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
          <input id="isSeller" type="checkbox" {...register("isSeller")} />
          <label htmlFor="isSeller">Login as seller</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>
      <div
        className="tp-login-bottom"
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <button type="submit" className="tp-login-btn w-100">
          Login
        </button>
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignSelf: "center",
            fontSize: "16px",
          }}
        >
          <p style={{ color: "black" }}>New here ?</p>
          <Link href="/register" style={{ color: "blue" }}>
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
