import { StyleSheet, Text, View,ImageBackground,Animated,TouchableOpacity, Image, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import LevelSquare from "../../../../components/ui/LevelSquare";
import IconRightArrow from "../../../../components/svg_icons/IconRightArrow";
import IconLeftArrow from "../../../../components/svg_icons/IconLeftArrow";
import IconButtonSvg from "../../../../components/ui/IconButtonSvg";
import IconReturn from "../../../../components/svg_icons/IconReturn";

const SelectedMapLevels = () => {
    const levelsMapsExample = [
        {
          idMap: 0,
          cuantityLevels: Array.from({ length: 31 }, (_, i) => ({
            text: (i + 1).toString(),
            isBlocked: i !== 0,
            starsComplete: i !== 0 ? 0 : 1 
          }))
        },
        {
          idMap: 1,
          cuantityLevels: Array.from({ length: 31 }, (_, i) => ({
            text: (i + 1).toString(),
            isBlocked: i !== 0,
            starsComplete:
              i === 0 ? 1 :
              i === 1 ? 2 :
              i === 2 ? 3 :
              0 
          }))
        }
      ];
    const router = useRouter();
    const { idMap } = useLocalSearchParams();
    const [levelsMaps,setLevelsMaps] = useState(levelsMapsExample);
    const [limitedLevels,setLimitedLevels] = useState(0)

    const styleChangeAnimationInformation = (animation) => {
        return {
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.85], 
              }),
            },
          ],
        };
      };
    const animationFunctionInformation = (a) =>{
        Animated.sequence([
          Animated.timing(a, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(a, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      };
    const goToNext = () => {
      console.log("Animacion Iniciada Next")
      setLimitedLevels(limitedLevels + 12);
     };
  
    const goToPrev = () => {
      console.log("Animacion Iniciada Prev")
      setLimitedLevels(limitedLevels - 12);
     };
    return(
        <ImageBackground style={styles.containerMap} source={require("../../../../assets/images/background_level_selection.png")} resizeMode='stretch'>
            {limitedLevels - 12 >= 0 && (
                <TouchableOpacity  style={styles.arrowLeftContainer}>
                    <IconButtonSvg SvgChildIcon={IconLeftArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{ animationFunctionInformation(a); goToPrev();}}}/>
                </TouchableOpacity>
            )}
            <View style={styles.containerLevels}>
            {levelsMaps.find(map => map.idMap === parseInt(idMap))?.cuantityLevels.map((level, index) =>{
                if(index >= limitedLevels && index <= limitedLevels + 11){
                    return(
                        <View style={{height:'12%',width:'30%',marginLeft:'2%',marginTop:'15%'}}>
                            <LevelSquare nameLevel={level.text} isBlocked={level.isBlocked} starsComplete={level.starsComplete} />
                        </View>
                        )    
                }
            })}
            </View>
            {limitedLevels + 12 < levelsMaps.find(map => map.idMap === parseInt(idMap))?.cuantityLevels.length && (
                <TouchableOpacity  style={styles.arrowRightContainer}>
                    <IconButtonSvg SvgChildIcon={IconRightArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{ animationFunctionInformation(a); goToNext();}}}/>
                </TouchableOpacity >
            )}
            <TouchableOpacity  style={styles.exitContainer}>
                    <IconButtonSvg SvgChildIcon={IconReturn} backgroundButton={"#084d0a"} borderRadiusButton={"50%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={30} animationOptions={{styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{ animationFunctionInformation(a);router.push("/(main)/levels")}}}/>
            </TouchableOpacity >
        </ImageBackground>
    )
};
export default SelectedMapLevels;
const styles = StyleSheet.create({
    containerMap:{
        width:'100%',
        height:'100%',
        overflow:'hidden'
    },
    containerLevels:{
        display:'flex',
        height:'85%',
        width:'80%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'35%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },
    arrowLeftContainer:{
        position:'absolute',
        textAlign:'center',
        justifyContent:'center',
        height:'auto',
        width:'auto',
        left:'0',
        top:'48%',
        opacity:1,
        zIndex:1,
    },
    arrowRightContainer:{
        position:'absolute',
        textAlign:'center',
        height:'auto',
        width:'auto',
        left:'90%',
        top:'48%',
        justifyContent:'center',
        opacity:1,
        zIndex:1
    },
    exitContainer:{
        position:'absolute',
        textAlign:'center',
        height:'auto',
        width:'auto',
        left:'3%',
        top:'90%',
        justifyContent:'center',
        opacity:1,
        zIndex:1
    }
})