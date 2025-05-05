import { useFonts } from "expo-font";
import { useRef,useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View,ImageBackground,Image,Animated, Easing  } from "react-native";

const HeaderLevels = ({percentageStars = '55%',cuantityStars = 1,cuantityMoney=1000}) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1, 2 , 3, 4],
        outputRange: ['-5deg', '10deg','-10deg','15deg','-5deg'],
      });      
    const [fontsLoaded] = useFonts({
        'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'), 
        'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
      });
      useEffect(() => {
        const animate = () => {
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.timing(rotateAnim, {
              toValue: 2,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.timing(rotateAnim, {
              toValue: 3,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.timing(rotateAnim, {
              toValue: 4,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.delay(2000), 
            Animated.timing(rotateAnim, {
              toValue: 0, 
              duration: 0,
              useNativeDriver: true,
            }),
          ]).start(() => {
            animate(); 
          });
        };
      
        animate();
      }, []);
      
      
    return(
    <LinearGradient
          colors={['#66a7ff', '#147aff']} 
          start={{ x: 0.5, y: 0 }} 
          end={{ x: 0.5, y: 0.1 }}   
          style={styles.containerHeader}>
        <View style={styles.flexContentHaveUser}>
            <View style={{position:'relative',flex:1,height:'100%',width:'40%',marginLeft:'5%'}}>
                <Animated.View style={{flex:1,position:'absolute',height:'100%',width:'40%',left:'1%',zIndex:1,justifyContent:'center',transform:[{ rotate }]}}>
                    <ImageBackground 
                        source={require("../../assets/images/star_levels.webp")} 
                        style={{flex:1,justifyContent:'center'}} 
                        imageStyle={{height:'100%',width:'100%'}} 
                        resizeMode='stretch'>
                        <Text style={{textAlign:'center',fontFamily:'FontNumbers',fontSize:'2.7vh',color:'white'}}>{cuantityStars}</Text>
                    </ImageBackground>
                </Animated.View>
                <View style={{height:"55%",width:'90%',backgroundColor:'#147aff',borderRadius:'5vw',borderWidth:'1vw',borderColor:'#9ef4fe',marginLeft:'10%',marginTop:'11%'}}>
                    <View style={{height:'100%',width:`${percentageStars}`,backgroundColor:'#9ef4fe',borderRadius:'10vw'}}>

                    </View>
                </View>
            </View>
            <View style={{position:'relative',flex:1,height:'100%',width:'40%',marginLeft:'5%'}}>
                <Animated.View style={{position:'absolute',height:'85%',width:'40%',zIndex:1,left:'0',top:'10%',transform:[{ rotate }]}}>
                    <Image source={require("../../assets/images/coins_levels.png")} style={{height:'100%',width:'100%'}} resizeMode='stretch' />
                </Animated.View>
                <View  style={{height:"55%",width:'80%',backgroundColor:'#147aff',borderRadius:'5vw',borderWidth:'1vw',borderColor:'#9ef4fe',marginLeft:'10%',marginTop:'9%',justifyContent:'center'}}>
                    <Text style={{textAlign:'center',fontFamily:'FontNumbers',fontSize:'3vh',color:'white',paddingLeft:'20%'}}>{cuantityMoney}</Text>
                </View>
            </View>
        </View>
        <View style={styles.figureHeaderBackground} />
        <View style={[styles.figureHeaderBackground,{left:'73%',transform: [{ skewX: "-40deg" }]}]} />
    </LinearGradient>
    )
};
export default HeaderLevels;

const styles = StyleSheet.create({
    containerHeader:{
        width:'100%',
        height:'20%',
        borderBottomLeftRadius:'35%',
        borderBottomRightRadius:'35%'
    },
    figureHeaderBackground:{
        position:'absolute',
        top:'70%',
        width:'35%',
        height:'50%',
        left:'-10%',
        backgroundColor:'#9ef4fe',
        borderRadius:'2vw',
        transform: [{ skewX: "40deg" }],
    },
    flexContentHaveUser:{
        display:'flex',
        width:'100%',
        height:'50%',
        flexDirection:'row',
        marginTop:'4%'
    }
})
