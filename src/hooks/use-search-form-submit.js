import { useRouter } from "next/router";
import { useState } from "react";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (searchText) {
      let route = `/search?searchText=${searchText}`;

      if (category && category !== "Select Category") {
        route += `&productType=${category}`;
        setCategory("");
      }

      await router.push(route, null, { scroll: false });
      setSearchText("");
    } else {
      await router.push(`/`, null, { scroll: false });
      setSearchText("");
      setCategory("");
    }
  };

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
