import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import LoginForm from "@/components/forms/login-form";

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
            paddingBottom: "15px",
            color: "black",
          }}
        >
          Login to continue
        </p>
        <LoginForm />
      </div>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default Auth;
