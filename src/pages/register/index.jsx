import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import RegisterForm from "@/components/forms/register-form";

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
          }}
        >
          Create new Account
        </p>
        <RegisterForm />
      </div>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default Auth;
