import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import { useGetActiveCategoryQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const HeaderCategory = ({ isCategoryActive, categoryType = "electronics" }) => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetActiveCategoryQuery(categoryType);
  const router = useRouter();

  console.table(categories);

  // handle category route
  const handleCategoryRoute = (name, route) => {
    if (route === "name") {
      router.push(
        `/shop?category=${name
          .toLowerCase()
          .replace("&", "")
          .split(" ")
          .join("-")}`,
      );
    } else {
      router.push(
        `/shop?subCategory=${name
          .toLowerCase()
          .replace("&", "")
          .split(" ")
          .join("-")}`,
      );
    }
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.data?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.data?.length > 0) {
    const category_items = categories.data;
    content = category_items.map((item) => (
      <li className="has-dropdown" key={item._id}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.name, "name")}
        >
          {item.img && (
            <span>
              <Image src={item.img} alt="cate img" width={50} height={50} />
            </span>
          )}
          {item.name}
        </a>

        {item.children && (
          <ul className="tp-submenu">
            {item.children.map((child, i) => (
              <li
                key={i}
                onClick={() => handleCategoryRoute(child, "children")}
              >
                <a className="cursor-pointer">{child}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }
  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;
