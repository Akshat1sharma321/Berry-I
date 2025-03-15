import Rescard, { withopen } from "./Rescard";

import { SEARCH_CDN } from "../utils/constant";
import { useContext, useState } from "react";
import { useEffect } from "react";
import ShimmerUi from "./ShimmerUi";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "./UserContext";

const Body = () => {
  const status = useOnlineStatus();
  if (status === false) {
    return <h1>You are offline. Please check your internet connection.</h1>;
  }
  const { loggedInUser, setuserInfo } = useContext(UserContext);
  // const arr = useState(resobj);
  const arr = useState([]);
  const [listOfRestaurants, setlistOfRestaurants] = arr;
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const RescardOpened = withopen(Rescard);
  useEffect(() => {
    fetchData();
  }, []);
  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const json = await data.json();
  //   // console.log(json);

  //   setlistOfRestaurants(
  //     json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  //   setFilteredData(
  //     json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  // };
  //   {console.log("Body Rendered",listOfRestaurants)};

  // if (listOfRestaurants.length === 0) {
  //   return <ShimmerUi />;
  // }

  const fetchData = async () => {
    try {
      // Use an environment variable or detect the environment
      const API_URL =
        process.env.NODE_ENV === "production"
          ? "/api/restaurants"
          : "http://localhost:3001/api/restaurants";

      const data = await fetch(API_URL);
      const json = await data.json();

      setlistOfRestaurants(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredData(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  return (
    <div className="body">
      <div className="search flex bg-blue-100 border-2 border-black rounded-full p-2 m-2 mx-9 justify-between">
        <input
          type="text"
          className="searchb w-[50%] bg-blue-100"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="imagge"
          onClick={() => {
            // console.log(searchText);
            const filteredData = listOfRestaurants.filter((res) =>
              res.info.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            );
            setFilteredData(filteredData);
          }}
        >
          <img className="w-5" src={SEARCH_CDN}></img>
        </button>
      </div>
      <div className="filter flex justify-between ">
        <input
          className="filter-btn p-2 border-2 border-black rounded-full  mx-8  h-12 m-2 bg-pink-100 font-gilroyLight"
          placeholder="   User Name"
          value={loggedInUser}
          onChange={(e) => setuserInfo(e.target.value)}
        />

        <button
          className="filter-btn p-2 border-2 border-black rounded-full bg-pink-100 font-gilroyLight m-2 mx-9"
          onClick={() => {
            const filteredResData = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            // console.log(filteredData);
            setFilteredData(filteredResData);
          }}
        >
          Filter
        </button>
      </div>
      <div className="res-container font-gilroyLight  flex flex-wrap p-2 m-2 justify-center gap-4">
        {/* <Rescard resData={resobj[0]} />
        <Rescard resData={resobj[1]} />
        */}
        {filteredData.map((restaurant) => (
          <Link
            to={"restaurant/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {
              /* here we have to write some logic for udsing higher order components add a openb label to it  */
              restaurant?.info?.isOpen == true ? (
                <RescardOpened resData={restaurant} />
              ) : (
                <Rescard resData={restaurant} />
              )
            }
            {/* <Rescard resData={restaurant} /> */}
          </Link>
        ))}

        {/* <Rescard
          resName="Ama's Cafe"
          resType="Italian,Continentel,Chinese"
          resRate="4.9"
          resRev="22009"
        />
         */}
      </div>
    </div>
  );
};

export default Body;
