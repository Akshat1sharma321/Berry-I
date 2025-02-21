import { IMG_CDN } from "../utils/constant";
const Rescard = (props) => {
  const { resData } = props;
  // const {resName,resType,resRate,resRev} = props ;
  // earlier we wrote it as props.name but now we dont need that //
  const {
    cuisines,
    cloudinaryImageId,
    slaString,
    avgRating,
    totalRatingsString,
    name,
    locality,
    areaName,
  } = resData?.info;
  // console.log(cloudinaryImageId);
  // console.log(resData);
  return (
    <div className="res-card w-[250px]  p-2 bg-slate-200
     hover:border-2 border-black m-2 h-[400px]">
      <img src={IMG_CDN + cloudinaryImageId} className="w-[250px] h-[150px] rounded-lg imgo"></img>

      <h3 className="font-gilroyMedium">{name}</h3>
      <h5>{cuisines?.join(" , ") || "Cuisines not available"}</h5>
      <h6>
        {resData.info.locality} , {resData.info.areaName}
      </h6>
      <h6>{slaString}</h6>
      <h6>{resData.info.avgRating} Rating</h6>
      <h6>{totalRatingsString}+ reviews</h6>
    </div>
  );
};

// Creating as higher order component 
//input as rescard
//output rescard opnened
export const withopen =(Rescard) =>{
  return(props)=>{
    return (
      <div className="relative">
        <label className="absolute m-1 px-5 py-2 bg-green-500 rounded-full text-aliceblue left-[6%] -bottom-[-1%]">
          Opened
        </label>
        <Rescard {...props} />
      </div>
    );
  };
};

export default Rescard;

