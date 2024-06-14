import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";

const ProductItem = ({ product, style_2 = false }) => {
  const { _id, name, discount, status } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  return (
    <div className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`}>
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={variants[0]?.img}
            alt="product img"
            width={284}
            height={302}
          />
        </Link>
        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  View Cart
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add to Cart
                </span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-2 pt-15">
        <div className="tp-product-price-wrapper-2">
          {discount > 0 ? (
            <>
              <span className="tp-product-price-2 new-price">
                ৳{variants[0].price.toFixed(2)}{" "}
              </span>
              <span className="tp-product-price-2 old-price">
                {" "}
                ৳
                {(
                  Number(variants[0].price) -
                  (Number(variants[0].price) * Number(discount)) / 100
                ).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="tp-product-price-2 new-price">
              ৳{variants[0].price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
