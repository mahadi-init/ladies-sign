import { CircleUser } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HeaderUserAuth() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <>
        <div className="tp-header-login-icon" style={{ marginRight: "5px" }}>
          <CircleUser size={34} />
        </div>
        {user ? (
          <>
            <Link
              href="/profile"
              className="tp-header-login-content d-none d-xl-block"
            >
              <span>Hello</span>
              <div className="tp-header-login-title">
                <span style={{ cursor: "pointer", color: "black" }}>
                  {user?.name}
                </span>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              className="tp-header-login-content d-none d-xl-block"
            >
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  marginTop: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Login
              </div>
            </Link>
          </>
        )}
      </>
    </>
  );
}
