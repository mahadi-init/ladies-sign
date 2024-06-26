import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ErrorMsg from "@/components/common/error-msg";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import SEO from "@/components/seo";
import ShopArea from "@/components/shop/shop-area";
import Footer from "@/layout/footers/footer";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { useEffect, useState } from "react";

const ShopPage = ({ query }) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };

  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  }

  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  if (!isLoading && !isError && products?.data?.length > 0) {
    let product_items = products.data;

    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = products.data;
      } else if (selectValue === "Low to High") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = products.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "IN-STOCK") {
        product_items = products.data.filter((p) => p.discount > 0);
      } else {
        product_items = products.data;
      }
    }

    product_items = product_items.filter(
      (p) => p.price >= priceValue[0] && p.price <= priceValue[1],
    );

    if (query.status) {
      if (query.status === "ON-SALE") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (query.status === "IN-STOCK") {
        product_items = product_items.filter((p) => p.status === "IN-STOCK");
      }
    }

    // // category filter
    // if (query.category) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.category.name
    //         .toLowerCase()
    //         .replace("&", "")
    //         .split(" ")
    //         .join("-") === query.category,
    //   );
    // }

    // // category filter
    // if (query.subCategory) {
    //   let products = [];

    //   product_items = product_items.map((p) => {
    //     p.children.map((child) => {
    //       if (child === query.subCategory) {
    //         products.push(p);
    //       }
    //     });
    //   });

    //   product_items = products;
    // }

    // color filter
    if (query.color) {
      product_items = product_items.filter((product) => {
        for (let i = 0; i < product.variants.length; i++) {
          const color = product.variants[i]?.color;
          if (
            color &&
            color?.toLowerCase().replace("&", "").split(" ").join("-") ===
              query.color
          ) {
            return true; // match found, include product in result
          }
        }
        return false; // no match found, exclude product from result
      });
    }

    // // brand filter
    // if (query.brand) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.brand.name.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.brand,
    //   );
    // }

    content = (
      <>
        {/* <ShopArea
          all_products={products.data}
          products={product_items}
          otherProps={otherProps}
        />
        <ShopFilterOffCanvas
          all_products={products.data}
          otherProps={otherProps}
        /> */}
      </>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop Grid" subtitle="Shop Grid" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
