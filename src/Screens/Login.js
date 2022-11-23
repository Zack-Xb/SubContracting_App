import { StyleSheet,View,SafeAreaView,Image,Platform, TouchableOpacity } from "react-native";
import { Layout } from "../components/Layout";
import {auth,db}  from "../../FirebaseSdk"
import React, {useEffect, useState,useContext} from 'react'
import Llogo from '../assets/xxLogo.png'
import { TextInput,FAB,Text } from "react-native-paper";
import {MaterialIcons,Ionicons, Fontisto} from "@expo/vector-icons";
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingView";
import { useMediaQuery } from "react-responsive";
import { getDoc,doc,query } from "firebase/firestore";
import { UserTypes } from "./UserTypes";


 const Login =()=>{

   const isTabletOrMobileDevice = useMediaQuery({    
      maxDeviceWidth: 1224,
   });

   const [hidePassword,setHidePassword]=useState(true);
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   
   const navigation = useNavigation();

   const handleLogin=()=>{
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
         const user = userCredential.user;
         console.log('Logged in with:', auth.currentUser.uid);
           
         const docRef= doc(db,'Users',auth.currentUser.uid);
         const docSnap =  getDoc(docRef);
         const userTypes = docSnap.then((doc)=>{
            console.log(doc.data().userType);
          const uT= doc.data().userType

            if(isTabletOrMobileDevice){
               if( uT=== 'Service Provider'){
                  navigation.navigate('SB');  
               }else if(uT === 'Project Manager'){
                  navigation.navigate('B');  
               }
            }else{
               if(uT === 'Service Provider'){
                  navigation.navigate('ServiceHome');  
               }else if(uT === 'Project Manager'){
                  navigation.navigate('Home');  
               }
            }
         })
        
      })
      .catch(error => alert(error.message));
   }
  
  if(isTabletOrMobileDevice ) {
   if(Platform.OS === 'web'){
   return(
     
      <Layout>
         
       <View style={ styles.LoginContainerM}>
        <View>
       <Image  style={styles.LoginImg} resizeMode={'cover'} source={Llogo}/>
       </View>
        <Text style={styles.LoginTextM}> Login</Text>
        <MyTextInput style={{height:40}} label={'email'} onChangeText={text => setEmail(text)} placeholder={'alpha@alphaplatform.com'}
        placeholderTextColor={'grey'} value={email} icon={'email'}  keyboardType="email-address"/>
         <MyTextInput style={{height:40}} label={'password'} onChangeText={text => setPassword(text)} placeholder={'********'}
        placeholderTextColor={'grey'} value={password} icon={'lock'} 
        secureTextEntry={hidePassword}
        isPassword={true}
        hidePassword={hidePassword}
        setHidePassword={setHidePassword} />
         <FAB style={  styles.Fab} label="Login" onPress={()=> handleLogin()}/>
         <View style={styles.Slink} >
         <Text style={styles.SLinkT1}>Don't Have an account already?</Text>
         <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
           <Text style={styles.SLinkT2}> Sign up</Text>
         </TouchableOpacity>
         </View>
       </View>
     
      </Layout>
      
      )
   }else{
      return(
     
         <Layout>
             <KeyboardAvoidingWrapper>
          <View style={ styles.LoginContainerM}>
           <View>
          <Image  style={styles.LoginImg} resizeMode={'cover'} source={Llogo}/>
          </View>
           <Text style={styles.LoginTextM}> Login</Text>
           <MyTextInput style={{height:40}} label={'email'} onChangeText={text => setEmail(text)} placeholder={'alpha@alphaplatform.com'}
           placeholderTextColor={'grey'} value={email} icon={'email'}  keyboardType="email-address"/>
            <MyTextInput style={{height:40}} label={'password'} onChangeText={text => setPassword(text)} placeholder={'********'}
           placeholderTextColor={'grey'} value={password} icon={'lock'} 
           secureTextEntry={hidePassword}
           isPassword={true}
           hidePassword={hidePassword}
           setHidePassword={setHidePassword} />
            <FAB style={  styles.Fab} label="Login" onPress={()=> handleLogin()}/>
            <View style={styles.Slink} >
            <Text style={styles.SLinkT1}>Don't Have an account already?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
              <Text style={styles.SLinkT2}> Sign up</Text>
            </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingWrapper>
         </Layout>
         
         )
   }
}else{ 
   return(
       <Layout>
        <View style={Platform.OS === 'web'  ? styles.LoginContainerW : styles.LoginContainerM}>
         <View>
        <Image  style={styles.LoginImg} resizeMode={'cover'} source={Llogo}/>
        </View>
         <Text style={Platform.OS === 'web'  ? styles.LoginTextW : styles.LoginTextM}> Login</Text>
         <MyTextInput style={{height:40}} label={'email'} onChangeText={text => setEmail(text)} placeholder={'alpha@alphaplatform.com'}
         placeholderTextColor={'grey'} value={email} icon={'email'}  keyboardType="email-address"/>
          <MyTextInput style={{height:40}} label={'password'} onChangeText={text => setPassword(text)} placeholder={'********'}
         placeholderTextColor={'grey'} value={password} icon={'lock'} 
         secureTextEntry={hidePassword}
         isPassword={true}
         hidePassword={hidePassword}
         setHidePassword={setHidePassword} />
          <FAB style={Platform.OS === 'web' ? styles.FabW : styles.Fab} label="Login" onPress={()=> handleLogin()}/>
          <View style={styles.Slink} >
          <Text style={styles.SLinkT1}>Don't Have an account already?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text style={styles.SLinkT2}> Sign up</Text>
          </TouchableOpacity>
          </View>
        </View>
       
       </Layout>
          );    
   
    
     
    }
   }

const MyTextInput= ({label,icon,isPassword,hidePassword,setHidePassword,...props})=>{
   return(
     <View style={Platform.OS === 'web' ? styles.MyTW : styles.MyT}>
    
         <Text style={{color:'white'}}>{label}</Text>
         <TextInput style={styles.StyleTinput} {...props} left={<TextInput.Icon name={icon} />} 
         right={isPassword ? <TextInput.Icon name={hidePassword ? 'eye-off': 'eye'} onPress={()=> setHidePassword(!hidePassword)}/> : null} />
         
     </View>
      );
   };
 
   export default Login;
const styles= StyleSheet.create({
  LoginContainerM:{
   display:'flex',
   width:'100%',
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'column',
   paddingTop:'17%'
   
 },
 LoginContainerW:{
   display:'flex',
   width:'100%',
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'column',
   paddingTop:'4%'
   
 },
 LoginTextM:{
   color:'white',
   fontSize:26,
   fontFamily:'Oswald',
   marginBottom:'5%',
   marginTop:'10%'
 },
 LoginTextW:{
   color:'white',
   fontSize: 40,
   fontFamily:'Oswald'
 },
LoginImg:{
   width: 300,
   height:300,
},
LeftIcon:{
   top:15,
   position: 'absolute',
   zIndex:1,
   
},
Styled_I:{
  height:20,
  width:40
},
StyleTinput:{
   paddingVertical:'10%',
   
},
RightIcon:{
 
   position: 'absolute',
   zIndex:5
},
MyT:{
   marginBottom:'5%',
   width: '75%',
},
MyTW:{
   marginBottom:'3%',
   width: '60%',
},
Fab:{
   marginTop:'10%',
   width:'75%',
   marginBottom:'10%'
},
FabW:{
   width:'60%',
   marginBottom:'5%'
},
Slink:{
   display:'flex',
   flexDirection:'row',
   justifyContent:'center',
   alignContent:'center'
},
SLinkT1:{
   color:'white',
   fontSize: 15,
   fontFamily:'Raleway'
},
SLinkT2:{
   color:'#7DF9FF',
   fontSize: 15,
   fontFamily:'Raleway'
},
})