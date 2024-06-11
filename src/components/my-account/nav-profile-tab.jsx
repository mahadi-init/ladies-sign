import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Box, DeliveryTwo, Processing, Truck } from "@/svg";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import Link from "next/link";

const NavProfileTab = ({ orderData }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push("/");
  };

  return (
    <div className="profile__main">
      <div className={`profile__main-top pb-80`}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">
                  <a>স্বাগতম {user?.name ?? "Guest"}</a>
                  <br />
                </h4>
                <a>
                  {user ? (
                    <>
                      <p>ID: #{user?._id.slice(-7)}</p>
                      <p>Phone : {user?.phone}</p>
                    </>
                  ) : (
                    "আপনি লগইন ছাড়াই পণ্য কিনতে পারবেন"
                  )}
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              {user ? (
                <a
                  onClick={handleLogout}
                  className="cursor-pointer tp-logout-btn"
                >
                  লগআউট
                </a>
              ) : (
                <Link href="/auth" className="cursor-pointer tp-logout-btn">
                  সেলার লগইন
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="profile__main-info">
        <div className="row gx-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-download">
                    {orderData?.totalDoc}
                  </span>
                  <Box />
                </span>
              </div>
              <h4 className="profile__main-info-title">Total Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-order">
                    {orderData?.pendingOrder}
                  </span>
                  <Processing />
                </span>
              </div>
              <h4 className="profile__main-info-title">Pending Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">
                    {orderData?.processing}
                  </span>
                  <Truck />
                </span>
              </div>
              <h4 className="profile__main-info-title">Processing Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">
                    {orderData?.delivered}
                  </span>
                  <DeliveryTwo />
                </span>
              </div>
              <h4 className="profile__main-info-title">Complete Order</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfileTab;
