import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import { useParams } from "react-router";
import { RES_MENU } from "../utils/constant";
import { FOOD_IMG } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCatAccordian from "./ResCatAccordian";

const RestaurantMenu = () => {
  const dummy = "dummy data";
  const { resid } = useParams();
  //   console.log(resid);
  const resinfo = useRestaurantMenu(resid);
  const [showIndex,setshowIndex]=useState(null);
  // const [resinfo, setresinfo] = useState(null);
  // useEffect(() => {
  //   resmenu();
  // }, []);
  // const resmenu = async () => {
  //   const data = await fetch(RES_MENU + resid);

  //   const json = await data.json();

  // console.log(resinfo);
  //   setresinfo(json);
  // };

  if (resinfo === null) {
    return <ShimmerUi />;
  }
  const { name, cuisines, costForTwoMessage, avgRatingString } =
    resinfo?.data?.cards[2]?.card?.card?.info;

  const itemcards =
    resinfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards;
  //   console.log(itemcards);
  //   const itemCards =
  //     resinfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
  //       ?.itemCards;

  const imageId = itemcards?.card?.info?.imageId;

  const categories =
    resinfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);
  // console.log("Image ID:", imageId);

  return (
    <div className="font-gilroyLight flex-col items-center text-center">
      <ul>
        {/* {console.log(itemcards)} */}
        <div className="menu-head flex  border border-gray-800 flex-col  items-center justify-center text-lg mx-64 m-2">
          <li className="res-men-head flex items-center font-gilroyBold">
            {name}
          </li>
          <li>{cuisines.join(",")}</li>
          <li>{costForTwoMessage}</li>
          <li>{avgRatingString}</li>
        </div>
        {/* here we need a accordian  we will loop oveer the the categories and then we will make  */}
        {/* Right now the power to collapse the accordian is with the itemlist but to make one open at a time we will give this power atao parent which is res menu */}
        <div className="m-6/12 ">
        {/* controlled componenet */}
          {categories.map((category,index) => (
            <ResCatAccordian
              key={category?.card?.card.title}
              data={category?.card?.card}
              showItems={index === showIndex ? true : false}
              setshowIndex={()=>setshowIndex(index === showIndex ? null : index)}
              dummy={(dummy)}
              
            />
          ))}
        </div>
        <div className="menu-items-cont flex flex-col items-center  ">
          {itemcards.map((item) => (
            <li
              className="Menu-Items  flex-col items-center w-[50%] "
              key={item.card.info.id}
            >
              <br></br>
              <h2 className="font-gilroyBold">
                {item.card.info.name} - Rs.
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.price / 100}
              </h2>

              <div className="des-img flex items-center">
                {" "}
                <p> {item.card.info.description}</p>
                {console.log(item?.card?.info?.imageId)}
                <img
                  className="food-image w-28"
                  src={FOOD_IMG + item.card.info.imageId}
                ></img>
              </div>
              <hr />
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
export default RestaurantMenu;
