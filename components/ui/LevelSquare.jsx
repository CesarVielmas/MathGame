import { StyleSheet, TouchableOpacity,Image,Text,Animated,Easing,View} from 'react-native';
import { useRef,useEffect,useState,useMemo  } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const LevelSquare = ({nameLevel,isBlocked,starsComplete = 0}) => {
    const [fontsLoaded] = useFonts({
            'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'), 
            'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
            'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
            'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
          });
    return(
        <View style={styles.containerSquare} >
            <LinearGradient
                colors={['rgba(255,255,255,0.25)', 'transparent']}
                style={[styles.insetOverlay,{backgroundColor:"#0d560f"}]}
            />
            {isBlocked && (
                <TouchableOpacity style={{position:'absolute',height:'100%',width:'100%',backgroundColor:'black',opacity:0.5,justifyContent:'center',zIndex:1}}>
                    <Image source={require("../../assets/images/game_lock.png")} style={{height:'65%',width:'70%',marginLeft:'auto',marginRight:'auto',marginTop:'-20%'}} resizeMode='stretch' />
                </TouchableOpacity>
            )}
            <Text style={styles.textLevel} >{nameLevel}</Text>
            <View style={styles.containerStars}>
            {Array.from({ length: 3 }, (_, index) => (
                <Image
                key={index}
                source={
                    index < starsComplete
                    ? require('../../assets/images/star_levels.webp')
                    : require('../../assets/images/star_levels_empty.webp')
                }
                style={styles.starIcon}
                resizeMode='stretch'
                />
            ))}
            </View>

        </View>
    )
};
export default LevelSquare;
const styles = StyleSheet.create({
    containerSquare:{
        position:'relative',
        width:'100%',
        height:'100%',
        borderRadius:'3vw',
        backgroundColor:'#5fd161',
        overflow:'hidden'
    },
    insetOverlay: {
        position: 'absolute',
        top: '80%',
        left: '-5%',
        right: 0,
        height:'23%',
        width:'110%',
        transform: [{ rotate: '180deg' }],
        shadowOffset: { width: 0, height: '0.4vw' },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex:1
    },
    textLevel:{
        position:'static',
        width:'100%',
        fontSize:'4vh',
        textAlign:'center',
        fontFamily: 'FontNumbers',
        color:'white',
        marginTop:'-7%'
    },
    containerStars: {
        position: 'absolute',
        top: '43%',
        width: '95%',
        height:'30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        paddingLeft:'4%'
    },
      
    starIcon: {
        width: '28%',
        height: '100%',
        marginHorizontal: 2,
        justifyContent:'center'
    }
})