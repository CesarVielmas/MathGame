import { StyleSheet, TouchableOpacity,Image,Animated,Easing} from 'react-native';
import { useRef,useEffect } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export default function CenterIconCircle({ onPressIcon, imageSource, size,margin,backgroundColor}) {
    //Variables
    const scaleAnim  = useRef(new Animated.Value(1)).current; 
    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.25,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          })
        ])
      );
  
      animation.start();
      return () => animation.stop(); 
    }, []);
    //Functions
    
    //Loading
    
    return (
        <AnimatedTouchable style={[styles.button,{height:`${size}vw`,width:`${size}vw`,backgroundColor:backgroundColor,marginTop:`${margin.top}`,marginLeft:`${margin.left}`,marginRight:`${margin.right}`,marginBottom:`${margin.bottom}`,transform: [{ scale: scaleAnim  }]}]} onPress={onPressIcon}>
            <Image source={imageSource} style={[styles.image, { width: `${size * 0.5}vw`, height: `${size * 0.55}vw` }]} />
        </AnimatedTouchable>
    )
}

const styles = StyleSheet.create({
  button: {
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    paddingLeft:'2.5vw',
    borderRadius:'60%',
  },
  image:{
    resizeMode:'contain'
  }
});
