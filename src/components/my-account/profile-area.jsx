import React from "react";
import ProfileNavTab from "./profile-nav-tab";
import ProfileShape from "./profile-shape";
import NavProfileTab from "./nav-profile-tab";

import MyOrders from "./my-orders";
import Balance from "./balance";
import Settings from "./settings";

const ProfileArea = ({ data }) => {
  return (
    <>
      <section className="profile__area pt-120 pb-120">
        <div className="container">
          <div className="profile__inner p-relative">
            <ProfileShape />
            <div className="row">
              <div className="col-xxl-4 col-lg-4">
                <div className="profile__tab mr-40">
                  <ProfileNavTab />
                </div>
              </div>
              <div className="col-xxl-8 col-lg-8">
                <div className="profile__tab-content">
                  <div className="tab-content" id="profile-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <NavProfileTab orderData={data?.count} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-order"
                      role="tabpanel"
                      aria-labelledby="nav-order-tab"
                    >
                      <MyOrders orderData={data} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-balance"
                      role="tabpanel"
                      aria-labelledby="nav-balance-tab"
                    >
                      <Balance />
                    </div>
                    {/* <div
                      className="tab-pane fade"
                      id="nav-balance"
                      role="tabpanel"
                      aria-labelledby="nav-balance-tab"
                    >
                      <Balance />
                    </div> */}
                    <div
                      className="tab-pane fade"
                      id="nav-settings"
                      role="tabpanel"
                      aria-labelledby="nav-settings-tab"
                    >
                      <Settings />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileArea;
