import { Appbar,Searchbar,Text,Avatar } from "react-native-paper";
import { View,StyleSheet ,TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import {Ionicons,MaterialIcons} from "@expo/vector-icons";
import { auth,db,storage } from "../../../FirebaseSdk";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import pHolder from '../../assets/profilPl.png'
import * as ImagePicker from 'expo-image-picker';

export const ProfileBar=()=>{

const [dp,setDp]=useState('');
const [act,setAct]=useState('');

useEffect(()=>{
  (async()=>{
    if(Platform.OS !== 'web'){
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Sorry, enable your app permissions')
      }
      }
  })();
},[])

const handleProfileUpload=async()=>{
  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ImagePicker.MediaTypeOptions.All,
   allowsEditing:true,
   aspect:[4,3],
   quality:1
  }) 
  if(!result.cancelled){
  
   const img = await fetch(result.uri);
   const bytes = await img.blob();
   const storageRef2= ref(storage,`Profile Photos/${auth.currentUser.uid}`);

   await uploadBytes(storageRef2,bytes);
     alert('upload successfull');
     setAct('complete');
   }; }


const HandleImgDownload=()=>{
  getDownloadURL(ref(storage,`Profile Photos/${auth.currentUser.uid}`))
.then((url)=>{
   setDp(url)

}).catch((error)=>(setDp(null))) }

  useEffect(()=>{
    HandleImgDownload();
  },[act])

   return(
      <Appbar style={style.appb}>
       <View style={style.contatiner}>
       <Ionicons name='notifications' size={30} style={{alignSelf:'flex-end'}}/>
        <View style={style.contatiner2}>
        <Avatar.Image size={74} source={dp === null? pHolder: {uri: dp}} />
            <Text style={style.T}>{auth.currentUser.displayName}</Text>
        </View>
        <TouchableOpacity style={{width:'40%'}} onPress={()=> handleProfileUpload()} >
        <Text style={dp === null ? style.displayPH :{display:'none'} }>Set display photo</Text>
        <Text style={dp === null ?  {display:'none'}: style.displayPH }>Edit display photo</Text>
        </TouchableOpacity>
       </View>
      </Appbar>
    );
};
const style=StyleSheet.create({
    appb:{
        width:'100%',
        height:'20%',
        backgroundColor:'#03E1FF',
        paddingTop:'8%'
     },
      contatiner:{
        display:'flex',
        flexDirection:'column',
        width:'90%'
      },
      contatiner2:{
         display:'flex',
         flexDirection:"row",
         width:'50%',
         alignItems:"center"
      },
      T:{
        fontSize:30,
        fontFamily:'Oswald',
        color:'#111'
      },
      displayPH:{
        fontFamily:'Raleway',
        fontSize:15,
        color:'red',
        marginTop:'2%',
        marginLeft:'5%'
      },
    })