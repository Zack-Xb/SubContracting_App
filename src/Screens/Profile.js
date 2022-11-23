import { View,Stylesheet } from "react-native";
import { ProfileBar } from "../components/Appbars/ProfileBar";
import { Layout } from "../components/Layout";
import { useMediaQuery } from "react-responsive";
import { Navbar } from "../components/Navbar";
import { FAB } from "react-native-paper";
import { auth } from "../../FirebaseSdk";
import { useNavigation } from "@react-navigation/native";

export const Profile=()=>{
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });
     const navigation= useNavigation();

     const handleSignUp=()=>{
        auth.signOut()
        .then(()=>{
             navigation.navigate('Login');
           
         })
         .catch(error=>alert(error.message));
     }
        
     if(isTabletOrMobileDevice){
        return(
            <Layout>
                <ProfileBar/>
                
                <FAB label={'Sign Out'} onPress={()=>handleSignUp()} style={{marginTop:'10%'}}/>
                    
            </Layout>
        );
     }else{
    return(
        <Layout>
            <Navbar />
           
            <View style={{height:'90%'}}>
               <FAB label={'Sign Out'} onPress={()=>handleSignUp()}/>
                </View>
        </Layout>
    );
     }
};