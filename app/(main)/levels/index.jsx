import { StyleSheet, Text, View,Animated,TouchableOpacity, Image, Dimensions } from "react-native";
import HeaderLevels from "../../../components/ui/HeaderLevels";
import FooterLevels from "../../../components/ui/FooterLevels";
import IconButtonSvg from "../../../components/ui/IconButtonSvg";
import IconHome from "../../../components/svg_icons/IconHome";
import IconBattle from "../../../components/svg_icons/IconBattle";
import IconExit from "../../../components/svg_icons/IconExit";
import { useState,useRef,useEffect } from "react";
import { useRouter } from "expo-router";
import IconCharacterChange from "../../../components/svg_icons/IconCharacterChange";
import IconMap from "../../../components/svg_icons/IconMap";
import IconMusic from "../../../components/svg_icons/IconMusic";
import { useLanguage } from "../../../constants/translations";
import { useFonts } from "expo-font";
import IconRightArrow from "../../../components/svg_icons/IconRightArrow";
import IconLeftArrow from "../../../components/svg_icons/IconLeftArrow";
import { LinearGradient } from "react-native-svg";
import { ImageBackground } from "react-native-web";
import IconSelect from "../../../components/svg_icons/IconSelect";
import CenterIconCircle from "../../../components/ui/CenterIconCircle";
import { Audio } from "expo-av";
import WindowDialogApart from "../../../components/ui/WindowDialogAparts";
import ButtonGameGeneric from "../../../components/ui/ButtonGameGeneric";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const money = 1500;
const stars = 35;

const LevelsViewGame = () => {
    const {t} = useLanguage();
    const listCharacters = [
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:false,
            costUnlock:500,
        },
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:false,
            costUnlock:500,
        },
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:false,
            costUnlock:500,
        },
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:true,
            costUnlock:500,
        },
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:false,
            costUnlock:500,
        },
        {
            nameCharacter:"Winston Luna",
            source:require("../../../assets/images/winston_luna.png"),
            isBlocking:true,
            costUnlock:1500,
        }
    ]
    const listMaps = [
        {
            iconMap:require("../../../assets/images/icon_map_1.png"),
            nameMap:t("homeApartGame_two_map_one"),
            colorMapWeak:"#adface",
            colorMapMedium:"#2bbb68",
            colorMapStrong:"#087135",
            isBlocking:false
        },
        {
            iconMap:require("../../../assets/images/icon_map_1.png"),
            nameMap:t("homeApartGame_two_map_two"),
            colorMapWeak:"#adface",
            colorMapMedium:"#2bbb68",
            colorMapStrong:"#087135",
            isBlocking:true
        },
        {
            iconMap:require("../../../assets/images/icon_map_1.png"),
            nameMap:t("homeApartGame_two_map_tree"),
            colorMapWeak:"#adface",
            colorMapMedium:"#2bbb68",
            colorMapStrong:"#087135",
            isBlocking:true
        },
        {
            iconMap:require("../../../assets/images/icon_map_1.png"),
            nameMap:t("homeApartGame_two_map_forth"),
            colorMapWeak:"#adface",
            colorMapMedium:"#2bbb68",
            colorMapStrong:"#087135",
            isBlocking:true
        }
    ]
    const listMusics = [
        {
            nameMusic:"Megaman X4 - Intro Stage",
            music:require('../../../assets/musics/cover_music_1.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_1.jpg"),
            isMusicBlocks:false,
            costUnlock:10
        },
        {
            nameMusic:"Megaman X4 - Frost Walrus",
            music:require('../../../assets/musics/cover_music_2.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_2.jpg"),
            isMusicBlocks:false,
            costUnlock:10
    
        },
        {
            nameMusic:"Sonic.exe - Dr.Eggman Stage",
            music:require('../../../assets/musics/cover_music_3.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_3.jpg"),
            isMusicBlocks:true,
            costUnlock:30
    
        },
        {
            nameMusic:"Dimash Kudaibergen - Loves not over yet",
            music:require('../../../assets/musics/cover_music_4.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_4.jpg"),
            isMusicBlocks:true,
            costUnlock:30
    
        },
        {
            nameMusic:"Sonic 1 - Spring Yard Zone",
            music:require('../../../assets/musics/cover_music_5.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_5.jpg"),
            isMusicBlocks:true,
            costUnlock:60
    
        },
        {
            nameMusic:"TheFatRat - MAYDAY",
            music:require('../../../assets/musics/cover_music_6.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_6.jpg"),
            isMusicBlocks:true,
            costUnlock:60
    
        },
        {
            nameMusic:"Chessmaster - HIT",
            music:require('../../../assets/musics/cover_music_7.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_7.jpg"),
            isMusicBlocks:true,
            costUnlock:120
        },
        {
            nameMusic:"Dimash Kudaibergen - My Swan",
            music:require('../../../assets/musics/cover_music_8.mp3'),
            colorBackgroundStrong:"#297a59",
            colorBackgroundWeak:"#77e9bb",
            imageMusic:require("../../../assets/images/cover_music_8.jpg"),
            isMusicBlocks:true,
            costUnlock:120
        },
    
    ]
    const [apartNowGame,setApartNowGame] = useState(0);
    const [apartHomeSelect,setApartHomeSelect] = useState(0);
    const [selectCharacter,setSelectCharacter] = useState(2);
    const [selectMusic,setSelectMusic] = useState(1);
    const [selectPlayMusic,setSelectPlayMusic] = useState(-1);
    const [musicPlayingBackground,setMusicPlayingBackground] = useState(null);
    const musicBackgroundRef = useRef(null);
    const [firstDialog,setFirstDialog] = useState({state:false,type:0});
    const [secondDialog,setSecondDialog] = useState({state:false,type:0});
    const [purchase,setPurchase] = useState({typePurchase:0,costPurchase:0,typeMoney:0,indexPurchase:0})
    const [characters,setCharacters] = useState(listCharacters);
    const [maps,setMaps] = useState(listMaps);
    const [musics,setMusics] = useState(listMusics);
    const [cuantityMoney,setCuantityMoney] = useState(money)
    const [cuantityStars,setCuantityStars] = useState(stars)
    const [animationKey, setAnimationKey] = useState(0); 

    const deltaRef = useRef(1); 

    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'c': require('../../../assets/fonts/Numbers_Operations_Font.ttf'),
        'FontTittleGame': require('../../../assets/fonts/Tittle_Game_Font.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../../../assets/fonts/Poppins/Poppins-Regular.ttf')
    });
    useEffect(() => {
        progress.setValue(0);
        Animated.timing(progress, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setSelectCharacter(prev => prev + deltaRef.current);
        });
    }, [animationKey]);
    const styleChangeAnimationBattle = (animation) => {
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
    const animationFunctionBattle= (a) =>{
        Animated.timing(a, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(() => a.setValue(0));
    };
    const functionChangeAnotherPage = (apartToSender) =>{
        if(apartToSender === -1){
            router.push('/');
        }
        if(apartToSender < apartNowGame ){
            //Logic translate page to left

        }
        else if(apartToSender > apartNowGame){
            //logic translate page to right
            
        }
        setApartNowGame(apartToSender);
    }
    const iconsFooter=[
        {
          Icon: IconButtonSvg,
          props: { SvgChildIcon : IconHome,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle, functionAnimation: (a)=>{animationFunctionBattle(a);functionChangeAnotherPage(0);}} }
        },
        {
          Icon: IconButtonSvg,
          props: { SvgChildIcon : IconBattle,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle , functionAnimation:(a)=>{animationFunctionBattle(a);functionChangeAnotherPage(1);}} }
        },
        {
            Icon: IconButtonSvg,
            props: { SvgChildIcon : IconExit,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 30,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle , functionAnimation:(a)=>{animationFunctionBattle(a);functionChangeAnotherPage(-1);}} }
        }
    ]
    const iconsHome=[
        {
          Icon: IconButtonSvg,
          props: { SvgChildIcon : IconCharacterChange,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 25,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle, functionAnimation: (a)=>{animationFunctionBattle(a);setApartHomeSelect(0);onBackgroundMusic();}},nameIcon:t("homeApartGame_one")}
        },
        {
          Icon: IconButtonSvg,
          props: { SvgChildIcon : IconMap,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 25,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle , functionAnimation:(a)=>{animationFunctionBattle(a);setApartHomeSelect(1);onBackgroundMusic();}},nameIcon:t("homeApartGame_two")}
        },
        {
            Icon: IconButtonSvg,
            props: { SvgChildIcon : IconMusic,backgroundButton : "transparent",borderRadiusButton:"50%",colorIcon : "#ffffff",sizeIcon : 25,sizeButton : 40,animationOptions : {styleChange: styleChangeAnimationBattle , functionAnimation:(a)=>{animationFunctionBattle(a);setApartHomeSelect(2);}},nameIcon:t("homeApartGame_tree")}
        }
    ]
    const progress = new Animated.Value(0);
    const getTranslateX = (relativePosition) => {
        switch (relativePosition) {
            case -2: return 0.01 * screenWidth;
            case -1: return -0.07 * screenWidth;
            case 0: return 0.175 * screenWidth;
            case 1: return 0.42 * screenWidth;
            case 2: return 0.43 * screenWidth;
            default: return screenWidth;
        }
    };

    const getTranslateY = (relativePosition) => {
        switch (relativePosition) {
            case -2: return -0.03 * screenHeight;
            case -1: return 0.11 * screenHeight;
            case 0: return 0.2 * screenHeight;
            case 1: return 0.11 * screenHeight;
            case 2: return -0.03 * screenHeight;
            default: return 0;
        }
    };

    const getOpacity = (relativePosition) => {
        switch (relativePosition) {
            case -2: return 0.25;
            case -1: return 0.5;
            case 0: return 1;
            case 1: return 0.5;
            case 2: return 0.25;
            default: return 0;
        }
    };
    const animateTransition = (delta) => {
        if (
            (delta === 1 && selectCharacter >= listCharacters.length - 1) ||
            (delta === -1 && selectCharacter <= 0)
        ) return;

        deltaRef.current = delta;
        setAnimationKey(prev => prev + 1); 
    };
    
    const goToNextCharacter = () => animateTransition(1);
    const goToPrevCharacter = () => animateTransition(-1);
    const stylesDialogPurchase = {
        top:'35%',
        left:'5%',
        width:'90%',
        height:'35%',
        borderRadius:'3.5vw',
        borderColor: '#c48f31',  
        borderWidth: '5vw',
    }
    const stylesSecondDialogPurchase = {
        top:'38%',
        left:'10%',
        width:'80%',
        height:'30%',
        borderRadius:'3.5vw',
        borderColor: '#c48f31',  
        borderWidth: '5vw',
    }
    const stylesDialogBlockMap = {
        top:'40%',
        left:'10%',
        width:'80%',
        height:'32%',
        borderRadius:'3.5vw',
        borderColor: '#c48f31',  
        borderWidth: '5vw',
    }
    const checkStatusPurchase = (purchase) => {
        let  continuePurchase = false;
          if (purchase.typeMoney === 1) {
            if(cuantityMoney < purchase.costPurchase)
                setSecondDialog({ state: true, type: 1 });
            else{
                setCuantityMoney(prev => prev - purchase.costPurchase);
                continuePurchase = true
            }
          } else {
            if(cuantityStars < purchase.costPurchase)
                setSecondDialog({ state: true, type: 2 });
            else{
                setCuantityStars(prev => prev - purchase.costPurchase);
                continuePurchase = true
            }
          }
        if(continuePurchase){
            if (purchase.typePurchase === 1) {
                setCharacters(prev => {
                  const updated = [...prev];
                  updated[purchase.indexPurchase] = {
                    ...updated[purchase.indexPurchase],
                    costUnlock: 0,
                    isBlocking: false
                  };
                  return updated;
                });
              } else {
                setMusics(prev => {
                  const updated = [...prev];
                  updated[purchase.indexPurchase] = {
                    ...updated[purchase.indexPurchase],
                    costUnlock: 0,
                    isMusicBlocks: false
                  };
                  return updated;
                });
              }
              setFirstDialog({state:false,type:0})
        }
      };      
    const onActiveMusic = async (music) => {
        console.log(music)
        const currentSound = musicBackgroundRef.current;
        if (currentSound === null) {
            const { sound } = await Audio.Sound.createAsync(
                music,
                {
                isLooping: true
                }
            );
            await sound.setVolumeAsync(1);
            await sound.playAsync();
            setMusicPlayingBackground(sound); 
        }
        else{
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            setMusicPlayingBackground(null);
            const { sound } = await Audio.Sound.createAsync(
                music,
                {
                isLooping: true
                }
            );
            await sound.setVolumeAsync(1);
            await sound.playAsync();
            setMusicPlayingBackground(sound); 
        }
    };
    const onBackgroundMusic = async () =>{
        const currentSound = musicBackgroundRef.current;
        if(currentSound !== null && selectPlayMusic != -1){
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            setMusicPlayingBackground(null);
            const { sound } = await Audio.Sound.createAsync(
                require('../../../assets/musics/background_music.mp3'),
                {
                isLooping: true
                }
            );
            await sound.setVolumeAsync(1);
            await sound.playAsync();
            setMusicPlayingBackground(sound); 
            setSelectPlayMusic(-1);
        }
    }
    useEffect(() => {
        musicBackgroundRef.current = musicPlayingBackground;
    }, [musicPlayingBackground]);
    return(
        <View style={styles.containerLevels}>
            {firstDialog.state && firstDialog.type === 0 && (
                <View style={{position:'absolute',height:'100%',width:'100%',zIndex:6}}>
                    {secondDialog.state && (
                        <View style={{position:'absolute',height:'100%',width:'100%',zIndex:7}}> 
                            <WindowDialogApart styleOptionsDialog={stylesSecondDialogPurchase} listAparts={[{tittle: t("homeApartSecondDialogError_tittle"),functionContentChange:()=>{}}]}  functionExit={()=>setSecondDialog({state:false,type:0})}>
                                <Text style={[styles.tittleTextApart,{fontSize:'3vh'}]}>{secondDialog.type === 1?t("homeApartSecondDialogError_text_one"):secondDialog.type === 2?t("homeApartSecondDialogError_text_two"):""}</Text>
                                <View style={{height:'25%',width:'45%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}>
                                    <ButtonGameGeneric colorButton={"white"} backgroundButton={"#005702"} textButton={t("acceptButton")} borderRadius={"2vw"} actionClick={()=>setSecondDialog({state:false,type:0})} />
                                </View>
                            </WindowDialogApart>
                        </View>
                    )}
                    <WindowDialogApart styleOptionsDialog={stylesDialogPurchase} listAparts={[{tittle: t("homeApartDialog_one"),functionContentChange:()=>{}}]}  functionExit={()=>setFirstDialog({state:false,type:0})}>
                        <Text style={[styles.tittleTextApart,{fontSize:'3vh'}]}>{t("homeApartDialog_one_tittle_text")}</Text>
                        <View style={{display:'flex',flexDirection:'row',height:'50%',width:'95%',marginLeft:'auto',marginRight:'auto'}}>
                            <View style={{flex:1,justifyContent:'center',height:'50%',marginRight:'7%',marginTop:'8%'}}>
                                <ButtonGameGeneric colorButton={"white"} backgroundButton={"#005702"} textButton={t("homeApartDialog_one_button_text_yes")} borderRadius={"2vw"} actionClick={()=>checkStatusPurchase(purchase)} />
                            </View>
                            <View style={{flex:1,justifyContent:'center',height:'50%',marginTop:'8%'}}>
                                <ButtonGameGeneric colorButton={"white"} backgroundButton={"#630f0f"} textButton={t("homeApartDialog_one_button_text_no")} borderRadius={"2vw"} actionClick={()=>{setFirstDialog({state:false,type:0})}} />
                            </View>
                        </View>
                    </WindowDialogApart>
                </View>
                
            )}
            {firstDialog.state && firstDialog.type === 1 && (
                <View style={{position:'absolute',height:'100%',width:'100%',zIndex:10}}>
                    <WindowDialogApart styleOptionsDialog={stylesDialogBlockMap} listAparts={[{tittle: t("homeApartDialog_two"),functionContentChange:()=>{}}]}  functionExit={()=>setFirstDialog({state:false,type:0})}>
                            <Text style={[styles.tittleTextApart,{fontSize:'3vh'}]}>{t("homeApartDialog_two_text")}</Text>
                            <View style={{height:'25%',width:'45%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}>
                                <ButtonGameGeneric colorButton={"white"} backgroundButton={"#005702"} textButton={t("acceptButton")} borderRadius={"2vw"} actionClick={()=>setFirstDialog({state:false,type:0})} />
                            </View>
                    </WindowDialogApart>
                </View>
                
            )}
            <HeaderLevels cuantityMoney={cuantityMoney} cuantityStars={cuantityStars} />
            {apartNowGame === 0 && (
                <View style={{height:'100%',width:'100%'}}>
                    <View style={styles.apartsHomeFlex}>
                        {iconsHome.map(({ Icon , props }, index) => {
                                return(
                                        <View key={index} style={[styles.iconWrapper,{position:'relative'}]}> 
                                            <Icon  SvgChildIcon = {props.SvgChildIcon} backgroundButton = {props.backgroundButton} borderRadiusButton={props.borderRadiusButton} colorIcon= {apartHomeSelect === index?"#147aff":props.colorIcon} sizeIcon = {props.sizeIcon} sizeButton = {props.sizeButton} animationOptions = {props.animationOptions} />
                                            <Text style={styles.textApartHome}>{props.nameIcon}</Text>
                                        </View>
                                )
                        })}
                    </View>
                    {apartHomeSelect === 0 && (
                            <View style={{position:'relative',height:'40%',width:'90%',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}>
                                <TouchableOpacity  style={styles.arrowLeftContainer}>
                                    <IconButtonSvg SvgChildIcon={IconLeftArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationBattle , functionAnimation: (a)=>{ animationFunctionBattle(a); goToPrevCharacter();}}}/>
                                </TouchableOpacity>
                                {characters.map(({ nameCharacter, source,isBlocking,costUnlock }, index) => {
                                    const currentRelative = index - selectCharacter;
                                    const targetRelative = currentRelative - deltaRef.current; 
                                    const isInCurrentRange = index >= selectCharacter - 2 && index <= selectCharacter + 2;
                                    const isInTargetRange = index >= (selectCharacter + deltaRef.current) - 2 && 
                                                        index <= (selectCharacter + deltaRef.current) + 2;
                                    if (!isInCurrentRange && !isInTargetRange) return null;
                                    const translateX = progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            getTranslateX(currentRelative),
                                            getTranslateX(targetRelative)
                                        ]
                                    });

                                    const translateY = progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            getTranslateY(currentRelative),
                                            getTranslateY(targetRelative)
                                        ]
                                    });

                                    const opacity = progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            getOpacity(currentRelative),
                                            getOpacity(targetRelative)
                                        ]
                                    });

                                    return (
                                        <Animated.View
                                            key={`${index}_${animationKey}`}
                                            style={{
                                                position: 'absolute',
                                                height: '60%',
                                                width: '60%',
                                                zIndex: index === selectCharacter ? 2 : 1,
                                                opacity: opacity,
                                                transform: [{ translateX }, { translateY }],
                                            }}
                                        >
                                            {isBlocking &&(
                                                <TouchableOpacity style={{position:'absolute',height:'70%',top:'20%',width:'90%',justifyContent:'center',zIndex:2}} 
                                                    onPress={() => {
                                                        setFirstDialog({ state: true, type: 0 });
                                                        setPurchase({typePurchase:1,costPurchase:costUnlock,typeMoney:1,indexPurchase:index})
                                                    }}
                                                  >
                                                    <Image source={require("../../../assets/images/game_lock.png")} style={{height:'70%',width:'50%',marginLeft:'auto',marginRight:'auto'}} resizeMode='stretch' />
                                                    <View style={{position:'static',display:'flex',flexDirection:'row',justifyContent:'center',marginTop:'5%',marginLeft:'auto',marginRight:'auto',width:'60%',height:'25%',backgroundColor:'#9ef4fe',borderRadius:'5vw',borderWidth:'1vw',borderColor:'#147aff'}}>
                                                        <Image source={require("../../../assets/images/coins_levels.png")} style={{flex:1,position:'relative',height:'90%',width:'100%',left:'10%',top:'5%'}} resizeMode='stretch' />
                                                        <Text style={[styles.characterName,{position:'relative',fontFamily:'FontNumbers',fontSize:'2.5vh',flex:3,backgroundColor:'transparent',color:'#b4c110',top:'-28%',left:'-7%'}]}>{costUnlock}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            <Image source={source} style={{ height: '100%', width: '100%' }} />
                                            {selectCharacter === index && (
                                                <Text style={[styles.textApartHome, styles.characterName]}>
                                                    {nameCharacter}
                                                </Text>
                                            )}
                                        </Animated.View>
                                    );
                                })}
                                <TouchableOpacity  style={styles.arrowRightContainer}>
                                    <IconButtonSvg SvgChildIcon={IconRightArrow} backgroundButton={"transparent"} borderRadiusButton={"0%"}  colorIcon={"white"}  sizeIcon={20} sizeButton={20} animationOptions={{styleChange: styleChangeAnimationBattle , functionAnimation: (a)=>{ animationFunctionBattle(a); goToNextCharacter();}}}/>
                                </TouchableOpacity >
                            </View>
                        )}
                        {apartHomeSelect === 1 && (
                            <View style={{position:'relative',height:'52%',width:'100%',overflow:'scroll'}}>
                                    {maps.map(({iconMap,nameMap,colorMapWeak,colorMapMedium,colorMapStrong,isBlocking},index) =>{

                                        return(
                                            <TouchableOpacity key={index} style={[styles.mapContainer,{backgroundColor:colorMapMedium}]} onPress={()=>{if(!isBlocking)router.push(`/(main)/levels/map/${index}`);}}>
                                                {isBlocking && (
                                                    <TouchableOpacity style={{position:'absolute',height:'100%',width:'100%',backgroundColor:'black',opacity:0.5,justifyContent:'center',zIndex:1}} 
                                                        onPress={() => {
                                                            setFirstDialog({ state: true, type: 1 });
                                                            console.log(`Lo hizo: ${firstDialog.state}, ${firstDialog.type}`);
                                                        }}>
                                                        <Image source={require("../../../assets/images/game_lock.png")} style={{height:'85%',width:'30%',marginLeft:'auto',marginRight:'auto'}} resizeMode='stretch' />
                                                    </TouchableOpacity>
                                                )}
                                                <View style={{display:'flex',height:'65%',width:'90%',marginLeft:'auto',marginRight:'auto',flexDirection:'row'}}>
                                                    <LinearGradient
                                                            colors={['rgba(255,255,255,0.25)', 'transparent']}
                                                            style={[styles.insetOverlay,{backgroundColor:colorMapStrong}]}
                                                    />
                                                    <View style={{flex:1,height:'100%',width:'auto',borderRadius:'6vw',backgroundColor:colorMapWeak,marginRight:'5%',overflow:'hidden',
                                                         shadowOffset: { width: 0, height: '0.5vw' },
                                                         shadowOpacity: 0.25,
                                                         shadowRadius: 7,
                                                         elevation: 5,
                                                         justifyContent:'center'
                                                    }}>
                                                        <Image source={iconMap} style={{height:'65%',width:'100%',marginLeft:'auto',marginRight:'auto'}} resizeMode='stretch' />
                                                    </View>
                                                    <View style={{flex:3,height:'100%',width:'100%',borderRadius:'4vw',backgroundColor:colorMapWeak,overflow:'hidden',
                                                         shadowOffset: { width: 0, height: '0.5vw' },
                                                         shadowOpacity: 0.25,
                                                         shadowRadius: 7,
                                                         elevation: 5,
                                                         justifyContent:'center'
                                                    }}>
                                                        <Text style={[styles.textApartHome,{position:'static',textAlign:'center',fontSize:'2.5vh'}]}>{nameMap}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}                  
                            </View>
                        )}
                        {apartHomeSelect === 2 && (
                            <View style={{position:'relative',height:'52%',width:'100%',overflow:'scroll'}}>
                                    {musics.map(({nameMusic,imageMusic,music,colorBackgroundWeak,colorBackgroundStrong,isMusicBlocks,costUnlock},index)=>{
                                        return(
                                            <View key={`block_${index}`} style={{display:'flex',flexDirection:'row',width:'95%',height:'35%',marginLeft:'auto',marginRight:'auto',marginTop:'5%',backgroundColor:colorBackgroundWeak,borderRadius:'2vw',
                                                shadowOffset: { width: 0, height: '1.5vw' },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 3,
                                                elevation: 5,
                                                justifyContent:'center'
                                            }}>
                                                <ImageBackground source={imageMusic} resizeMode="stretch" style={{position:'relative',height:'100%',width:'40%'}} imageStyle={{height:'100%',width:'100%',borderTopLeftRadius:'2vw',borderBottomLeftRadius:'2vw'}}>
                                                    {isMusicBlocks&&(
                                                        <TouchableOpacity style={{position:'absolute',height:'100%',width:'100%',backgroundColor:'black',opacity:'0.8',zIndex:2,borderTopLeftRadius:'2vw',borderBottomLeftRadius:'2vw'}}
                                                            onPress={() => {
                                                                setFirstDialog({ state: true, type: 0 });
                                                                setPurchase({typePurchase:2,costPurchase:costUnlock,typeMoney:2,indexPurchase:index}) 
                                                            }}>
                                                            <Image source={require("../../../assets/images/game_lock.png")} style={{height:'50%',width:'50%',marginLeft:'auto',marginRight:'auto',marginTop:'10%'}} resizeMode='stretch' />
                                                            <View style={{position:'static',display:'flex',flexDirection:'row',justifyContent:'center',marginTop:'5%',marginLeft:'auto',marginRight:'auto',width:'60%',height:'25%',backgroundColor:'#9ef4fe',borderRadius:'5vw',borderWidth:'1vw',borderColor:'#147aff'}}>
                                                                <Image source={require("../../../assets/images/star_levels.webp")} style={{flex:1,position:'relative',height:'90%',width:'100%',left:'10%',top:'5%'}} resizeMode='stretch' />
                                                                <Text style={[styles.characterName,{position:'relative',fontFamily:'FontNumbers',fontSize:'2.5vh',flex:3,backgroundColor:'transparent',color:'#b4c110',top:'-15%',left:'-7%'}]}>{costUnlock}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                    {!isMusicBlocks&&(
                                                        <View style={{height:'100%',width:'100%',justifyContent:'center',zIndex:2}}>
                                                            <View style={{marginLeft:'auto',marginRight:'auto'}}>
                                                                <IconButtonSvg  SvgChildIcon = {IconSelect} backgroundButton = {index === selectMusic?"#345108":"#6f0c0c"} borderRadiusButton={"50%"} colorIcon= {"white"} sizeIcon = {40} sizeButton = {25} animationOptions = {{styleChange: styleChangeAnimationBattle , functionAnimation:(a)=>{animationFunctionBattle(a);setSelectMusic(index)}}} />
                                                            </View>
                                                        </View>
                                                    )}
                                                </ImageBackground>
                                                <View style={{position:'relative',height:'100%',width:'60%'}}>
                                                    <Text style={[styles.characterName,{position:'static',fontSize:'1.5vh',width:'100%',height:'25%',borderRadius:'0',paddingTop:'1vh',borderTopRightRadius:'2vw',backgroundColor:colorBackgroundStrong,color:'white'}]}>
                                                        {nameMusic.length > 30 ? nameMusic.slice(0, 30) + '...' : nameMusic}
                                                    </Text>
                                                    <View style={{position:'relative',justifyContent:'center',height:'75%',width:'100%'}}>
                                                        <CenterIconCircle onPressIcon={()=>{if(selectPlayMusic !== index){onActiveMusic(music);setSelectPlayMusic(index);}else if(selectPlayMusic === index){onBackgroundMusic();}}} imageSource={selectPlayMusic === index?require('../../../assets/images/pause_icon.png'):require('../../../assets/images/play_icon.png')} size={18} margin={ {top: '0', left: 'auto', right: 'auto', bottom:'0' }} backgroundColor={colorBackgroundStrong} />
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })} 
                            </View>
                    )}
                </View>
            )}
            <FooterLevels>
                {iconsFooter.map(({ Icon , props }, index) => {
                    return(
                            <View key={index} style={styles.iconWrapper}> 
                                <Icon  SvgChildIcon = {props.SvgChildIcon} backgroundButton = {props.backgroundButton} borderRadiusButton={props.borderRadiusButton} colorIcon= {apartNowGame === index?"#9ef4fe":props.colorIcon} sizeIcon = {props.sizeIcon} sizeButton = {props.sizeButton} animationOptions = {props.animationOptions} />
                            </View>
                    )
                })}
            </FooterLevels>
            
        </View>
    )
};
export default LevelsViewGame;
const styles = StyleSheet.create({
    containerLevels:{
        width:'100vw',
        height:'100vh',
        backgroundColor:'#9ef4fe',
        overflow:'hidden'
    },
    iconWrapper:{
        flex:1,
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center',
        marginLeft:'5%'
    },
    apartsHomeFlex:{
        display:'flex',
        height:'15%',
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection:'row'
    },
    textApartHome:{
        position:'absolute',
        width:'100%',
        top:'80%',
        left:'-7%',
        fontSize:'2.5vh',
        textAlign:'center',
        color:'white',
        fontFamily: 'Poppins-Bold'
    },
    arrowLeftContainer:{
        position:'absolute',
        textAlign:'center',
        justifyContent:'center',
        height:'auto',
        width:'auto',
        left:'2%',
        top:'40%',
        opacity:1,
        zIndex:3,
    },
    arrowRightContainer:{
        position:'absolute',
        textAlign:'center',
        height:'auto',
        width:'auto',
        left:'86%',
        top:'40%',
        justifyContent:'center',
        opacity:1,
        zIndex:3
    },
    characterName: {
        top: '100%',
        fontSize: 14,
        backgroundColor: '#147aff',
        color: '#9ef4fe',
        textAlign: 'center',
        borderRadius: 20,
        padding: 5,
    },
    mapContainer:{
        position:'relative',
        height:'30%',
        width:'85%',
        overflow:'hidden',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'5%',
        borderRadius:'4vw',
        borderTopLeftRadius:'6vw',
        borderTopRightRadius:'6vw',
        justifyContent:'center',
        alignContent:'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: '2.5vw' },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    insetOverlay: {
        position: 'absolute',
        top: '112%',
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
    insetOverlayChild: {
        position: 'absolute',
        top: '-1%',
        left: '0%',
        right: '-1%',
        height:'10%',
        width:'102%',
        zIndex:1,
        shadowOffset: { width: 0, height: '1vw' },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    tittleTextApart:{
        fontFamily:'Poppins-Bold',
        fontSize:'6vw',
        width:'95%',
        color:'white',
        textAlign:'center',
        marginTop:'4vw',
        marginLeft:'auto',
        marginRight:'auto',
        textShadowColor: 'white', 
        textShadowOffset: { width: '0vw', height: '-0.5vw' }, 
        textShadowRadius: 30,
      }
})