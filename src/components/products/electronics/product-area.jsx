import React from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import Link from "next/link";

const ProductArea = () => {
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductTypeQuery({
    query: `topSellers=true`,
  });

  let content = null;

  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;
    content = product_items.map((prd, i) => (
      <div key={i} className="col-xl-3 col-lg-3 col-sm-6">
        <ProductItem product={prd} />
      </div>
    ));
  }

  return (
    <section className="tp-product-area pb-55 mt-50">
      <div className="container">
        <div className="row align-items-end">
          <div
            className="tp-section-title-wrapper mb-40"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3 className="tp-section-title">সেরা পণ্য</h3>
            <Link href="/shop">
              <button className="btn btn-primary">View All</button>
            </Link>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
