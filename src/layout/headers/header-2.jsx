import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import { openCartMini } from "@/redux/features/cartSlice";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import { CartTwo, Menu, Search } from "@/svg";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import OffCanvas from "@/components/common/off-canvas";

const HeaderTwo = ({ style_2 = false }) => {
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <div
          className={`tp-header-area tp-header-style-${
            style_2 ? "primary" : "darkRed"
          } tp-header-height`}
        >
          <div
            id="header-sticky"
            className={`tp-header-bottom-2 tp-header-sticky ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6">
                    <div className="logo">
                      <Link
                        href="/"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={"/assets/img/logo/logo.png"}
                          alt="logo"
                          width={500}
                          height={500}
                          style={{ maxWidth: "20%", height: "auto" }}
                        />
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            marginLeft: "10px",
                            marginTop: "15px",
                            color: "black",
                          }}
                        >
                          Ladies Sign
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-5 d-none d-xl-block">
                    <div className="main-menu menu-style-2">
                      <nav
                        style={{ marginLeft: "20px" }}
                        className=" tp-main-menu-content"
                      >
                        <Menus />
                      </nav>
                    </div>
                  </div>

                  <div className="col-xl-5 col-lg-7 col-md-7 col-sm-8 col-6">
                    <div className="tp-header-bottom-right d-flex align-items-center justify-content-end pl-30">
                      <div className="tp-header-search-2 d-none d-sm-block">
                        <form onSubmit={handleSubmit}>
                          <input
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            type="text"
                            placeholder="Search for Products..."
                          />
                          <button type="submit">
                            <Search />
                          </button>
                        </form>
                      </div>

                      <div className="tp-header-action d-flex align-items-center ml-30">
                        <div className="tp-header-action-item">
                          <button
                            onClick={() => dispatch(openCartMini())}
                            className="tp-header-action-btn cartmini-open-btn"
                          >
                            <CartTwo />
                            <span className="tp-header-action-badge">
                              {quantity}
                            </span>
                          </button>
                        </div>

                        <div className="tp-header-action-item tp-header-hamburger mr-20 d-xl-none">
                          <button
                            onClick={() => setIsCanvasOpen(true)}
                            type="button"
                            className="tp-offcanvas-open-btn"
                          >
                            <Menu />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <CartMiniSidebar />
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="fashion"
      />
    </>
  );
};

export default HeaderTwo;
