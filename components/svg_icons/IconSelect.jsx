import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconSelect = ({size,backgroundColor}) => (
  <Svg
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill={backgroundColor}
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    viewBox="0 0 32 32"
    xmlSpace="preserve">
    <Path
      className="bentblocks_een"
      d="M16,4C9.373,4,4,9.373,4,16c0,6.627,5.373,12,12,12s12-5.373,12-12C28,9.373,22.627,4,16,4z M16,26 c-5.514,0-10-4.486-10-10c0-5.514,4.486-10,10-10s10,4.486,10,10C26,21.514,21.514,26,16,26z M23.429,12.172l-9.777,9.777 l-5.08-5.08l1.414-1.414l3.666,3.666l8.363-8.363L23.429,12.172z"
    />
  </Svg>
);
export default IconSelect;
