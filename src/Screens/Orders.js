import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import {OrderBar} from '../components/Appbars/OrderBar'
import { View } from "react-native";
import { useMediaQuery } from "react-responsive";


export const Orders=()=>{
   const isTabletOrMobileDevice = useMediaQuery({    
      maxDeviceWidth: 1224,
   });
   if(isTabletOrMobileDevice){
      return(
      <Layout>
      <OrderBar/>
      <View style={{height:'90%'}}></View>
   </Layout>
  );
   }else{
   return(
    <Layout>
       <Navbar/>
       <View style={{height:'90%'}}></View>
    </Layout>
   );
   }
}