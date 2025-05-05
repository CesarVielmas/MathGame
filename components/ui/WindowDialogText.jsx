import { StyleSheet, View, Text,ImageBackground,Image,Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useRef,useEffect,useState,useMemo } from 'react';
import IconButtonSvg from './IconButtonSvg';
import IconExitDialogText from '../svg_icons/IconExitDialogText';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const WindowDialogText = ({styleOptionsDialog = {},tittleText = "",listTextInformation=[],optionalImageOptions={},functionExit}) => {
    //Variables
    const [fontsLoaded] = useFonts({
        'Poppins-Black': require('../../assets/fonts/Poppins/Poppins-Black.ttf'), 
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    });
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const styleChangeTittleText = useMemo(() => {
            if (Object.keys(styleOptionsDialog).length > 0) {
                return {width:`${parseInt(styleOptionsDialog.width.split("%")[0]) - 15}%`,top:`${parseInt(styleOptionsDialog.top.split("%")[0]) - 8}%`, left:`${parseInt(styleOptionsDialog.left.split("%")[0]) + 7.5}%`,borderRadius:styleOptionsDialog.borderRadius,borderWidth:styleOptionsDialog.borderWidth,borderColor:styleOptionsDialog.borderColor,backgroundColor:styleOptionsDialog.borderColor};
            }
            return {};
    }, [styleOptionsDialog]);
    const styleChangeAnimationExit = (a) => {
        return {
          transform: [
            {},
          ],
        };
      };
    //Functions
    const animationFunctionExit = (a) =>{
        functionExit();    
    };
    //Loading
    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 0.95,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
      }, [scaleAnim]);    
    return(
        <View style={styles.absoluteContainer}>
            <Animated.View style={[styles.baseTittleTextStyle,styleChangeTittleText,{transform: [{ scale: scaleAnim }]}]}>
                <Text style={styles.tittleTextStyle}>{tittleText}</Text>
            </Animated.View>
            <AnimatedImageBackground source={require('../../assets/images/background_dialog_text.png')} resizeMode="stretch" style={[styles.baseWindowStyle,styleOptionsDialog,{transform: [{ scale: scaleAnim }]}]} imageStyle={{height:'100%',width:'100%'}}>
            <View style={styles.exitButtonStyle}>
                <IconButtonSvg SvgChildIcon={IconExitDialogText} backgroundButton={"#b11616"} borderRadiusButton={"50%"} colorIcon={"white"} sizeIcon={13} sizeButton={23} animationOptions={{styleChange: styleChangeAnimationExit , functionAnimation: animationFunctionExit}}/>
            </View>
                {
                    listTextInformation.map((text, index) => {
                        if(Object.keys(optionalImageOptions).length > 0){
                            if(optionalImageOptions.position === index){
                                return(
                                    <>
                                        <Image key={index+1} source={optionalImageOptions.sourceImage} resizeMode='stretch' style={optionalImageOptions.styleImage} />
                                        <Text key={index} style={styles.informationTextStyle}>
                                            {text}
                                        </Text>
                                    </>
                                )
                            }
                            else{
                                return(
                                    <Text key={index} style={styles.informationTextStyle}>
                                        {text}
                                    </Text>
                                )
                            }
                        }
                        else{
                            return(
                                <Text key={index} style={styles.informationTextStyle}>
                                    {text}
                                </Text>
                            )
                        }
                    })
                }
            </AnimatedImageBackground>
        </View>
    )

};
const styles = StyleSheet.create({
    absoluteContainer:{
        position:'absolute',
        top:0,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.65)',
    },
    baseTittleTextStyle:{
        position:'absolute',
        top:'17%',
        left:'12.5%',
        width:'75%',
        height:'10%',
        backgroundColor:'#c48f31',
        borderRadius:'3.5vw',
        alignItems:'center',
        justifyContent:'center',
        zIndex:1
    },
    tittleTextStyle:{
        color:'#044f30',
        textAlign:'center',
        fontSize: '8.5vw',
        fontFamily:'Poppins-Black',
        textShadowColor: 'white', 
        textShadowOffset: { width: '0.2vw', height: '0.3vw' }, 
        textShadowRadius: 1, 
    },
    informationTextStyle:{
        color:'#ffffff',
        textAlign:'center',
        fontSize: '3.5vw',
        fontFamily:'Poppins-Regular',
        marginTop:'1.5vw',
        paddingLeft:'4vw',
        paddingRight:'4vw'
    }, 
    exitButtonStyle:{
        position:'absolute',
        top:'-7vw',
        left:'96%',
    },  
    baseWindowStyle:{
        position:'relative',
        top:'25%',
        left:'5%',
        width:'90%',
        height:'40%',
        borderRadius:'3.5vw',
        borderColor: '#c48f31',  
        borderWidth: '5vw',          
    }
}) 
export default WindowDialogText;
