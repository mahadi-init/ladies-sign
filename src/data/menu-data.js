import home_1 from "@assets/img/menu/menu-home-1.jpg";
import home_2 from "@assets/img/menu/menu-home-2.jpg";
import home_3 from "@assets/img/menu/menu-home-3.jpg";
import home_4 from "@assets/img/menu/menu-home-4.jpg";

const menu_data = [
  {
    id: 1,
    homes: true,
    title: "Home",
    link: "/",
    home_pages: [
      {
        img: home_1,
        title: "Electronics",
        link: "/",
      },
      {
        img: home_2,
        title: "Fashion",
        link: "/home-2",
      },
      {
        img: home_3,
        title: "Beauty",
        link: "/home-3",
      },
      {
        img: home_4,
        title: "Jewelry",
        link: "/home-4",
      },
    ],
  },

  {
    id: 2,
    single_link: true,
    title: "Shop",
    link: "/shop",
    sub_menus: [],
  },
  {
    id: 3,
    single_link: true,
    title: "Coupons",
    link: "/coupon",
  },
  {
    id: 4,
    single_link: true,
    title: "Blog",
    link: "/blog",
    sub_menus: [],
  },
  {
    id: 5,
    single_link: true,
    title: "Contact",
    link: "/contact",
  },
];

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    homes: true,
    title: "Home",
    link: "/",
    home_pages: [
      {
        img: home_1,
        title: "Electronics",
        link: "/",
      },
      {
        img: home_2,
        title: "Fashion",
        link: "/home-2",
      },
      {
        img: home_3,
        title: "Beauty",
        link: "/home-3",
      },
      {
        img: home_4,
        title: "Jewelry",
        link: "/home-4",
      },
    ],
  },
  {
    id: 2,
    single_link: true,
    title: "Products",
    link: "/shop",
  },
  {
    id: 3,
    single_link: true,
    title: "eCommerce",
    link: "/cart",
  },
  {
    id: 4,
    single_link: true,
    title: "Login",
    link: "/auth",
  },
  {
    id: 4,
    single_link: true,
    title: "Coupons",
    link: "/coupon",
  },
  {
    id: 5,
    single_link: true,
    title: "Blog",
    link: "/blog",
  },
  {
    id: 6,
    single_link: true,
    title: "Contact",
    link: "/contact",
  },
];
