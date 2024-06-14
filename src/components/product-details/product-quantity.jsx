import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "@/svg";
import { decrement, increment } from "@/redux/features/cartSlice";

const ProductQuantity = () => {
  const dispatch = useDispatch();
  const { orderQuantity } = useSelector((state) => state.cart);

  const handleIncrease = () => {
    dispatch(increment());
  };

  const handleDecrease = () => {
    dispatch(decrement());
  };
  return (
    <div className="tp-product-details-quantity">
      <div className="tp-product-quantity mb-15 mr-15">
        <span className="tp-cart-minus" onClick={handleDecrease}>
          <Minus />
        </span>
        <input
          className="tp-cart-input"
          type="text"
          readOnly
          value={orderQuantity}
        />
        <span className="tp-cart-plus" onClick={handleIncrease}>
          <Plus />
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
