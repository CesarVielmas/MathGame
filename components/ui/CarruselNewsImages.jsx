import { StyleSheet,View,Text,ImageBackground,Animated,Easing,TouchableOpacity  } from "react-native";
import {useState,useRef} from "react";
import { useFonts } from 'expo-font';
import { useLanguage } from "../../constants/translations";
import IconLeftArrow from "../svg_icons/IconLeftArrow";
import IconButtonSvg from "./IconButtonSvg";
import IconRightArrow from "../svg_icons/IconRightArrow";

const CarruselNewsImages = ({arrayObjectsSwitch}) => {
    const {t} = useLanguage();
    const [indexArrayInformation, setIndexArrayInformation] = useState(0);
    const [fontsLoaded] = useFonts({
        'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'), 
        'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
      });
      const opacityAnim = useRef(new Animated.Value(1)).current;
      const translateAnim = useRef(new Animated.Value(0)).current;
      const animateTransition = (direction) => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
              toValue: direction === 'left' ? 50 : -50,
              duration: 300,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
              toValue: 0,
              duration: 300,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      };
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
          animateTransition('left');
          setIndexArrayInformation(indexArrayInformation + 1);
      };
      
      const goToPrev = () => {
          console.log("Animacion Iniciada Prev")
          animateTransition('right');
          setIndexArrayInformation(indexArrayInformation - 1);
      };
         
    return(
        <Animated.View style={[styles.principalContainer,{opacity:opacityAnim,transform:[{translateX:translateAnim}]}]}>
            {indexArrayInformation - 1 >= 0 && (
                <TouchableOpacity  style={styles.arrowLeftContainer}>
                    <IconButtonSvg SvgChildIcon={IconLeftArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{ animationFunctionInformation(a); goToPrev();}}}/>
                </TouchableOpacity>
            )}
            <View style={styles.containerCenterFlex}>
                <ImageBackground style={styles.contentCenter} source={arrayObjectsSwitch[indexArrayInformation].sourceImageNew} resizeMode="stretch">
                {arrayObjectsSwitch.length > 1 && (
                        <View style={styles.footerPointsCarrusel}>
                            {arrayObjectsSwitch.map((_, index) => (
                               <View key={index} style={styles.footerPointStyle}>
                                    <View style={{height:'100%',width:`${arrayObjectsSwitch.length * 10}%`,borderRadius:'50%',backgroundColor:'#a6a8bf',opacity:`${index === indexArrayInformation?1:0.35}`,marginLeft:'auto',marginRight:'auto'}}></View>
                               </View>
                            ))}
                        </View>
                )}
                </ImageBackground>
                <View style={styles.contentCenterText} >
                    <Text style={styles.textTopStyle}>
                        <Text style={{color:`${arrayObjectsSwitch[indexArrayInformation].typeNew === 0? "#57ab5a": arrayObjectsSwitch[indexArrayInformation].typeNew === 1? "#ffab7b": "#88c3ef"}`}}>{`${arrayObjectsSwitch[indexArrayInformation].typeNew === 0?t("listApartsTittle_two_new_type_one"):arrayObjectsSwitch[indexArrayInformation].typeNew === 1?t("listApartsTittle_two_new_type_two"):t("listApartsTittle_two_new_type_three")}  `}</Text>
                        <Text style={{fontFamily:'Poppins-Regular',color:`#9e9e9e`}}>{`${arrayObjectsSwitch[indexArrayInformation].timeNew}`}</Text>
                    </Text>
                    <Text style={styles.textCenterStyle} ellipsizeMode="clip">
                        {arrayObjectsSwitch[indexArrayInformation].tittleNew}
                    </Text>
                    <View style={styles.iconTextStyle}>
                        <IconButtonSvg SvgChildIcon={IconRightArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"#ababab"}  sizeIcon={8} sizeButton={8} />
                    </View>
                </View>
            </View>

            {indexArrayInformation + 1 < arrayObjectsSwitch.length && (
                <TouchableOpacity  style={styles.arrowRightContainer}>
                    <IconButtonSvg SvgChildIcon={IconRightArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{ animationFunctionInformation(a); goToNext();}}}/>
                </TouchableOpacity >
            )}
        </Animated.View>
    )
    
};
export default CarruselNewsImages;

const styles = StyleSheet.create({
    principalContainer:{
        position:'relative',
        height:'60%',
        width:'90%',
        overflow:'hidden',
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'black',
        borderRadius:'2vw',
        shadowColor: '#a6a8bf',
        shadowOffset: { width: 0, height: '1.5vw' },
        shadowOpacity: 0.5,
        shadowRadius: '0vw',
        backgroundColor: '#a6a8bf',
    },
    arrowLeftContainer:{
        position:'absolute',
        textAlign:'center',
        justifyContent:'center',
        height:'auto',
        width:'auto',
        left:'2%',
        top:'30%',
        opacity:0.7,
        zIndex:1,
    },
    containerCenterFlex:{
        display:'flex',
        height:'100%',
        width:'100%',
        flexDirection:'column'
    },
    contentCenter:{
        flex:4,
        height:'100%',
        width:'100%'
    },
    contentCenterText:{
        position:'relative',
        flex:1.5,
        backgroundColor:'white'
    },  
    arrowRightContainer:{
        position:'absolute',
        textAlign:'center',
        height:'auto',
        width:'auto',
        left:'80.5%',
        top:'30%',
        justifyContent:'center',
        opacity:0.7,
        zIndex:1
    },
    footerPointsCarrusel:{
        display:'flex',
        width:'95%',
        height:'15%',
        marginTop:'auto',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:'2%',
        flexDirection:'row'
    },
    footerPointStyle:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    textTopStyle:{
        position:'absolute',
        fontFamily:'Poppins-Bold',
        fontSize:'1.3vh',
        left:'5%',
        top:'1%'
    },
    textCenterStyle:{
        fontFamily:'Poppins-Bold',
        width:'90%',
        marginTop:'1.5vh',
        fontSize:'1.3vh',
        padding:'1.2vh',
        
    },
    iconTextStyle:{
        position:'absolute',
        left:'91%',
        top:'50%'
    }
})