import * as React from "react";
import Svg, { Path } from "react-native-svg";
const IconCharacterChange = ({size,backgroundColor}) => (
  <Svg
    width={`${size * 0.5}vw`}
    height={`${size * 0.55}vw`}
    fill={backgroundColor}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg">
    <Path d="M329 807q-4-18-1.5-36t12.5-33q-57-15-104-51-9-7-12-19t2-23q24-53 75-119 28-37 56-66-53-24-79.5-75.5T263 276t57-93.5T423.5 146 527 182.5t57 93.5-14.5 108.5T490 460q41 45 77 94h95v-37q0-25 13-46t35-32.5 46.5-9.5 44.5 17l15 11q2-17 2-33l-1-21h1q-6-103-61-189-53-85-140-134-90-51-193-51h-1q-103 0-193 51-87 49-141 133-54 87-60 190h1l-1 21q0 76 28.5 146.5T138 696t122 87q33 15 69 24zm635-110H425q-13-3-21.5-13t-8.5-23v-2q0-15 10.5-25.5T431 623h299V517q0-12 10.5-17.5T761 501l216 159q5 4 7 10.5t-.5 12.5-8 10-11.5 4zm20 104v2q0 15-10.5 25.5T948 839H649v106q0 12-10.5 17.5T618 961L403 802q-6-4-7.5-10.5t.5-12.5 7.5-10 11.5-4h539q13 3 21.5 13t8.5 23z" />
  </Svg>
);
export default IconCharacterChange;
