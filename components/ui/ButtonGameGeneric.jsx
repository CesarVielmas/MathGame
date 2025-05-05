import { StyleSheet,View,Button, TouchableOpacity,Text } from "react-native";
import {useState} from "react";
import { useFonts } from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";

const ButtonGameGeneric = ({colorButton,backgroundButton,textButton,borderRadius, actionClick = ()=>{}}) => {
    const [fontsLoaded] = useFonts({
        'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'), 
        'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
      });
    return(
        <TouchableOpacity style={[styles.styleButton,{backgroundColor:`${backgroundButton}`,borderRadius:`${borderRadius}`}]} onPress={actionClick}>
            <LinearGradient
                colors={['rgba(255,255,255,0.25)', 'transparent']}
                style={styles.insetOverlay}
            />
            <Text style={{fontFamily:'Poppins-Bold',fontSize:'2vh',textAlign:'center',color:`${colorButton}`}}>{textButton}</Text>
        </TouchableOpacity>
    )
    
};
export default ButtonGameGeneric;

const styles = StyleSheet.create({
    styleButton:{
        height:"100%",
        width:"100%",
        justifyContent:'center',
        overflow:'hidden'
    },
    insetOverlay: {
        position: 'absolute',
        top: '85%',
        left: '0%',
        right: 0,
        height:'20%',
        width:'100%',
        borderTopLeftRadius:'200%',
        borderTopRightRadius:'200%',
        backgroundColor: 'transparent',
        transform: [{ rotate: '180deg' }]
    }
})