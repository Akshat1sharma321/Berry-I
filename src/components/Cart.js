import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart =()=>{
    const cartItems = useSelector((store)=>store.cart.items)
    const dispatch= useDispatch();
    const handleclearcart = ()=>{
       dispatch(clearCart())
    }
return (
  <div className="text-center  p-5 m-5">
    <h1 className="font-gilroyMedium text-2xl">hello</h1>
    <div className="w-6/12 m-auto">
      <button className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight" onClick={handleclearcart}>
        Clear Cart
      </button>
      {cartItems.length===0 && <h1>Your Cart is Empty please add somrthing 😊😊</h1>}
      <ItemList items={cartItems} />
    </div>
  </div>
);
};
export default Cart;