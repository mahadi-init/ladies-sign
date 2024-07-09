import { decrement, increment } from "@/redux/features/cartSlice";
import { Minus, Plus } from "@/svg";
import { notifyError } from "@/utils/toast";
import { useDispatch, useSelector } from "react-redux";

const ProductQuantity = ({ quantity }) => {
  const dispatch = useDispatch();
  const { orderQuantity } = useSelector((state) => state.cart);

  const handleIncrease = () => {
    console.log(orderQuantity, quantity);

    if (orderQuantity >= quantity) {
      notifyError("Max quantity reached");
      return;
    }

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
