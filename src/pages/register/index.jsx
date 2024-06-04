import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";

const Auth = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Authentication" />
      <HeaderTwo style_2={true} />
      <div
        style={{
          width: "70%",
          margin: "82px auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Create new Account
        </p>
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "18px",
          }}
        >
          Register as a seller?
          <Link
            style={{ color: "blue", marginLeft: "8px" }}
            href="https://ladies-sign-admin.vercel.app/auth/signup"
            target="_blank"
          >
            Click here
          </Link>
        </div>

        <RegisterForm />
      </div>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default Auth;
