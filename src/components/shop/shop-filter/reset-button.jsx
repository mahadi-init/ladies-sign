import { useRouter } from "next/router";
import React from "react";

const ResetButton = () => {
  const router = useRouter();
  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Reset Filter</h3>
      <button onClick={() => router.push("/shop")} className="tp-btn">
        Reset Filter
      </button>
    </div>
  );
};

export default ResetButton;
