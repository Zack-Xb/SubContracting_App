import { StyleSheet,View,SafeAreaView,Image,Platform, TouchableOpacity } from "react-native";
import { Layout } from "../components/Layout";
import {auth,db}  from "../../FirebaseSdk"
import React, {useEffect, useState,useContext} from 'react'
import Llogo from '../assets/xxLogo.png'
import { TextInput,FAB,Text,Snackbar } from "react-native-paper";
import {MaterialIcons,Ionicons, Fontisto} from "@expo/vector-icons";
import {signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingView";
import { setDoc,query,doc } from "firebase/firestore";

//setDoc to Users collection with doc reference auth.currentuserid(sign up has to be done), check fields 
 const SignUp =()=>{
   const [hidePassword,setHidePassword]=useState(true);
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [fullName,setFullName] =useState('');
   const [confirmPassword,setConfirmPassword]=useState('');
   const [snackbar,setSnackbar]=useState(false)

   const navigation = useNavigation();

   const handleSignUp=()=>{
      if(password === confirmPassword){

   const OnDismissSnackbar=()=>{
      setSnackbar(false);
   }
      
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
         const user = userCredential.user;
         console.log('Signed Up with:', user.email);
         updateProfile(auth.currentUser,{
            displayName: fullName
         }).then(function(){}).catch(error =>alert(error.message));

        setDoc(doc(db,'Users',auth.currentUser.uid),{
             name:fullName,
             id: auth.currentUser.uid
         });

         if(Platform.OS === 'web'){
            navigation.navigate('UserType');  
            }else{
               navigation.navigate('UserType'); 
            }
      })
      .catch(error => alert(error.message));
   }else{
      setSnackbar(true);
   }
   }
  
if(Platform.OS === 'web'){
    return(
       <Layout>
        <View style={Platform.OS === 'web'  ? styles.LoginContainerW : styles.LoginContainerM}>
         <View>
        <Image  style={styles.LoginImg} resizeMode={'cover'} source={Llogo}/>
        </View>
         <Text style={Platform.OS === 'web'  ? styles.LoginTextW : styles.LoginTextM}>SignUp</Text>
         <MyTextInput style={{height:40}} label={'Name'} onChangeText={text => setFullName(text)} placeholder={'Bobby Axelrod'}
         placeholderTextColor={'grey'} value={fullName} icon={'account'}  />
         <MyTextInput style={{height:40}} label={'Email'} onChangeText={text => setEmail(text)} placeholder={'alpha@alphaplatform.com'}
         placeholderTextColor={'grey'} value={email} icon={'email'}  keyboardType="email-address"/>
          <MyTextInput style={{height:40}} label={'Password'} onChangeText={text => setPassword(text)} placeholder={'********'}
         placeholderTextColor={'grey'} value={password} icon={'lock'} 
         secureTextEntry={hidePassword}
         isPassword={true}
         hidePassword={hidePassword}
         setHidePassword={setHidePassword} />
          <MyTextInput style={{height:40}} label={'Confirm Password'} onChangeText={text => setConfirmPassword(text)} placeholder={'********'}
         placeholderTextColor={'grey'} value={confirmPassword} icon={'lock'} 
         secureTextEntry={hidePassword}
         isPassword={true}
         hidePassword={hidePassword}
         setHidePassword={setHidePassword} />
          <FAB style={Platform.OS === 'web' ? styles.FabW : styles.Fab} label="Sign Up" onPress={()=> handleSignUp()}/>
          <Snackbar 
          visible={snackbar}
          onDismiss={()=>setSnackbar(false)}
          duration={8000}
          style={styles.snack}
          action={{
            label: 'Okay',
            onPress: () => {
             setSnackbar(false);
            }}}
          >
            Your Passwords Don't match!
          </Snackbar>
          <View style={styles.Slink} >
          <Text style={styles.SLinkT1}>Have an account already?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.SLinkT2}> Sign in</Text>
          </TouchableOpacity>
          </View>
        </View>
       
       </Layout>
      
          );    
   
    }else{
      return(
          <Layout>
            <KeyboardAvoidingWrapper >
           <View style={Platform.OS === 'web'  ? styles.LoginContainerW : styles.LoginContainerM}>
            <View>
           <Image  style={styles.LoginImg} resizeMode={'cover'} source={Llogo}/>
           </View>
            <Text style={Platform.OS === 'web'  ? styles.LoginTextW : styles.LoginTextM}>SignUp</Text>
            <MyTextInput style={{height:40}} label={'Name'} onChangeText={text => setFullName(text)} placeholder={'Bobby Axelrod'}
            placeholderTextColor={'grey'} value={fullName} icon={'account'}  />
            <MyTextInput style={{height:40}} label={'Email'} onChangeText={text => setEmail(text)} placeholder={'alpha@alphaplatform.com'}
            placeholderTextColor={'grey'} value={email} icon={'email'}  keyboardType="email-address"/>
             <MyTextInput style={{height:40}} label={'Password'} onChangeText={text => setPassword(text)} placeholder={'********'}
            placeholderTextColor={'grey'} value={password} icon={'lock'} 
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword} />
             <MyTextInput style={{height:40}} label={'Confirm Password'} onChangeText={text => setConfirmPassword(text)} placeholder={'********'}
            placeholderTextColor={'grey'} value={confirmPassword} icon={'lock'} 
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword} />
             <FAB style={styles.Fab} label="Sign Up" onPress={()=> handleSignUp()}/>
             <View style={styles.Slink} >
             <Text style={styles.SLinkT1}>Have an account already?</Text>
             <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
               <Text style={styles.SLinkT2}> Sign in</Text>
             </TouchableOpacity>
             </View>
           </View>
           </KeyboardAvoidingWrapper>
           <Snackbar 
          visible={snackbar}
          onDismiss={()=>setSnackbar(false)}
          duration={8000}
          style={styles.snack}
          action={{
            label: 'Okay',
            onPress: () => {
             setSnackbar(false);
            }}}
          >
            Your Passwords Don't match!
          </Snackbar>
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
 
   export default SignUp;
const styles= StyleSheet.create({
   LoginContainerM:{
      display:'flex',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      paddingTop:'15%'
      
    },
    LoginContainerW:{
      display:'flex',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      paddingTop:'1%'
      
    },
 LoginTextM:{
   color:'white',
   fontSize:26
 },
 LoginTextW:{
   color:'white',
   fontSize: 40
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
   marginBottom:'5%'
},
FabW:{
   width:'60%',
   marginBottom:'1%'
},
Slink:{
   display:'flex',
   flexDirection:'row',
   justifyContent:'center',
   alignContent:'center',
   marginBottom:'3%'
},
SLinkT1:{
   color:'white',
   fontSize: 15
},
SLinkT2:{
   color:'#7DF9FF',
   fontSize: 15
},
snack:{
   width:'60%',
   display:'flex',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
   alignSelf:'center'
}
})