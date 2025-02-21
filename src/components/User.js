import { useState } from "react";

const User =  () => {
    const [Location] = useState("New Delhi");
    return (
        <div className="abt-c1">
            <h2>Location : {Location}</h2>
            <h2>Name : Akshat Sharma</h2>
            <h2>Aim : SDE in FAANGM</h2>
        </div>
    )
}
export default User;