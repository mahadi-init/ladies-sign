import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
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
      name: prd.name,
      img: variant.img,
      price: variant.price,
      color: variant.color,
    };
    console.log("🚀 ~ handleAddProduct ~ prd:", prd);
    dispatch(add_cart_product(product));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
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

      <div className="tp-product-details-query-item d-flex align-items-center">
        <span>SKU: </span>
        <p>{sku}</p>
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

      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompareProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          Compare
        </button>

        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlistProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          Add Wishlist
        </button>
      </div>

      {detailsBottom && <DetailsBottomInfo sku={sku} />}
    </div>
  );
};

export default DetailsWrapper;
