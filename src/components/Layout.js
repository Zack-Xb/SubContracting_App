import { StyleSheet,View,ScrollView } from "react-native";
import { Navbar } from "./Navbar";
import { HomeBar } from "./Appbars/HomeBar";
import { useMediaQuery } from "react-responsive";


export const Layout=({children,minH})=>{
  const isTabletOrMobileDevice = useMediaQuery({    
    maxDeviceWidth: 1224,
 });
    return(
        <View style={isTabletOrMobileDevice? minH ? styles.layoutMH: styles.layout : styles.layoutW}>
        
          {children}
        
        </View>
    );
}
const styles= StyleSheet.create({
    layout:{
      backgroundColor:'#222222',
      height:'100%',
      minWidth:'100%',
      display:'flex',
      alignItems:'center'
    },
    layoutW:{
      backgroundColor:'#222222',
      minHeight:'100%',
      minWidth:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    layoutMH:{
      backgroundColor:'#222222',
      minHeight:'100%',
      minWidth:'100%',
      display:'flex',
      alignItems:'center'
    },
})