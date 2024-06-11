import React from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";

const CartCheckout = () => {
  const { total } = useCartInfo();
  const shipCost = 120;

  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Subtotal</span>
        <span className="tp-cart-checkout-top-price">৳{total}</span>
      </div>
      <div className="tp-cart-checkout-shipping d-flex align-items-center justify-content-between">
        <h5 className="tp-cart-checkout-shipping-title">Shipping Cost</h5>
        <h5 className="tp-cart-checkout-shipping-title">৳120</h5>
      </div>
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
        <span>Total</span>
        <span>৳{(total + shipCost).toFixed(2)}</span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <Link href="/checkout" className="tp-cart-checkout-btn w-100">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
