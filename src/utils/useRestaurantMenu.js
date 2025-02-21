import { useEffect, useState } from "react";
import { RES_MENU } from "./constant";

const useRestaurantMenu = (resid) => {
  const [resinfo, setresinfo] = useState(null);
  useEffect(() => {
    resmenu();
  }, []);
 const resmenu=async()=>{
    const data = await fetch(RES_MENU+resid);
    const json = await data.json();
    setresinfo(json);
  }
  return resinfo;
};
export default useRestaurantMenu;
