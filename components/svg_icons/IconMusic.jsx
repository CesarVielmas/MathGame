import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const IconMusic = ({size,backgroundColor}) => (
  <Svg
    fill={backgroundColor}
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <Circle
      cx={6}
      cy={18}
      r={3}
      fill={backgroundColor}
      stroke={backgroundColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Circle
      cx={18}
      cy={17}
      r={3}
      fill={backgroundColor}
      stroke={backgroundColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path fill={backgroundColor} d="M21 3 9 6v4l12-3V3z" />
    <Path
      stroke={backgroundColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 18v-8m12 7V7M9 10V6l12-3v4M9 10l12-3"
    />
  </Svg>
);
export default IconMusic;
