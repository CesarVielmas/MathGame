import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import ProgressBarLife from "./ProgressBarLife";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Imágenes estáticas
const characterImages = {
  "c1.png": require('../../assets/images/character_1.png'),
  "c2.png": require('../../assets/images/character_2.png'),
  "c3.png": require('../../assets/images/character_3.png'),
  "c4.png": require('../../assets/images/character_4.png'),
  "c5.png": require('../../assets/images/character_5.png'),
  "c6.png": require('../../assets/images/character_6.png'),
  "c7.png": require('../../assets/images/character_7.png'),
  "c8.png": require('../../assets/images/character_8.png'),
  "c9.png": require('../../assets/images/character_9.png'),
};

export default function Player({ lifes,lifesComplete }) {
  const [characterFile, setCharacterFile] = useState(null);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const savedCharacter = await AsyncStorage.getItem('character');
        if (savedCharacter && characterImages[savedCharacter]) {
          setCharacterFile(savedCharacter);
        } else {
          setCharacterFile('c1.png');
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadCharacter();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBarLife progress={lifes / lifesComplete} />
      {characterFile && (
        <Animated.Image
          source={characterImages[characterFile]}
          style={[styles.character, { transform: [{ translateY: bounceAnim }] }]}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  character: {
    width: 100,
    height: 150,
  },
});
