import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import { useParams } from "react-router-dom";
import { RES_MENU } from "../utils/constant";
import { FOOD_IMG } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCatAccordian from "./ResCatAccordian";

const RestaurantMenu = () => {
  const dummy = "dummy data";
  const { resid } = useParams();
  const resinfo = useRestaurantMenu(resid);
  const [showIndex, setshowIndex] = useState(null);
  const [error, setError] = useState(null);

  if (resinfo === null) {
    return <ShimmerUi />;
  }

  if (error) {
    return <div className="error-container">Error loading menu: {error}</div>;
  }

  console.log("Menu data structure:", resinfo);

  // Try to find restaurant info in different possible locations
  let cardInfo = null;
  let cardsArray = null;

  // Check different possible structures
  const cards = resinfo?.data?.cards || [];

  // Look for restaurant info
  for (let i = 0; i < cards.length; i++) {
    if (cards[i]?.card?.card?.info) {
      cardInfo = cards[i]?.card?.card?.info;
      console.log(`Found restaurant info at cards[${i}]`);
      break;
    }
  }

  // Look for the menu items
  for (let i = 0; i < cards.length; i++) {
    if (cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
      cardsArray = cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      console.log(`Found menu items at cards[${i}]`);
      break;
    }
  }

  if (!cardInfo) {
    return (
      <div className="error-container">Menu information not available</div>
    );
  }

  const { name, cuisines, costForTwoMessage, avgRatingString } = cardInfo;

  // Get categories
  let categories = [];
  if (cardsArray) {
    categories = cardsArray.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  }

  // Get item cards
  let itemcards = null;
  if (cardsArray && cardsArray.length > 0) {
    // Look through all cards for item cards
    for (let i = 0; i < cardsArray.length; i++) {
      if (
        cardsArray[i]?.card?.card?.itemCards &&
        cardsArray[i]?.card?.card?.itemCards.length > 0
      ) {
        itemcards = cardsArray[i]?.card?.card?.itemCards;
        console.log(`Found item cards at cardsArray[${i}]`);
        break;
      }
    }
  }

  if (!itemcards) {
    return <div className="error-container">Menu items not available</div>;
  }

  return (
    <div className="font-gilroyLight flex-col items-center text-center">
      <ul>
        <div className="menu-head flex border border-gray-800 flex-col items-center justify-center text-lg mx-64 m-2">
          <li className="res-men-head flex items-center font-gilroyBold">
            {name || "Restaurant"}
          </li>
          <li>{cuisines ? cuisines.join(",") : "Various cuisines"}</li>
          <li>{costForTwoMessage || "Cost information unavailable"}</li>
          <li>{avgRatingString || "Rating unavailable"}</li>
        </div>

        <div className="m-6/12">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <ResCatAccordian
                key={category?.card?.card.title || index}
                data={category?.card?.card}
                showItems={index === showIndex ? true : false}
                setshowIndex={() =>
                  setshowIndex(index === showIndex ? null : index)
                }
                dummy={dummy}
              />
            ))
          ) : (
            <div>No categories available</div>
          )}
        </div>

        <div className="menu-items-cont flex flex-col items-center">
          {itemcards.map((item) => (
            <li
              className="Menu-Items flex-col items-center w-[50%]"
              key={item.card.info.id}
            >
              <br></br>
              <h2 className="font-gilroyBold">
                {item.card.info.name} - Rs.
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.price / 100}
              </h2>

              <div className="des-img flex items-center">
                <p>
                  {item.card.info.description || "No description available"}
                </p>
                {item?.card?.info?.imageId && (
                  <img
                    className="food-image w-28"
                    src={FOOD_IMG + item.card.info.imageId}
                    alt={item.card.info.name}
                  />
                )}
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
