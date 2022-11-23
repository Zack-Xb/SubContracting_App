import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { InboxBar } from "../components/Appbars/InboxBar";
import { View } from "react-native";
import { useMediaQuery } from "react-responsive";


export const Inbox=()=>{
   const isTabletOrMobileDevice = useMediaQuery({    
      maxDeviceWidth: 1224,
   });

   if(isTabletOrMobileDevice){
      return(
         <Layout>
            <InboxBar/>
            <View style={{height:'90%'}}></View>
         </Layout>
        );
   }else{}
   return(
    <Layout>
       <Navbar/>
       <View style={{height:'90%'}}></View>
    </Layout>
   );
}