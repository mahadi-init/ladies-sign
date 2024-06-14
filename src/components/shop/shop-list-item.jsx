import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";

const ShopListItem = ({ product }) => {
  const { _id, name, price, discount, description, variants } = product || {};
  const dispatch = useDispatch();

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  return (
    <div className="tp-product-list-item d-md-flex">
      <div className="tp-product-list-thumb p-relative fix">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={variants[0].img}
            alt="product img"
            width={350}
            height={310}
          />
        </Link>
        {/* <!-- product action --> */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button
              type="button"
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product))}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-list-content">
        <div className="tp-product-content-2 pt-15">
          <h3 className="tp-product-title-2">
            <Link href={`/product-details/${_id}`}>{name}</Link>
          </h3>
          <div className="tp-product-price-wrapper-2">
            {discount > 0 ? (
              <>
                <span className="tp-product-price-2 new-price">
                  ৳{variants[0]?.price}
                </span>
                <span className="tp-product-price-2 old-price">
                  {" "}
                  ৳
                  {(
                    Number(variants[0]?.price) -
                    (Number(variants[0]?.price) * Number(discount)) / 100
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price-2 new-price">
                ৳{variants[0]?.price}
              </span>
            )}
          </div>
          <p>{description.substring(0, 100)}</p>
          <div className="tp-product-list-add-to-cart">
            <button
              onClick={() => handleAddProduct(product)}
              className="tp-product-list-add-to-cart-btn"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopListItem;
