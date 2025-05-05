import { StyleSheet, View, Text,ImageBackground,Image,Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useRef,useEffect,useState,useMemo } from 'react';
import IconExitDialogText from '../svg_icons/IconExitDialogText';
import IconButtonSvg from './IconButtonSvg';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const WindowDialogApart = ({children,listAparts=[],styleOptionsDialog = {},elementSelect = 0,backgroundInactiveApart = "",functionExit}) => {
    //Variables
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [fontsLoaded] = useFonts({
        'Poppins-Black': require('../../assets/fonts/Poppins/Poppins-Black.ttf'), 
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    });
    const styleChangeTittleText = useMemo(() => {
        if (Object.keys(styleOptionsDialog).length > 0) {
            return {width:`${parseInt(styleOptionsDialog.width.split("%")[0]) - (listAparts.length === 1?15:10)}%`,top:`${parseInt(styleOptionsDialog.top.split("%")[0]) - 7.2}%`, left:`${parseInt(styleOptionsDialog.left.split("%")[0]) + 7.5}%`};
        }
        return {};
    }, [styleOptionsDialog]);
    const listStylesAparts = useMemo(() => {
        if(listAparts.length > 0){
            switch (listAparts.length) {
                case 1:
                    return {fontSize: `${parseInt(styleOptionsDialog.width.split('%')[0]) * 0.10625}vw`}
                    break;
            
                case 2:
                    return {fontSize: `${parseInt(styleOptionsDialog.width.split('%')[0]) * 0.07}vw`,margin:'1.3vw'}
                    break;

                case 3:
                    return {fontSize: `${parseInt(styleOptionsDialog.width.split('%')[0]) * 0.05}vw`,margin:'1.3vw'}
                    break;

                case 4:
                    return {fontSize: `${parseInt(styleOptionsDialog.width.split('%')[0]) * 0.0375}vw`,margin:'1.3vw'}
                    break;
            }
        }
    },[styleChangeTittleText]);
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
            <Animated.View style={[styles.baseApartsContainerStyle,styleChangeTittleText,{transform: [{ scale: scaleAnim }]}]}>
                {
                    listAparts.map(({tittle,functionContentChange}, index) => {
                        return(
                            <View key={index} style={{height:'100%',flex:1,justifyContent:'center',alignItems:'center',alignContent:'center',margin:listStylesAparts.margin,backgroundColor:`${elementSelect === index?styleOptionsDialog.borderColor:backgroundInactiveApart}`,borderRadius:styleOptionsDialog.borderRadius}} onTouchStart={functionContentChange}>
                                <Text key={index} style={[styles.baseApartStyle,{fontSize:listStylesAparts.fontSize}]}>{tittle}</Text>
                            </View>
                            )
                    })
                }
            </Animated.View>
            <AnimatedImageBackground source={require('../../assets/images/background_dialog_text.png')} resizeMode="stretch" style={[styles.baseWindowStyle,styleOptionsDialog,{transform: [{ scale: scaleAnim }]}]} imageStyle={{height:'100%',width:'100%'}}>
            <View style={styles.exitButtonStyle}>
                <IconButtonSvg SvgChildIcon={IconExitDialogText} backgroundButton={"#b11616"} borderRadiusButton={"50%"} colorIcon={"white"} sizeIcon={13} sizeButton={23} animationOptions={{styleChange: styleChangeAnimationExit , functionAnimation: animationFunctionExit}}/>
            </View>
            {children}
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
        backgroundColor:'rgba(0,0,0,0.65)'
    },
    baseApartsContainerStyle:{
        position:'absolute',
        display:'flex',
        top:'17%',
        left:'10%',
        width:'80%',
        height:'9%',
        flexDirection: 'row',     
        justifyContent: 'center', 
        alignItems: 'center',     
        zIndex:0
    },
    baseApartStyle:{
        color:'#044f30',
        textAlign:'center',
        fontFamily:'Poppins-Black',
        textShadowColor: 'white', 
        textShadowOffset: { width: '0.2vw', height: '0.3vw' }, 
        textShadowRadius: 1
    },
    exitButtonStyle:{
        position:'absolute',
        top:'-7vw',
        left:'96%',
        zIndex:2
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
export default WindowDialogApart;
