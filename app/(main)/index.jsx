import { StyleSheet,Text,Dimensions,ImageBackground,View,Image,Animated, PanResponder, TouchableOpacity,TextInput} from 'react-native';
import { useEffect,useState,useRef } from 'react';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';
import { useLanguage } from '../../constants/translations';
import { useRouter } from 'expo-router';
import CenterIconCircle from '../../components/ui/CenterIconCircle';
import IconBackgroundTittlePrincipalView from '../../components/svg_icons/IconBackgroundTittlePrincipalView';
import IconButtonSvg from '../../components/ui/IconButtonSvg';
import FooterBarPrincipalView from '../../components/ui/FooterBarPrincipalView';
import IconSettingsPrincipalView from '../../components/svg_icons/IconSettingsPrincipalView';
import IconInformationPrincipalView from '../../components/svg_icons/IconInformationPrincipalView';
import WindowDialogText from '../../components/ui/WindowDialogText';
import IconMusic from '../../components/svg_icons/IconMusic';
import IconGoogle from '../../components/svg_icons/IconGoogle';
import IconSettingsGame from '../../components/svg_icons/IconSettingsGame';
import IconAcountPrincipal from '../../components/svg_icons/IconAcountPrincipal';
import WindowDialogApart from '../../components/ui/WindowDialogAparts';
import IconSound from '../../components/svg_icons/IconSound';
import IconMute from '../../components/svg_icons/IconMute';
import IconMusicMute from '../../components/svg_icons/IconMusicMute';
import CarruselNewsImages from '../../components/ui/CarruselNewsImages';
import ButtonGameGeneric from '../../components/ui/ButtonGameGeneric';
import IconSelect from '../../components/svg_icons/IconSelect';
import IconTranslate from '../../components/svg_icons/IconTranslate';
import IconEdit from '../../components/svg_icons/IconEdit';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

export default function PrincipalViewGame() {
  const {t,language, changeLanguage } = useLanguage();
  const router = useRouter();
  let objectNews = [{
    tittleNew: t("listApartsTittle_two_new_one_tittle"),
    timeNew: t("listApartsTittle_two_new_one_time"),
    typeNew:0,
    sourceImageNew:require("../../assets/images/notice_example_1.jpg"),
    optionalbuttonRedirectNew:t("listApartsTittle_two_new_one_optionalButton_one"),
    optionalButtonRedirectUrlNew:{text: t("listApartsTittle_two_new_one_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
  },
  {
    tittleNew: t("listApartsTittle_two_new_two_tittle"),
    timeNew: t("listApartsTittle_two_new_two_time"),
    typeNew:2,
    sourceImageNew:require("../../assets/images/notice_example_2.webp"),
    optionalbuttonRedirectNew: t("listApartsTittle_two_new_two_optionalButton_one"),
    optionalButtonRedirectUrlNew:{text: t("listApartsTittle_two_new_two_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
  },
  {
    tittleNew:t("listApartsTittle_two_new_three_tittle"),
    timeNew:t("listApartsTittle_two_new_three_time"),
    typeNew:1,
    sourceImageNew:require("../../assets/images/notice_example_3.png"),
    optionalbuttonRedirectNew:t("listApartsTittle_two_new_three_optionalButton_one"),
    optionalButtonRedirectUrlNew:{text:t("listApartsTittle_two_new_three_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
  }]
  //Variables
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [openConfigurationDialog, setOpenConfigurationDialog] = useState(false);
  const [openSecondDialog,setOpenSecondDialog] = useState({state:false,type:0});
  const [profilePhoto,setProfilePhoto] = useState(1);
  const [profileName,setProfileName] = useState("Cesar Vielmas");
  const [iconsSettings,setIconsSettings] = useState([]);
  const [configurationDialogVar, setConfigurationDialogVar] = useState(0);
  const [settingsVariables,setSettingsVariables] = useState({ music:100, sound:100})
  const [newsGame,setNewsGame] = useState(objectNews)
  const [musicBackground,setMusicBackground] = useState(null)
  const musicBackgroundRef = useRef(null);
  const [openAcountDialog, setOpenAcountDialog] = useState(false);
  const [expandido, setExpandido] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textInScreen, setTextInScreen] = useState([]);
  const [fontsLoaded] = useFonts({
    'FontNumbers': require('../../assets/fonts/Numbers_Operations_Font.ttf'), 
    'FontTittleGame': require('../../assets/fonts/Tittle_Game_Font.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf')
  });
  let interval = null;
  const numberOfText = 20;
  const maxTextOnScreen = 20;
  const soundObject = new Audio.Sound();
  const alturaAnimada = useRef(new Animated.Value(0)).current;
  const listAparts = 
  [
    {
      tittle: t("listApartsTittle_one"),
      functionContentChange : ()=>{setConfigurationDialogVar(0);}
    },
    {
      tittle: t("listApartsTittle_two"),
      functionContentChange : ()=>{setConfigurationDialogVar(1);}
    },
  ]
  const styleChangeAnimationSettings = (animation) => {
    return {
      transform: [
        {
          rotate: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          }),
        },
      ],
    };
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
  const styleDialogDevInfo = {
      top:'25%',
      left:'5%',
      width:'90%',
      height:'40%',
      borderRadius:'3.5vw',
      borderColor: '#c48f31',  
      borderWidth: '5vw',
  }
  const styleSettingsDialogInfo = {
    top:'25%',
    left:'5%',
    width:'90%',
    height:'60%',
    borderRadius:'3.5vw',
    borderColor: '#c48f31',  
    borderWidth: '5vw',
  }
  const styleSettingsDialogAccount = {
    top:'25%',
    left:'5%',
    width:'90%',
    height:'50%',
    borderRadius:'3.5vw',
    borderColor: '#c48f31',  
    borderWidth: '5vw',
  }
  const stylesSecondDialogEditImage = {
    top:'40%',
    left:'10%',
    width:'80%',
    height:'40%',
    borderRadius:'3.5vw',
    borderColor: '#c48f31',  
    borderWidth: '5vw',
  }
  const stylesSecondDialogEditName = {
    top:'40%',
    left:'10%',
    width:'80%',
    height:'30%',
    borderRadius:'3.5vw',
    borderColor: '#c48f31',  
    borderWidth: '5vw',
  }
  const stylesSecondDialogAcceptDelete = {
    top:'40%',
    left:'10%',
    width:'80%',
    height:'25%',
    borderRadius:'3.5vw',
    borderColor: '#c48f31',  
    borderWidth: '5vw',
  }
  const imageDialogDevInfo = {
    sourceImage: require('../../assets/images/faculty_logo.png'),
    position: 0,
    styleImage:{
      height:'65%',
      width: '50%',
      marginTop:'2%',
      marginLeft:'auto',
      marginRight:'auto',
      itemsAlign:'center',
      justifyContent:'center',
    }
  }
  const imagesAvatarProfile = [{source:require("../../assets/images/profile_photo_default_1.png")},{source:require("../../assets/images/profile_photo_default_2.png")},{source:require("../../assets/images/profile_photo_default_3.png")},{source:require("../../assets/images/profile_photo_default_4.jpg")}]
  //Functions
  const functionActiveMusic = async () =>{
    const currentSound = musicBackgroundRef.current;
    if (currentSound === null) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/musics/background_music.mp3'),
        {
          isLooping: true
        }
      );
      let musicVolume = 0;
      setSettingsVariables((prevSettingsVariables)=>{
        musicVolume = prevSettingsVariables.music;
        return prevSettingsVariables;
      });
      await sound.setVolumeAsync(musicVolume * 0.01);
      await sound.playAsync();
      setIconsSettings((prev) => {
        const updated = [...prev];
        updated[0].props.SvgChildIcon = IconMusic;
        return updated;
      });
      setMusicBackground(sound); 
      console.log("Activo la musica")
    } else {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setIconsSettings((prev) => {
        const updated = [...prev];
        updated[0].props.SvgChildIcon = IconMusicMute;
        return updated;
      });
      setMusicBackground(null);
      console.log("Desactivo musica")
    }
  }
  const iconsSettingsBase = [
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconMusicMute,backgroundButton : "#1d3475",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 26,sizeButton : 35,animationOptions : {styleChange: styleChangeAnimationInformation , functionAnimation:(a)=>{animationFunctionInformation(a);functionActiveMusic();}} }
    },
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconGoogle,backgroundButton : "#ffffff",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 35,animationOptions : {styleChange: styleChangeAnimationInformation , functionAnimation:(a)=>{animationFunctionInformation(a);/*Function Google Acount*/}} }
    },
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconSettingsGame,backgroundButton : "#000000",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 26,sizeButton : 35,animationOptions : {styleChange: styleChangeAnimationInformation , functionAnimation:(a)=>{animationFunctionInformation(a);setOpenConfigurationDialog(true);}} }
    },
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconAcountPrincipal,backgroundButton : "#515151",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 26,sizeButton : 35,animationOptions : {styleChange: styleChangeAnimationInformation , functionAnimation:(a)=>{animationFunctionInformation(a);setOpenAcountDialog(true);}} }
    }
  ];
  const intervalTextFallingFunction = ()=>{
    setTextInScreen((prevItems) => {
      if (prevItems.length < maxTextOnScreen) {
        addTextFalling();
      }
      return prevItems;
    });
    setTextInScreen((prevItems) =>
      prevItems
        .map((item) => ({
          ...item,
          top: parseInt(item.top.split("px")[0]) + (screenHeight * 0.005) + 'px', 
          orientation: parseInt(item.orientation.split("deg")[0]) + 2 + 'deg', 
        }))
        .filter((item) => parseInt(item.top.split("px")[0]) < (screenHeight + Math.floor(screenHeight * 0.012))) 
    );
  }
  const addTextFalling = () =>{
      const colors = [
        '#ff9090', '#6799e6', '#f043c6', '#f8ff94', '#2bb65c', 
        '#9c1616', '#826723', '#2c2382', '#7c0c0c', '#000000', 
        '#00c9c0', '#49c0bb', '#7649c0'
      ];
      const randomNumber = Math.floor(Math.random() * 13) + 1;
      const randomColor = colors[randomNumber - 1];
      const itemScreen = {
        id:  Math.random().toString(36).substr(2, 9),
        top:`-${Math.floor(screenWidth * 0.28) + Math.floor(Math.random() * (screenWidth * 6))}px`,
        text: randomNumber < 10 ? `${randomNumber}`: randomNumber === 10 ? '+' : randomNumber === 11 ? '-' : randomNumber === 12? '%': 'x',
        color: randomColor,
        left: Math.floor(Math.random() * 90) + 'vw',
        orientation: Math.floor(Math.random() * 360) + 'deg'
      };
      setTextInScreen((prevTextInScreen) => [...prevTextInScreen, itemScreen]);
  }
  const loadingAll = async ()=>{
    setIconsSettings(iconsSettingsBase);
    for (let i = 0; i < numberOfText; i++) {
      addTextFalling();
    }
  }
  const playSound = async (url) => {
    try {
      await soundObject.loadAsync(url);
      setSettingsVariables((prevState) => {
        soundObject.setVolumeAsync(prevState.sound * 0.01);
        return prevState;
      });
      await soundObject.playAsync(); 
    } catch (error) {
      console.log('Error al reproducir el sonido', error);
    }
  };
  const stopSound = async () => {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('Error al detener el sonido', error);
    }
  };
  const panResponderMusic = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: async (e, gestureState) => {
        const moveX = gestureState.moveX;
        const percentage = Math.min(Math.max((moveX / screenWidth) * 100, 0), 100);
        const minPorcentaje = 27;  
        const maxPorcentaje = 89;  
        const mappedValue = Math.min(Math.max(((percentage - minPorcentaje) / (maxPorcentaje - minPorcentaje)) * 100, 0), 100);
        setSettingsVariables(prevState => ({
          ...prevState,
          music: Math.round(mappedValue)  
        }));
        if(musicBackgroundRef.current !== null){
          setMusicBackground((prevMusicBackground)=>{
            prevMusicBackground.setVolumeAsync(Math.round(mappedValue) * 0.01);
            return prevMusicBackground;
          });
        }
      },
      onPanResponderRelease: () => {
        //Touch End
      }
    })
  ).current;
  const panResponderSound = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const moveX = gestureState.moveX;
        const percentage = Math.min(Math.max((moveX / screenWidth) * 100, 0), 100);
        const minPorcentaje = 27;  
        const maxPorcentaje = 89;  
        const mappedValue = Math.min(Math.max(((percentage - minPorcentaje) / (maxPorcentaje - minPorcentaje)) * 100, 0), 100);
        setSettingsVariables(prevState => ({
          ...prevState,
          sound: Math.round(mappedValue)  
        }));

      },
      onPanResponderRelease: async () => {
        const url = require('../../assets/sounds/button_click.wav')
        await playSound(url);
        setTimeout(async () => {
          await stopSound();
        }, 500);
      }
    })
  ).current;
  const changeHeight = () => {
    Animated.timing(alturaAnimada, {
      toValue: expandido ? 0 :((screenWidth * 0.01) * 103), 
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setExpandido(!expandido);
  };
  const loadLanguage = () =>{
    objectNews = [{
      tittleNew: t("listApartsTittle_two_new_one_tittle"),
      timeNew: t("listApartsTittle_two_new_one_time"),
      typeNew:0,
      sourceImageNew:require("../../assets/images/notice_example_1.jpg"),
      optionalbuttonRedirectNew:t("listApartsTittle_two_new_one_optionalButton_one"),
      optionalButtonRedirectUrlNew:{text: t("listApartsTittle_two_new_one_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
    },
    {
      tittleNew: t("listApartsTittle_two_new_two_tittle"),
      timeNew: t("listApartsTittle_two_new_two_time"),
      typeNew:2,
      sourceImageNew:require("../../assets/images/notice_example_2.webp"),
      optionalbuttonRedirectNew: t("listApartsTittle_two_new_two_optionalButton_one"),
      optionalButtonRedirectUrlNew:{text: t("listApartsTittle_two_new_two_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
    },
    {
      tittleNew:t("listApartsTittle_two_new_three_tittle"),
      timeNew:t("listApartsTittle_two_new_three_time"),
      typeNew:1,
      sourceImageNew:require("../../assets/images/notice_example_3.png"),
      optionalbuttonRedirectNew:t("listApartsTittle_two_new_three_optionalButton_one"),
      optionalButtonRedirectUrlNew:{text:t("listApartsTittle_two_new_three_optionalButton_two_text"),url:"https://www.youtube.com/watch?v=WDpxooJofGI&list=RDMM&index=7&pp=8AUB"}
    }]
    setNewsGame(objectNews);
  }
  //FunctionsStyles
  const animationFunctionSettings = (a) =>{
    changeHeight();
    Animated.timing(a, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => a.setValue(0));
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
  const iconsFooter=[
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconInformationPrincipalView,backgroundButton : "#2A4693",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationInformation , functionAnimation: (a)=>{animationFunctionInformation(a);setOpenInformationDialog(true);}} }
    },
    {
      Icon: IconButtonSvg,
      props: { SvgChildIcon : IconSettingsPrincipalView,backgroundButton : "#515151",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationSettings , functionAnimation:animationFunctionSettings} }
    }
  ];
  //Loading
  useEffect(() => {
    if (fontsLoaded) 
        loadingAll();
  }, [fontsLoaded]);
  useEffect(()=>{
    if (textInScreen.length === numberOfText) {
      setIsLoading(false);
    }
  },[textInScreen])
  useEffect(()=>{
    if(!isLoading){
      interval = setInterval(intervalTextFallingFunction, 20);
      return()=>{clearInterval(interval)};
    }
  },[isLoading]);
  useEffect(() => {
    musicBackgroundRef.current = musicBackground;
  }, [musicBackground]);
  if(isLoading){
    return null;
  }
  else{
    return (
      <ImageBackground source={require('../../assets/images/math_game_background_principal.jpg')} resizeMode="cover" style={styles.container} imageStyle={{opacity:0.75}}>
        {textInScreen.map((itemText) => (
          <Text key={itemText.id} style={[styles.textFalling,{left:`${itemText.left}`,color:`${itemText.color}`,top:`${itemText.top}`,transform:[{rotateZ:`${itemText.orientation}`}]}]}>{itemText.text}</Text>
        ))}
        {openSecondDialog.state && openSecondDialog.type === 0 && (
                <View style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:2}}>
                  <WindowDialogApart styleOptionsDialog={stylesSecondDialogEditImage} listAparts={[{tittle: t("textTittleSecondDialogChangeImage"),functionContentChange:()=>{}}]}  functionExit={()=>setOpenSecondDialog({state:false,type:0})}>
                    <View style={{display:'flex',height:'75%',width:'95%',marginLeft:'auto',marginRight:'auto',flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between',marginTop:'4%'}}>
                        {imagesAvatarProfile.map((image,index)=>(
                          <TouchableOpacity style={{height:'50%',width:'46%',justifyContent:'center',borderRadius:'50%',margin:'1vw'}} onPress={()=>{setProfilePhoto(index);setOpenSecondDialog({state:false,type:0})}}>
                            <Image key={index} source={image.source} style={{height:'100%',width:'100%',justifyContent:'center',borderRadius:'50%'}} resizeMode='stretch' />
                          </TouchableOpacity>
                        ))}
                    </View>
                  </WindowDialogApart>
                </View>
        )}
        {openSecondDialog.state && openSecondDialog.type === 1 && (
                <View style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:2}}>
                  <WindowDialogApart styleOptionsDialog={stylesSecondDialogEditName} listAparts={[{tittle: t("textTittleSecondDialogChangeName"),functionContentChange:()=>{}}]}  functionExit={()=>setOpenSecondDialog({state:false,type:0})}>
                    <Text style={[styles.tittleTextApart,{fontSize:'3vh'}]}>{t("textTittleSecondDialogName")}</Text>
                    <TextInput style={styles.inputTextNameChangeStyle} placeholder={t("textPlaceholderDialogChangeName")} value={profileName} onChangeText={setProfileName} />
                    <TouchableOpacity style={{height:'20%',width:'40%',marginLeft:'auto',marginRight:'auto',marginTop:'4%'}}>
                      <ButtonGameGeneric colorButton={"white"} backgroundButton={"#187c28"} textButton={t("acceptButton")} borderRadius={"2vw"} actionClick={()=>setOpenSecondDialog({state:false,type:0})} />
                    </TouchableOpacity>
                  </WindowDialogApart>
                </View>
        )}
        {openSecondDialog.state && (openSecondDialog.type === 2 || openSecondDialog.type === 3) && (
                <View style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:2}}>
                  <WindowDialogApart styleOptionsDialog={stylesSecondDialogAcceptDelete} listAparts={[{tittle: t("textTittleSecondDialogDelete"),functionContentChange:()=>{}}]}  functionExit={()=>setOpenSecondDialog({state:false,type:0})}>
                    <Text style={[styles.tittleTextApart,{fontSize:'2.5vh',width:'90%'}]}>{openSecondDialog.type === 2?t("textTittleSecondDialogDelete_text_one"):t("textTittleSecondDialogDelete_text_second")}</Text>
                    <View style={{display:'flex',height:'30%',width:'95%',marginLeft:'auto',marginRight:'auto',flexDirection:'row'}}>
                        <View style={{flex:1,height:'100%',width:'45%',marginLeft:'3%',justifyContent:'center',marginTop:'2%'}}>
                          <ButtonGameGeneric colorButton={"white"} backgroundButton={"#601212"} textButton={t("yesText")} borderRadius={"2vw"} actionClick={()=>{console.log("Datos Eliminados");setOpenSecondDialog({state:false,type:0})}} />
                        </View>
                        <View style={{flex:1,height:'100%',width:'45%',marginLeft:'3%',justifyContent:'center',marginTop:'2%'}}>
                          <ButtonGameGeneric colorButton={"white"} backgroundButton={"#257317"} textButton={t("notText")} borderRadius={"2vw"} actionClick={()=>{console.log("Datos No Eliminados");setOpenSecondDialog({state:false,type:0})}} />
                        </View>
                    </View>
                  </WindowDialogApart>
                </View>
        )}
        {
          openInformationDialog
          ?<WindowDialogText styleOptionsDialog={styleDialogDevInfo} tittleText={t("tittleTextDevDialog")} listTextInformation={[t("textDevDialog_one"),t("textDevDialog_two")]} optionalImageOptions={imageDialogDevInfo} functionExit={()=>setOpenInformationDialog(false)}/>
          :
          openConfigurationDialog
          ?<WindowDialogApart styleOptionsDialog={styleSettingsDialogInfo} listAparts={listAparts} elementSelect = {configurationDialogVar} backgroundInactiveApart={"#9b732d"} functionExit={()=>setOpenConfigurationDialog(false)}>
            {configurationDialogVar === 0 && (
              <View style={{height:'100%',width:'100%'}}>
                <Text style={styles.tittleTextApart}>{t("listApartsTittle_one_text_one")}</Text>

                <View style={styles.apartProgressBar}>
                  <View style={{flex:'1'}}>
                    <IconButtonSvg SvgChildIcon = {settingsVariables.music === 0?IconMusicMute:IconMusic} backgroundButton = {"transparent"} borderRadiusButton={"2vw"} colorIcon= {"white"} sizeIcon = {10} sizeButton = {20} />
                  </View>
                  <View style={styles.progressBarFlex}>
                      <ImageBackground source={require('../../assets/images/icon_math_settings.png')} style={{position:'absolute',left:`${settingsVariables.music - 5}%`,top:'-20%',zIndex:1}} resizeMode='cover' imageStyle={{height:'9vw',width:'9vw'}} {...panResponderMusic.panHandlers}/>
                      <View style={{backgroundColor:'white',height:'100%',width:'100%',borderRadius:'0.3vw'}}>
                        <View style={{backgroundColor:'#006e35',height:'100%',width:`${settingsVariables.music}%`}}>

                        </View>
                      </View>
                  </View>
                </View>


                <View style={styles.apartProgressBar}>
                  <View style={{flex:'1'}}>
                    <IconButtonSvg SvgChildIcon = {settingsVariables.sound === 0?IconMute:IconSound} backgroundButton = {"transparent"} borderRadiusButton={"2vw"} colorIcon= {"white"} sizeIcon = {10} sizeButton = {20} />
                  </View>
                  <View style={styles.progressBarFlex}>
                      <ImageBackground source={require('../../assets/images/icon_math_settings.png')} style={{position:'absolute',left:`${settingsVariables.sound - 5}%`,top:'-20%',zIndex:1}} resizeMode='cover' imageStyle={{height:'9vw',width:'9vw'}} {...panResponderSound.panHandlers}/>
                      <View style={{backgroundColor:'white',height:'100%',width:'100%',borderRadius:'0.3vw'}}>
                        <View style={{backgroundColor:'#006e35',height:'100%',width:`${settingsVariables.sound}%`}}>

                        </View>
                      </View>
                  </View>
                </View>
                <Text style={styles.tittleTextApart}>{t("listApartsTittle_one_text_two")}</Text>
                <View style={styles.translateFlexBox}>
                    <TouchableOpacity style={{flex:1,width:'100%',height:'100%',justifyContent:'center',marginRight:'3%'}} onPress={()=> {changeLanguage('es');loadLanguage();}}>
                      <Image source={require('../../assets/images/spanish_language_change.jpg')} style={{width:'100%',height:'70%'}} resizeMode='stretch' />
                      <View style={{marginLeft:'auto',marginRight:'auto'}}>
                        <IconButtonSvg SvgChildIcon = {language === 'es'?IconSelect:IconTranslate} backgroundButton = {"transparent"} borderRadiusButton={"50%"} colorIcon= {language === 'es'?"#bdffbe":"#da5252"} sizeIcon = {10} sizeButton = {20} />  
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,width:'100%',height:'100%',justifyContent:'center'}} onPress={()=> {changeLanguage('en'); loadLanguage();}}>
                      <Image source={require('../../assets/images/english_language_change.png')} style={{width:'100%',height:'70%'}} resizeMode='stretch' />
                      <View style={{marginLeft:'auto',marginRight:'auto'}}>
                        <IconButtonSvg SvgChildIcon = {language === 'en'?IconSelect:IconTranslate} backgroundButton = {"transparent"} borderRadiusButton={"50%"} colorIcon= {language === 'en'?"#bdffbe":"#da5252"} sizeIcon = {10} sizeButton = {20} />  
                      </View>
                    </TouchableOpacity>
                </View>
                <View style={{height:'12%',width:'45%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}>
                      <ButtonGameGeneric colorButton={"white"} backgroundButton={"#005702"} textButton={t("textButtonDialogSettings")} borderRadius={"2vw"} />
                </View>
              </View>
            )}
            {configurationDialogVar === 1 && (
              <View style={{height:'100%',width:'100%'}}>
                  {newsGame.length === 0 && (
                    <>
                      <Text style={styles.tittleTextApart}>{t("listApartsTittle_two_text_one")}</Text>
                      <Image style={styles.imageNotFound} resizeMode='stretch' source={require("../../assets/images/not_found_image.webp")}/>
                    </>
                  )}
                   {newsGame.length > 0 && (
                    <>
                      <Text style={[styles.tittleTextApart,{marginBottom:'3%'}]}>{t("listApartsTittle_two_text_two")}</Text>
                      <CarruselNewsImages arrayObjectsSwitch={newsGame}/>
                      <View style={{height:'12%',width:'45%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}>
                        <ButtonGameGeneric colorButton={"white"} backgroundButton={"#005702"} textButton={t("textButtonDialogNew")} borderRadius={"2vw"} />
                      </View>
                    </>
                  )}
              </View>
            )}
          </WindowDialogApart>
          :
          openAcountDialog
          ?<WindowDialogApart styleOptionsDialog={styleSettingsDialogAccount} listAparts={[{tittle: t("textDialogAccount"),functionContentChange : ()=>{}}]} functionExit={()=>setOpenAcountDialog(false)}>
              <ImageBackground style={styles.photoProfileAccount} source={imagesAvatarProfile[profilePhoto].source} imageStyle={{height:'100%',width:'100%',borderRadius:'50%'}} resizeMode='stretch'>
                  <TouchableOpacity style={{height:'45%',width:'60%',marginLeft:'auto',marginRight:'auto',marginTop:'40%',opacity:0.5,zIndex:1}} onPress={()=>{setOpenSecondDialog({state:true,type:0})}}>
                    <Image style={{height:'100%',width:'100%'}} source={require('../../assets/images/edit_image.png')} />
                  </TouchableOpacity>
              </ImageBackground>
              <View style={{display:'flex',flexDirection:'row',height:'15%',width:'100%'}}>
                <Text style={[styles.tittleTextApart,{flex:50}]}>{profileName}</Text>
                <View style ={{position:'relative',flex:1,marginLeft:'auto',marginRight:'auto',justifyContent:'center',left:'-20%',top:'15%'}}>
                  <IconButtonSvg SvgChildIcon = {IconEdit} backgroundButton = {"transparent"} borderRadiusButton={"50%"} colorIcon= {"#bdffbe"} sizeIcon = {15} sizeButton = {20} animationOptions = {{styleChange: styleChangeAnimationInformation , functionAnimation:(a)=>{animationFunctionInformation(a);setOpenSecondDialog({state:true,type:1})}}} />  
                </View>
              </View>
              <View style={{height:'18%',width:'60%',marginLeft:'auto',marginRight:'auto',marginTop:'1.5%'}}>
                <ButtonGameGeneric colorButton={"white"} backgroundButton={"#7e3408"} textButton={t("textProfileVoidAccount")} borderRadius={"2vw"} actionClick={()=>{setOpenSecondDialog({state:true,type:2})}} />
              </View>
              <View style={{height:'18%',width:'60%',marginLeft:'auto',marginRight:'auto',marginTop:'1.5%'}}>
                <ButtonGameGeneric colorButton={"white"} backgroundButton={"#560a0a"} textButton={t("textProfileDeleteAccount")} borderRadius={"2vw"} actionClick={()=>{setOpenSecondDialog({state:true,type:3})}} />
              </View>
          </WindowDialogApart>
          :
          <>
          <View style={styles.imageBackgroundTittle}>
              <IconBackgroundTittlePrincipalView  size={200} backgroundColor={"#FFFFFF"}/>
              <Image source={require('../../assets/images/logo_words_tittle.png')} style={styles.imageLogoTittle} />
          </View>
          <CenterIconCircle onPressIcon={()=>{router.push("/(main)/levels")}} imageSource={require('../../assets/images/play_icon.png')} size={40} margin={ {top: '100vw', left: 'auto', right: 'auto', bottom:'0' }} backgroundColor={"#2A4693"}/>
            <Animated.View style={[styles.containerButtonsSettings,{height: alturaAnimada}]}>
                {iconsSettings.map(({ Icon , props }, index) => {
                              return(
                                <View key={index} style={[styles.buttonSetting,{top:`${index * 21}vw`}]}> 
                                  <Icon  SvgChildIcon = {props.SvgChildIcon} backgroundButton = {props.backgroundButton} borderRadiusButton={props.borderRadiusButton} colorIcon= {props.colorIcon} sizeIcon = {props.sizeIcon} sizeButton = {props.sizeButton} animationOptions = {props.animationOptions} />
                                </View>
                              )
                  })}
            </Animated.View>
          <FooterBarPrincipalView iconsFooter={iconsFooter} positionsButtons={["start","end"]} heightFooter={15} widthFooter={100} />
          </>
        }
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%' ,
    width:'100%',
    overflow:'hidden',
    backgroundColor: '#000000'
  },
  textFalling:{
    position:'absolute',
    fontSize:'25vw',
    paddingLeft:'5vw',
    paddingRight:'5vw',
    fontFamily: 'FontNumbers'
  },
  imageLogoTittle:{
    position:'absolute',
    height:'19vw',
    width:'68vw'
  },
  imageBackgroundTittle:{
    position:'absolute',
    top:'0vh',
    left:'0vw',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButtonsSettings:{
    position:'absolute',
    bottom:'4.5vh',
    height:'103vw',
    width:'20.5%',
    left:'76.5%',
    backgroundColor:'#808080',
    borderRadius:'10vw',
    flexDirection: 'row',  
    flexWrap: 'wrap',      
    justifyContent: 'flex-start', 
    overflow:'hidden',
    alignItems: 'flex-start'
  },
  buttonSetting:{
    position:'absolute',
    margin:'0',
    display:'flex',
    top:'0%',
    width:'20.5%',
    left:'2%'
  },
  tittleTextApart:{
    fontFamily:'Poppins-Bold',
    fontSize:'6vw',
    width:'80%',
    color:'white',
    textAlign:'center',
    marginTop:'3vw',
    marginLeft:'auto',
    marginRight:'auto',
    textShadowColor: 'white', 
    textShadowOffset: { width: '0vw', height: '-0.5vw' }, 
    textShadowRadius: 30
  },
  apartProgressBar:{
    display:'flex',
    width:'90%',
    height:'6.5vw',
    marginTop:'1vh',
    marginBottom:'1.5vh',
    marginLeft:'auto',
    marginRight:'auto',
    flexDirection: 'row',     
    justifyContent: 'center', 
    alignItems: 'center',
  },
  progressBarFlex:{
    position:'relative',
    flex:'5',
    width:'100%',
    height:'100%',
    padding:'1.25vw',
    borderRadius:'1vw',
    backgroundColor:'#153a8a'
  },
  imageNotFound:{
    height:"65%",
    width:'70%',
    marginTop:'3vw',
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  translateFlexBox:{
    display:'flex',
    flexDirection:'row',
    width:'90%',
    height:'30%',
    marginTop:'3%',
    marginLeft:'auto',
    marginRight:'auto'
  },
  photoProfileAccount:{
    height:'40%',
    width:'35%',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'2%',
    borderRadius:'50%'
  },
  inputTextNameChangeStyle:{
    height:'30%',
    width:'85%',
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center',
    marginTop:'3%',
    borderRadius:'10vw',
    borderColor:'#034928',
    color:'#034928',
    borderWidth:'1vw',
    backgroundColor:'white',
    fontFamily:'Poppins-Bold',
    fontSize:'2.8vh',
  }
});
