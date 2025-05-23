import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";
const IconInformationPrincipalView = ({size,backgroundColor}) => (
    <Svg
    fill={backgroundColor}
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    viewBox="0 0 15 15"
    id="information"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      id="rect8399"
      d="M7.5,1&#xA;&#x9;C6.7,1,6,1.7,6,2.5S6.7,4,7.5,4S9,3.3,9,2.5S8.3,1,7.5,1z M4,5v1c0,0,2,0,2,2v2c0,2-2,2-2,2v1h7v-1c0,0-2,0-2-2V6c0-0.5-0.5-1-1-1H4&#xA;&#x9;z"
    />
  </Svg>
);
export default IconInformationPrincipalView;
