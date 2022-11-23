import { View,StyleSheet,Image ,TouchableOpacity, Platform} from "react-native";
import { Text,Card ,FAB,Appbar,TextInput,Avatar} from "react-native-paper";
import { auth,db,storage } from "../../../FirebaseSdk";
import { useMediaQuery } from "react-responsive";
import { Layout } from "../../components/Layout";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { getDocs,collection,query,updateDoc, doc,setDoc,addDoc } from "firebase/firestore";
import placeholder from '../../assets/Pl.png';
import Pfplaceholder from '../../assets/profilPl.png';
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
const { v4: uuidv4 } = require('uuid');
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingView";

//template page to enter package data



export const Package=({route})=>{
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });
     const navigation=useNavigation();
    
     const [displayImg,setDisplayImg]=useState(placeholder);
     const [profileImg,setProfileImg]=useState(Pfplaceholder);
     const [title,setTitle]=useState(route.params.title);
     const [description,setDescription]=useState(route.params.description);
     const [rate,setRate]=useState(route.params.rate);
     const [name,setName]=useState(route.params.name);
  
    
     useEffect(()=>{
      
      getDownloadURL(ref(storage,`PackageImages/${route.params.display}`)).then(
        (url)=>
        setDisplayImg(url)
      ).catch((error)=>(alert(error.message)));
      getDownloadURL(ref(storage,`Profile Photos/${route.params.profileImg}`)).then(
        (url)=>
        setProfileImg(url)
      ).catch((error)=>(alert(error.message)));
    },[])


  if(isTabletOrMobileDevice){
    if(Platform.OS === 'web'){
      return(
       
        <Layout minH={true}>
          <>
          <Appbar style={style.header}>
          <Appbar.BackAction onPress={() => navigation.navigate('B') } color='#fff' />
           <Appbar.Content title={title} titleStyle={style.title}/>
          </Appbar>
           <View style={style.Plimg}>
            <Card>
             <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} />
             </Card>
        
           </View>
           <View style={style.profileV}>
           <Avatar.Image size={50} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
              <Text style={style.name}>{name}</Text>
           </View>
          
           <Text style={style.titleInput} >{title}</Text>
           <Text  style={style.titleDInput}> {description}</Text>
           <Text style={style.titleInput} >{rate}</Text>
           <FAB label="Order"  style={style.Fab}/>
           </>
        </Layout>
      
       
          )
    }else{
    return(
      <KeyboardAvoidingWrapper >
      <Layout minH={true}>
        <>
        <Appbar style={style.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('B') } color='#fff' />
         <Appbar.Content title={title} titleStyle={style.title}/>
        </Appbar>
         <View style={style.Plimg}>
          <Card>
           <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} />
           </Card>
       
         </View>
         <View style={style.profileV}>
         <Avatar.Image size={50} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
            <Text style={style.name}>{name}</Text>
          
         </View>
        
         <Text style={style.titleInput} >{title}</Text>
           <Text  style={style.titleDInput}> {description}</Text>
           <Text style={style.titleInput} >{rate}</Text>
         <FAB label="Order"  style={style.Fab}/>
         </>
      </Layout>
      </KeyboardAvoidingWrapper>
     
        )
    }
  }else{
    return(
       
        <Layout minH={true}>
         
          <Appbar style={style.headerW}>
          <Appbar.BackAction onPress={() => navigation.navigate('Home') } color='#fff' />
           <Appbar.Content title={title} titleStyle={style.title}/>
          </Appbar>
           <View style={style.PlimgW}>
            <Card>
             <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} style={{width:900,height:400}} />
             </Card>
    
           </View>
           <View style={style.profileVW}>
           <Avatar.Image size={80} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
           <View style={{width:'10%'}}>
              <Text style={style.name}>{name}</Text>
              </View>
             
           </View>
           <Text style={style.titleInput} >{title}</Text>
           <Text  style={style.titleDInput}> {description}</Text>
           <Text style={style.titleInput} >{rate}</Text>
           <FAB label="Order"  style={style.FabW}/>
           
        </Layout> 
          )
    
}; 
};

const style=StyleSheet.create({
  Plimg:{
    width:'95%',
    height:'25%',
   
  },
  PlimgW:{
    marginTop:'3%',
   
  },
  fab:{
    marginTop:'-8%',
    zIndex:9000,
    width:'13%',
    borderRadius:'80%'
  },
  fabW:{
    marginTop:'-5%',
    zIndex:9000,
    width:'7%',
    borderRadius:'60%'
  },
  header:{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    height:'13%',
    paddingTop:'5%',
    alignItems:'center',
    backgroundColor:'transparent',
  },
  headerW:{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    height:'10%',
    paddingTop:'2%',
    alignItems:'center',
    backgroundColor:'transparent',
  },
  profileV:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height:'7%',
    backgroundColor:'#111111',
    alignItems:'center'
  },
  profileVW:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height:'7%',
    backgroundColor:'#111111',
    alignItems:'center',
    justifyContent:'space-between'
  },
  name:{
    fontFamily:'Raleway',
    fontSize:25,
    color:'#fff',
    marginLeft:'5%'
  },
  title:{
    fontFamily:'Oswald',
    fontSize:30,
    color:'#fff',
    alignSelf:'center'
    
  },
  displayPH:{
    fontFamily:'Raleway',
    fontSize:15,
    color:'#03E1FF',
    marginLeft:'5%'
  },
  titleInput:{
   width:'80%',
   height:60,
   marginTop:'5%'
  },
  titleDInput:{
    width:'80%',
    minHeight:100,
    marginTop:'5%'
   },
   Fab:{
    width:'60%',
    marginTop:'10%'
   },
   FabW:{
    width:'60%',
    marginTop:'5%',
    marginBottom:'5%'
   }

  
})