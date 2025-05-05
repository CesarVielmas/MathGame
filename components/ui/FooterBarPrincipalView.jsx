import { StyleSheet,View} from 'react-native';

export default function FooterBarPrincipalView({iconsFooter = [],positionsButtons = [],backgroundFooter,heightFooter,widthFooter}) {
    //Variables
    
    //Functions
    
    //Loading
  
    return (
        <View style={[styles.footerView,{backgroundColor:backgroundFooter,height:`${heightFooter}vh`,width:`${widthFooter}vw`}]}>
            {iconsFooter.map(({ Icon , props }, index) => {
              const align = positionsButtons[index] || 'center';
              return(
                <View key={index} style={[styles.iconWrapper, { alignItems: align }]}> 
                  <Icon  SvgChildIcon = {props.SvgChildIcon} backgroundButton = {props.backgroundButton} borderRadiusButton={props.borderRadiusButton} colorIcon= {props.colorIcon} sizeIcon = {props.sizeIcon} sizeButton = {props.sizeButton} animationOptions = {props.animationOptions} />
                </View>
              )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
  footerView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
