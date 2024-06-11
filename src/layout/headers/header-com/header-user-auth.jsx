import { CircleUser } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HeaderUserAuth() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="tp-header-login-icon mr-5">
        <CircleUser size={34} />
      </div>
      <>
        <Link
          href="/profile"
          className="tp-header-login-content d-none d-xl-block"
        >
          {user ? (
            <>
              <span style={{ fontWeight: "700" }}>স্বাগতম</span>
              <div className="tp-header-login-title">
                <span style={{ cursor: "pointer", color: "black" }}>
                  {user?.name}
                </span>
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "black",
                marginTop: "15px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              প্রোফাইল
            </div>
          )}
        </Link>
      </>
    </>
  );
}
