import { useDispatch } from "react-redux";
import { FOOD_IMG } from "../utils/constant";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items,dummy }) => {
//   console.log(items);
console.log(dummy)
const dispatch = useDispatch();
const handleClick = (item) =>{
  //dispatch an action 
  dispatch(addItem(item))
  // on clicking add item redux will ccreate a payload and export it to and the reducer will add this item to array using action . payload like action:payload : "pizza"
}
  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id}>
          <div className="text-left flex ">
            <span className="font-gilroyMedium px-2">
              {item.card.info.name}
            </span>
            <span>
              {"   Rs."}
              {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
            </span>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-left py-4">
              {item.card.info.description}
            </p>
            <div className="w-80 p-5 h-44">
              <img
                className="w-28"
                src={FOOD_IMG + item.card.info.imageId}
                alt="img"
              ></img>
              <button className="bg-green-200 w-16 relative bottom-8"
              onClick={()=>handleClick(item)}>
                Add
                
              </button>
            </div>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};
export default ItemList;
