import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const IconSound = ({size,backgroundColor}) => (
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
    <Path d="M426.7,256c0-71-43.4-131.8-105-157.5l-16.4,39.4C351.5,157.2,384,202.8,384,256c0,53.3-32.5,98.8-78.8,118.1l16.4,39.4 C383.3,387.8,426.7,327,426.7,256z M341.3,256c0-35.5-21.7-65.9-52.5-78.7l-16.4,39.4c15.4,6.4,26.2,21.6,26.2,39.4 c0,17.7-10.8,32.9-26.2,39.4l16.4,39.4C319.6,321.9,341.3,291.5,341.3,256z M354.5,19.7L338,59.1C415.1,91.2,469.3,167.2,469.3,256 c0,88.7-54.2,164.8-131.3,196.9l16.4,39.4C447,453.7,512,362.5,512,256C512,149.5,447,58.3,354.5,19.7z M0,149.3v213.3h85.3 L234.7,512V0L85.3,149.3H0z" />
  </Svg>
);
export default IconSound;
