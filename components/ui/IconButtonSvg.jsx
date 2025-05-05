import { StyleSheet, TouchableOpacity,Image,Animated,Easing} from 'react-native';
import { useRef,useEffect,useState,useMemo  } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const IconButtonSvg = ({SvgChildIcon,backgroundButton,borderRadiusButton,colorIcon,sizeIcon,sizeButton,animationOptions = {}}) => {
    //Variables
    const [animationIcon, setAnimationIcon] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;
    const baseStyleButton = {
        justifyContent: 'center',
        alignItems: 'center',
        height: `${sizeButton * 0.55}vw`,
        width: `${sizeButton * 0.55}vw`,
        backgroundColor: backgroundButton,
        borderRadius: borderRadiusButton
    };
    const animatedStyle = useMemo(() => {
        if (animationIcon && Object.keys(animationOptions).length > 0) {
          return animationOptions.styleChange(animation);
        }
        return {};
      }, [animationIcon, animation, animationOptions]);

    if(animationOptions && Object.keys(animationOptions).length > 0){
        return(
            <AnimatedTouchable
            style={[baseStyleButton,animatedStyle]}
            onPress={() => {
                animationOptions.functionAnimation(animation);
            }}>
                <SvgChildIcon size = {sizeIcon} backgroundColor = {colorIcon}/>
          </AnimatedTouchable>
        )
    }  
    else{
        return(
            <TouchableOpacity style={[baseStyleButton]}>
                <SvgChildIcon size = {sizeIcon} backgroundColor = {colorIcon}/>
            </TouchableOpacity>
        )
    }
};
export default IconButtonSvg;
