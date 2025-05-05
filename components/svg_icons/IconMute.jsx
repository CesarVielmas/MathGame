import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const IconMute = ({size,backgroundColor}) => (
    <Svg
    fill={backgroundColor}
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    enableBackground="new 0 0 512 512"
    xmlSpace="preserve">
    <Path d="M159.8,320l64-64l-64-64l85.3-85.3l64,64V0L159.8,149.3H74.4v213.3h85.3L309.1,512V341.3l-64,64L159.8,320z M405.1,192 l-32-32l-64,64l-64-64l-32,32l64,64l-64,64l32,32l64-64l64,64l32-32l-64-64L405.1,192z" />
  </Svg>
);
export default IconMute;
