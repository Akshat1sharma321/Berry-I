import { useEffect, useState } from "react";
import { RES_MENU } from "./constant";

const useRestaurantMenu = (resid) => {
  const [resinfo, setresinfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    resmenu();
  }, []);

  const resmenu = async () => {
    try {
      console.log("Fetching menu from:", RES_MENU + resid);
      const data = await fetch(RES_MENU + resid);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      console.log("Menu API response:", json);
      setresinfo(json);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
      setError(error.message);
    }
  };

  return resinfo;
};

export default useRestaurantMenu;
