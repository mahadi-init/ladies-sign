import React from "react";
import ErrorMsg from "../common/error-msg";

const CheckoutBillingArea = ({ register, errors }) => {
  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  নাম <span>*</span>
                </label>
                <input
                  {...register("name", {
                    required: `আপনি নাম দেন নি!`,
                  })}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="আপনার নাম দিন"
                />
                <ErrorMsg msg={errors?.name?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  ফোন <span>*</span>
                </label>
                <input
                  {...register("phone", {
                    required: `আপনি ফোন নাম্বার দেন নি`,
                  })}
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="আপনার ফোন নাম্বার দিন"
                />
                <ErrorMsg msg={errors?.phone?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  ঠিকানা <span>*</span>
                </label>
                <input
                  {...register("address", {
                    required: `আপনি ফোন নাম্বার দেন নি`,
                  })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="আপনার ঠিকানা দিন"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>নোট </label>
                <textarea
                  {...register("note", { required: false })}
                  name="note"
                  id="note"
                  placeholder="আরো কিছু লিখার থাকলে এখানে লিখুন"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
