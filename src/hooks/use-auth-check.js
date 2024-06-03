import { userLoggedIn } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = Cookies.get("userInfo");

    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          }),
        );
      }
    }

    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
