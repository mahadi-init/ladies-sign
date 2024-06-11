import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";

const CheckoutOrderArea = ({ checkoutData }) => {
  const { isCheckoutSubmit, shippingCost } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.name} <span> x {item.orderQuantity}</span>
              </p>
              <span>৳{item.price.toFixed(2)}</span>
            </li>
          ))}

          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>৳{total.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>৳{shippingCost.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>৳{total + shippingCost}</span>
          </li>
        </ul>
      </div>
      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
