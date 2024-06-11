import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {
  const { _id, name, variants, description, discount, status } = product || {};

  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  const getPrice = () => {
    if (!variants) {
      return;
    }

    let totalPrice = 0;
    let avgPrice = 0;

    variants.map((item) => {
      totalPrice += item.price;
    });

    avgPrice = totalPrice / variants.length;

    return avgPrice;
  };

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <>
      <div
        className={`${
          offer_style ? "tp-product-offer-item" : "mb-25"
        } tp-product-item transition-3`}
      >
        <div className="tp-product-thumb p-relative fix">
          <Link href={`/product-details/${_id}`}>
            <Image
              src={variants[0].img}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="product-electronic"
            />

            <div className="tp-product-badge">
              {status === "OUT-OF-STOCK" && (
                <span className="product-hot">out-stock</span>
              )}
            </div>
          </Link>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
              <button
                type="button"
                className={`tp-product-action-btn ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === "out-of-stock"}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        <div className="tp-product-content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="tp-product-title mb-10">
              <Link href={`/product-details/${_id}`}>{name}</Link>
            </h3>
            <h3 className="tp-product-title mb-10" style={{ color: "gray" }}>
              <Link href={`/product-details/${_id}`}>
                {variants.length === 0
                  ? "(Single variant)"
                  : `(${variants.length} variants)`}
              </Link>
            </h3>
          </div>
          <div className="tp-product-category">
            {description.substring(0, 150)}...
          </div>
          {/* <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
          </div> */}

          <div
            className="d-flex"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="tp-product-price-wrapper mt-2">
              {discount > 0 ? (
                <>
                  <span className="tp-product-price old-price">
                    ৳{variants[0].price}
                  </span>
                  <span className="tp-product-price new-price">
                    {" "}
                    ৳
                    {(
                      Number(variants[0].price) -
                      (Number(variants[0].price) * Number(discount)) / 100
                    ).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="tp-product-price new-price">
                  ৳{parseFloat(variants[0].price).toFixed(2)}
                </span>
              )}
            </div>

            <div
              className="tp-product-category"
              style={{
                color: "white",
                fontWeight: "sky",
                padding: "5px",
                background: "green",
                borderRadius: "5px",
              }}
            >
              {status}
            </div>
          </div>
          {/* {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerDate?.endDate) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
