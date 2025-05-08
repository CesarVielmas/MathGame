import { View, Text, StyleSheet, ImageBackground, Alert, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import ProgressBar from '../../../../../components/ui/ProgressBar';
import Enemy from '../../../../../components/ui/Enemy';
import GameLogic from '../../../../../components/ui/GameLogic';
import Player from '../../../../../components/ui/Player';
import { useFonts } from 'expo-font';

const bgImage = require('../../../../../assets/images/bgBattle.png');

//operation type = ["suma","resta","multiplicacion","division"]
export default function Battle() {
  const { levels,operation,idMap } = useLocalSearchParams();
  const levelComplete = JSON.parse(levels); 
  const [operationType, setOperationType] = useState(operation);
  const [lifesPlayer, setLifesPlayer] = useState(levelComplete.dificulty === "easy"?7:levelComplete.dificulty === "medium"?5:3);
  const [lifesEnemy, setLifesEnemy] = useState(levelComplete.dificulty === "easy"?10:levelComplete.dificulty === "medium"?15:25);
  const [totalQuestions, setTotalQuestions] = useState(levelComplete.dificulty === "easy"?10:levelComplete.dificulty === "medium"?15:25);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [modalGameOver, setModalGameOverVisible] = useState(false);
  const [modalTutorial, setModalTutorialVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [fontsLoaded] = useFonts({
      'Poppins-Bold': require('../../../../../assets/fonts/Poppins/Poppins-Bold.ttf'),
      'Poppins-Regular': require('../../../../../assets/fonts/Poppins/Poppins-Regular.ttf')
  });

  const progress = questionsAnswered / totalQuestions;
  const progressMoneyGained = () => {

  }
  useEffect(() => {
    const resetMoney = async (cuantity)=>{
      const cuantityMoney = await AsyncStorage.getItem('money');
      if(cuantityMoney !== null)
        await AsyncStorage.setItem('money',`${parseInt(cuantityMoney) + cuantity}`);
      else
        await AsyncStorage.setItem('money',`${cuantity}`);
    }
    const resetStars = async (stars)=>{
      const cuantityStars = await AsyncStorage.getItem('stars');
      if(cuantityStars !== null)
        await AsyncStorage.setItem('stars',`${parseInt(cuantityStars) + stars}`);
      else
        await AsyncStorage.setItem('stars',`${stars}`);
    }
    if (progress >= 1) {
      setModalGameOverVisible(!modalGameOver);
      if(levelComplete.dificulty === "easy"){
          resetMoney(50);
          
      }
      else if(levelComplete.dificulty === "medium"){
        resetMoney(80);
      }
      else{
        resetMoney(110);
      }
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode='stretch' style={styles.bgImage}>
        {
          !operationType ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          ) : (
            <>
              <View style={styles.containerPBar}>
                <ProgressBar progress={progress} />
              </View>
              <View style={styles.charactersContainer}>
                <Player lifes={lifesPlayer} lifesComplete={levelComplete.dificulty === "easy"?7:levelComplete.dificulty === "medium"?5:3} />
                <Enemy lifes={lifesEnemy} lifesComplete={levelComplete.dificulty === "easy"?10:levelComplete.dificulty === "medium"?15:25} />
              </View>
            </>
          )
        }
      </ImageBackground>

      {
        operationType && (
          <View style={styles.questionsContainer}>
            <GameLogic
              operationType={operationType}
              totalQuestions={totalQuestions}
              questionsAnswered={questionsAnswered}
              setQuestionsAnswered={setQuestionsAnswered}
              setLifesPlayer={setLifesPlayer}
              setLifesEnemy={setLifesEnemy}
              isGameStarted={!modalTutorial}
              lifesPlayer={lifesPlayer}
              onGameOver={() => setModalGameOverVisible(true)}
              dificultyGame={levelComplete.dificulty}
              setTimeElapsed={setTimeElapsed}
              setCorrectAnswer={setCorrectAnswer}
            />
          </View>
        )
      }

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalTutorial}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Preparate para la batalla..</Text>
            <YoutubePlayer
              height={200}
              width={300} // agrega esto
              play={false}
              videoId={'oexd_Dfic_Q'}
            />
            <Pressable style={[styles.button, styles.buttonCloseModal]} onPress={() => {
              setModalTutorialVisible(!modalTutorial)
              setIsGameStarted(true);
            }}>
              <Text style={styles.textButtonModal}>Estoy listo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalGameOver}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>El juego ha terminado! Has ganado 0 monedas</Text>
            <Pressable style={[styles.button, styles.buttonCloseModal]} onPress={() => { router.push(`/(main)/levels/map/${parseInt(idMap)}`) }}>
              <Text style={styles.textButtonModal}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
    height:'100%',
    width:'100%'
  },
  containerPBar: {},
  charactersContainer: {
    height:'100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent:'center'
  },
  questionsContainer: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: "1%",
    backgroundColor: 'white',
    fontFamily:'Poppins-Bold',
    borderRadius: "5vw",
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: "1vh"
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginTop:'3%',
    width:'50%',
    borderRadius: "2vw",
    padding: "1vw",
  },
  modalText: {
    marginBottom: "5%",
    textAlign: 'center',
    fontFamily:'Poppins-Bold',
    fontSize:"3vh"
  },
  buttonCloseModal: {
    backgroundColor: '#007AFF',
    padding: "2.5vw"
  },
  textButtonModal: {
    textAlign: 'center',
    color: '#fff',
    fontFamily:'Poppins-Regular',
    fontSize:"2vh"
  }
});
