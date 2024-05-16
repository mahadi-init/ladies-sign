import { CircleUser } from "lucide-react";

export default function HeaderUserAuth() {
  return (
    <>
      <>
        <div className="tp-header-login-icon" style={{ marginRight: "5px" }}>
          <CircleUser size={34} />
        </div>
        <div className="tp-header-login-content d-none d-xl-block">
          <span>Hello</span>
          <div className="tp-header-login-title">
            <span style={{ cursor: "pointer", color: "black" }}>SIGNIN</span>
          </div>
        </div>
      </>
    </>
  );
}
