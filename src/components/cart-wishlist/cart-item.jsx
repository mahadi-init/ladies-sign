import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  const {
    _id,
    name,
    img,
    price,
    size,
    color,
    orderQuantity = 0,
  } = product || {};

  const dispatch = useDispatch();

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product img" width={70} height={100} />
        </Link>
      </td>

      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{name}</Link>
      </td>

      <td className="tp-cart-price">
        <span>{color}</span>
      </td>

      <td className="tp-cart-price">
        <span>{size}</span>
      </td>

      <td className="tp-cart-price">
        <span>৳{(price * orderQuantity).toFixed(2)}</span>
      </td>

      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>

      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd({ title: name, id: _id })}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
