import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export default function GameLogic({
  operationType,
  questionsAnswered,
  setQuestionsAnswered,
  setLifesPlayer,
  setLifesEnemy,
  isGameStarted,
  lifesPlayer,
  onGameOver,
  dificultyGame,
  setTimeElapsed,
  setCorrectAnswer
}) {
  const [grade, setGrade] = useState("1ero de Primaria");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(dificultyGame === "easy"?30:dificultyGame === "medium"?20:10);
  const inputRef = useRef(null);
  const timerRef = useRef(null); 

  const [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
    });
  // Leer grado
  useEffect(() => {
    const getGrade = async () => {
      const storedGrade = await AsyncStorage.getItem("grade");
      if (storedGrade) setGrade(storedGrade);
    };
    getGrade();
  }, []);

  // Timer inicia cuando empieza el juego
  useEffect(() => {
    if (!isGameStarted) return;
    console.log(timeLeft);
    setTimeLeft(dificultyGame === "easy"?30:dificultyGame === "medium"?20:10);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleIncorrectAnswer();
          setIsAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameStarted, questionsAnswered]);

  // Terminar el juego si las vidas llegan a 0
  useEffect(() => {
    if (lifesPlayer <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      onGameOver();
    }
  }, [lifesPlayer, onGameOver]);

  const generateRandomNumbers = () => {
    let min = 1, max = 9;
    if (dificultyGame === "medium") {
      min = 10;
      max = 99;
    }
    else if(dificultyGame === "hard"){
      min = 100;
      max = 999;
    }

    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;

    if (operationType === "resta" && b > a) [a, b] = [b, a];
    if (operationType === "division") {
      while (b === 0 || a % b !== 0) {
        a = Math.floor(Math.random() * (max - min + 1)) + min;
        b = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }

    setNum1(a);
    setNum2(b);
  };

  const handleCorrectAnswer = () => {
    // Removed unused 'setScore' call
    setQuestionsAnswered((prev) => prev + 1);
    setLifesEnemy((prev) => prev - 1);
  };

  const handleIncorrectAnswer = () => {
    setQuestionsAnswered((prev) => prev + 1);
    setCorrectAnswer(prev => prev + 1)
    setLifesPlayer((prev) => prev - 1);
  };

  const generateQuestion = (operationType) => {
    switch (operationType) {
      case "suma":
        return `${num1} + ${num2} = ?`;
      case "resta":
        return `${num1} - ${num2} = ?`;
      case "multiplicacion":
        return `${num1} * ${num2} = ?`;
      case "division":
        return `${num1} / ${num2} = ?`;
      default:
        return "Operación no reconocida";
    }
  };

  const checkAnswer = (operationType) => {
    let result = 0;
    switch (operationType) {
      case "suma":
        result = num1 + num2;
        break;
      case "resta":
        result = num1 - num2;
        break;
      case "multiplicacion":
        result = num1 * num2;
        break;
      case "division":
        result = num1 / num2;
        break;
    }

    // Removed unused 'setCorrectAnswer' call

    if (parseInt(userAnswer) === result) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }

    setIsAnswered(true);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, [operationType, grade]);

  useEffect(() => {
    if (isAnswered) {
      setTimeout(() => {
        generateRandomNumbers();
        setUserAnswer("");
        setIsAnswered(false);
        setTimeLeft(dificultyGame === "easy"?30:dificultyGame === "medium"?20:10);
      }, 1000);
    }
  }, [isAnswered]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>⏳ Tiempo: {timeLeft}s</Text>

      <Text style={styles.problem}>{generateQuestion(operationType)}</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Tu respuesta"
      />

      <Pressable
        style={styles.btn}
        onPress={() => {
          inputRef.current?.blur();
          checkAnswer(operationType);
        }}
      >
        <Text style={styles.txtBtn}>Comprobar respuesta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#793A03",
    paddingBottom: "5%",
    height:'100%',
    width:'100%'
  },
  timerText: {
    fontFamily:'Poppins-Bold',
    fontSize: "2.5vh",
    fontWeight: "bold",
    color: "#FED300",
    marginTop:'1%',
    marginBottom:'2%'
  },
  problem: {
    fontFamily:'Poppins-Regular',
    fontSize: "4vh",
    marginBottom: "2%",
    color: "white",
  },
  input: {
    width: "80%",
    height: "6vh",
    backgroundColor: "#fff",
    marginBottom: "5%",
    paddingLeft: "5%",
    color: "#000",
    fontFamily:'Poppins-Regular',
    fontSize:'2vh',
    borderRadius:'5vw',
    color:'#888888'
  },
  btn: {
    backgroundColor: "#FED300",
    borderRadius: "2vw",
    padding:'4%'
  },
  txtBtn: {
    color: "#fff",
    textAlign: "center",
    fontFamily:'Poppins-Bold',
    fontSize:"3.5vh"
  },
});
