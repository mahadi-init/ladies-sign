import React from "react";
import { useDispatch } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Menu } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderUserAuth from "./header-user-auth";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const { quantity } = useCartInfo();
  const dispatch = useDispatch();

  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <HeaderUserAuth />
        </div>
      </div>

      <div className="tp-header-action d-flex align-items-center ml-50">
        <div className="tp-header-action-item">
          <button
            onClick={() => dispatch(openCartMini())}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{quantity}</span>
          </button>
        </div>

        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className="tp-header-action-btn tp-offcanvas-open-btn"
          >
            <Menu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainRight;
