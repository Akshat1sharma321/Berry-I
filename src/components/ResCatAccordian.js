import { useState } from "react";
import ItemList from "./ItemList";

const ResCatAccordian = ({data,showItems,setshowIndex,dummy}) =>{
    // console.log(dummy);
    // console.log(data);
    // const [showItems,setshowItems] = useState(false);
    const [arrow,setarrow] = useState("👆")
    const handleClick = () =>{
        // console.log("clicked")
           setshowIndex()
        arrow === "👆" ? setarrow("👇") : setarrow("👆");
        // setAccordianOpen(!accordianOpen);
    }
    return (
        <div className="bg-slate-50 shadow-lg mx-auto my-5 ">
            <div className="flex-col w-6/12 justify-between ml-96">
               
                <div className="cursor-pointer  flex justify-between py-4" onClick={handleClick}>
                     <span className="font-gilroyBold text-lg  ">{data.title} ({data.itemCards.length})</span>
               <span>{arrow}</span>
                </div>
              {showItems && <ItemList items={data.itemCards} dummy={(dummy)}/>}
                
              
            </div>
            {/* Accordiam Body */}
            
        </div>
    )
}
export default ResCatAccordian;