import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";
import {
  add_cart_product,
  resetOrderQuantity,
} from "@/redux/features/cartSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";

const DetailsWrapper = ({
  productItem,
  activeIndex,
  setActiveIndex,
  detailsBottom = false,
}) => {
  const { name, sku, variants, description, discount, status } =
    productItem || {};
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();

  const handleAddProduct = (prd) => {
    const variant = prd.variants[activeIndex];

    const product = {
      _id: prd._id,
      name: prd.name,
      sku: prd.sku,
      color: variant.color,
      img: variant.img,
      size: variant.size,
      price: variant.price,
      quantity: variant.quantity,
    };
    dispatch(add_cart_product(product));
    dispatch(resetOrderQuantity());
  };

  const getVariantCount = () => {
    if (!variants) {
      return;
    }

    if (variants.length === 1) {
      return "(Single Variant)";
    } else {
      return `(${variants.length} variants)`;
    }
  };

  return (
    <div className="tp-product-details-wrapper">
      <h3 className="tp-product-details-title">{name}</h3>

      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>

        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-reviews">
            <span>{getVariantCount()}</span>
          </div>
        </div>
      </div>

      <p>
        {textMore ? description : `${description.substring(0, 150)}...`}
        <span onClick={() => setTextMore(!textMore)}>
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      <div className="tp-product-details-price-wrapper mb-30">
        {discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              ৳{variants[activeIndex]?.price}
            </span>
            <span className="tp-product-details-price new-price">
              {" "}
              ৳
              {(
                Number(variants[activeIndex]?.price) -
                (Number(variants[activeIndex]?.price) * Number(discount)) / 100
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            ৳{variants[activeIndex].price.toFixed(2)}
          </span>
        )}
      </div>

      <hr />

      <div className="tp-product-details-query-item d-flex align-items-center">
        <span>SKU: </span>
        <p>{sku}</p>
      </div>

      <div className="tp-product-details-query-item d-flex align-items-center">
        <span>Size: </span>
        <p>{variants[activeIndex]?.size}</p>
      </div>

      <div className="tp-product-details-query-item d-flex align-items-center">
        <span>Item Left: </span>
        <p>{variants[activeIndex]?.quantity}</p>
      </div>

      {variants?.some((item) => item?.color && item?.color) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
              {variants.map((item, i) => (
                <button
                  onClick={() => setActiveIndex(i)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === variants[activeIndex]?.img ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={`${item.color}`}
                    style={{ backgroundColor: `${item.color}` }}
                  ></span>
                  {item.color && (
                    <span className="tp-color-variation-tootltip">
                      {item.color}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <hr />

      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Quantity</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <ProductQuantity />
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            Buy Now
          </button>
        </Link>
      </div>

      {detailsBottom && <DetailsBottomInfo sku={sku} />}
    </div>
  );
};

export default DetailsWrapper;
