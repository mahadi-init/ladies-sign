import { CircleUser } from "lucide-react";
import Link from "next/link";

export default function HeaderUserAuth() {
  return (
    <>
      <>
        <div className="tp-header-login-icon" style={{ marginRight: "5px" }}>
          <CircleUser size={34} />
        </div>
        <Link
          href="/auth"
          className="tp-header-login-content d-none d-xl-block"
        >
          <span>Hello</span>
          <div className="tp-header-login-title">
            <span style={{ cursor: "pointer", color: "black" }}>SIGNIN</span>
          </div>
        </Link>
      </>
    </>
  );
}
