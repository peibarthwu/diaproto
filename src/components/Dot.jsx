import { useState, useEffect, useRef } from "react";

const Dot = (props) => {
    const obj = props.object;
    console.log(obj)

    const x = obj.lat;
    const y = obj.long;
    const getScreenCoordinates = (
        lat,
        long,
      ) => {
        const latRange = 180;
        const longRange = 360;
    
        let scaledLat = lat + 90;
        let scaledLong = long + 180;
    
        let y = Math.round((scaledLat / latRange) * window.innerHeight);
        let x = Math.round((scaledLong / longRange) * window.innerWidth);

        return { x: x, y: y };
    };

    return(
        <div className={`w-[20px] h-[20px] rounded-full bg-[#959BA2] fixed left-[${getScreenCoordinates(x,y).x}px] top-[${getScreenCoordinates(x,y).y}px]`}
        style={{top: `${getScreenCoordinates(x,y).y}px`, left: `${getScreenCoordinates(x,y).x}px`}}></div>
    )
}
export default Dot;
