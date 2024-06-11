import React from "react";
import { Delivery, Discount, Refund, Support } from "@/svg";

export const feature_data = [
  {
    icon: <Delivery />,
    title: "কম খরচ এ ডেলিভারি",
    subtitle: "সব ধরণের পণ্য তে",
  },
  {
    icon: <Refund />,
    title: "রেট্রান এবং রিফান্ড",
    subtitle: "মানি ব্যাক গেরান্টি",
  },
  {
    icon: <Discount />,
    title: "সেলার ডিসকাউন্ট",
    subtitle: "সেলার এর জন্য ডিসকাউন্ট",
  },
  {
    icon: <Support />,
    title: "সাপোর্ট 24/7",
    subtitle: "২৪ ঘন্টা সাপোর্ট",
  },
];

const FeatureArea = () => {
  return (
    <section className="tp-feature-area tp-feature-border-radius">
      <div className="container">
        <div className="row gx-1 gy-1 gy-xl-0">
          {feature_data.map((item, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="tp-feature-item d-flex align-items-start">
                {/* <div className="tp-feature-icon mr-15">
                  <span>{item.icon}</span>
                </div> */}
                <div className="tp-feature-content">
                  <h3 className="tp-feature-title">{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureArea;
