import { useFonts } from "expo-font";
import { StyleSheet,View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect } from "react";

const FooterLevels = ({children}) => {
  const [fontsLoaded] = useFonts({
    'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'),
    'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
  });

  return (
    <LinearGradient
      colors={['#66a7ff', '#147aff']} 
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 0.1 }}   
      style={styles.containerFooter}>
        <View style={styles.containerFlexButtons}>
          {children}
        </View>
    </LinearGradient>
  );
};

export default FooterLevels;

const styles = StyleSheet.create({
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '12%',
    borderTopLeftRadius:'7vw',
    borderTopRightRadius:'7vw',
  },
  containerFlexButtons:{
    display:'flex',
    height:'100%',
    width:'100%',
    flexDirection:'row'
  }
});
