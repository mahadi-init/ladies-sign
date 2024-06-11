import React from "react";
import Image from "next/image";
import pay from "@assets/img/footer/footer-pay-3.png";

const DetailsBottomInfo = ({ sku, category, tag }) => {
  return (
    <>
      {/* product-details-payment */}
      <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Guaranteed safe <br /> & secure checkout
        </p>
        <Image width={260} height={45} src={pay} alt="pay" />
      </div>
    </>
  );
};

export default DetailsBottomInfo;
