import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const IconSettingsGame = ({size,backgroundColor}) => (
    <Svg
    fill={backgroundColor}
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    viewBox="0 0 200 200"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg">
    <Path d="M36.5,75C41,89.5,54,100,70,100s29-10.5,33.5-25H170a10,10,0,0,0,0-20H103.5C99,40.5,86,30,70,30S41,40.5,36.5,55H25a10,10,0,0,0,0,20ZM70,50A15,15,0,1,1,55,65,14.73,14.73,0,0,1,70,50Zm105,75H163.5C159,110.5,146,100,130,100s-29,10.5-33.5,25H30a10,10,0,0,0,0,20H96.5c4.5,14.5,17.5,25,33.5,25s29-10.5,33.5-25H175a10,10,0,0,0,0-20Zm-45,25a15,15,0,1,1,15-15A14.73,14.73,0,0,1,130,150Z" />
  </Svg>
);
export default IconSettingsGame;
