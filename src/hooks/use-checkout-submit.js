import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import {
  useCreatePaymentIntentMutation,
  useSaveOrderMutation,
} from "@/redux/features/order/orderApi";
import { notifySuccess } from "@/utils/toast";

const useCheckoutSubmit = () => {
  const [saveOrder, {}] = useSaveOrderMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const shippingCost = 120;

  //set
  useEffect(() => {
    setValue("name", shipping_info.name);
    setValue("address", shipping_info.address);
    setValue("phone", shipping_info.phone);
    setValue("note", shipping_info.note);
  }, [user, setValue, shipping_info, router]);

  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    Cookies.set("customer_phone", data.phone);
    setIsCheckoutSubmit(true);

    let cart = [];

    {
      cart_products.map((item) =>
        cart.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.orderQuantity,
          // img: item.thumbnail,
        }),
      );
    }

    let orderInfo = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      status: "PENDING",
      cart: cart,
      subTotal: total,
      shippingCost: shippingCost,
      total: total + shippingCost,
      note: data.note,
    };

    const res = await saveOrder(orderInfo);

    if (res.data.success) {
      localStorage.removeItem("cart_products");
      setIsCheckoutSubmit(false);
      notifySuccess("Your Order Confirmed!");
      router.push(`/order/${res.data?.data?._id}`);
    }
  };

  return {
    total,
    shippingCost,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    submitHandler,
    handleSubmit,
    isCheckoutSubmit,
  };
};

export default useCheckoutSubmit;
