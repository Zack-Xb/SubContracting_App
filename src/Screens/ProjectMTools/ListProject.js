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



export const ListProject=()=>{
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });
     const navigation=useNavigation();
     const [imageUpload,setImageUpload]=useState(null);
     const [ProfileimageUpload,setProfileImageUpload]=useState(null);
     const [displayImg,setDisplayImg]=useState(placeholder);
     const [profileImg,setProfileImg]=useState(Pfplaceholder);
     const [title,setTitle]=useState('');
     const [description,setDescription]=useState('');
     const [service,setService]=useState('');
     const [docPackage,setDocPackage]=useState('');
     const [discord,setDiscord]=useState('');
     const [website,setWebsite]=useState('');
  
    
     useEffect(()=>{
    
      getDownloadURL(ref(storage,`Profile Photos/${auth.currentUser.uid}`)).then(
        (url)=>
        setProfileImg(url)
      ).catch((error)=>(alert(error.message)));
    },[])


//permissions
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



 const handleImgUpload=async()=>{
   const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing:true,
    aspect:[3,2],
    quality:1
   }) 
   if(!result.cancelled){
    const imageDoc= result.uri.split('/').pop() + uuidv4();
    const img = await fetch(result.uri);
    const bytes = await img.blob();

     setImageUpload(bytes);
     setDisplayImg(result.uri);
     setDocPackage(imageDoc);
   
    }; }
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
   
        setProfileImageUpload(bytes);
        setProfileImg(result.uri);
        
      
       }; }

     const handlePackage=()=>{
      const storageRef1= ref(storage,`ProjectImages/${docPackage}`);
      const storageRef2= ref(storage,`Profile Photos/${auth.currentUser.uid}`);

      uploadBytes(storageRef1,imageUpload);
      if(ProfileimageUpload != null){
        uploadBytes(storageRef2,ProfileimageUpload);
      }
      setDoc(doc(db,'Users',auth.currentUser.uid,'Projects',docPackage),{
        displayImage: docPackage,
        profileImage: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        title: title,
        description: description,
        service: service,
        discord: discord,
        website: website
      });
      setDoc(doc(db,'Projects',docPackage),{
        displayImage: docPackage,
        profileImage: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        title: title,
        description: description,
        service: service,
        discord: discord,
        website: website
      }).then(()=>{
        alert('Upload was successfull');
        if(isTabletOrMobileDevice){
            navigation.navigate('B')
        }else{
            navigation.navigate('Home')
        }
        
      });
     }


  if(isTabletOrMobileDevice){
    if(Platform.OS === 'web'){
        return(
            <Layout minH={true}>
              <>
              <Appbar style={style.header}>
              <Appbar.BackAction onPress={() => navigation.navigate('B') } color='#fff' />
               <Appbar.Content title={'List Project'} titleStyle={style.title}/>
              </Appbar>
               <View style={style.Plimg}>
                <Card>
                 <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} />
                 </Card>
                 <FAB
          icon="plus"
          style={style.fab}
          onPress={() => handleImgUpload()}
        />
               </View>
               <View style={style.profileV}>
               <Avatar.Image size={50} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
                  <Text style={style.name}>{auth.currentUser.displayName}</Text>
                  <TouchableOpacity style={{width:'100%'}} onPress={()=> handleProfileUpload()} >
                  <Text style={profileImg === Pfplaceholder ? style.displayPH :{display:'none'} }>Set display photo</Text>
                  </TouchableOpacity>
               </View>
              <View style={style.viewDiscWeb}>
              <TextInput  label={'Input Discord'} style={style.Input} value={discord} onChangeText={text => setDiscord(text)}/>
              <TextInput  label={'Input Website'} style={style.Input} value={website} onChangeText={text => setWebsite(text)}/>
              </View>
               <TextInput  label={'Input Title'} style={style.titleInput} value={title} onChangeText={text => setTitle(text)}/>
               <TextInput multiline={true} label={'Input Description'} style={style.titleDInput} value={description}  onChangeText={text => setDescription(text)}/>
               <TextInput  label={'Input Services Needed'} style={style.titleInput} value={service} onChangeText={text => setService(text)}/>
               <FAB label="Upload" onPress={()=>handlePackage()} style={style.Fab}/>
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
         <Appbar.Content title={'List Project'} titleStyle={style.title}/>
        </Appbar>
         <View style={style.Plimg}>
          <Card>
           <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} />
           </Card>
           <FAB
    icon="plus"
    style={style.fab}
    onPress={() => handleImgUpload()}
  />
         </View>
         <View style={style.profileV}>
         <Avatar.Image size={50} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
            <Text style={style.name}>{auth.currentUser.displayName}</Text>
            <TouchableOpacity style={{width:'100%'}} onPress={()=> handleProfileUpload()} >
            <Text style={profileImg === Pfplaceholder ? style.displayPH :{display:'none'} }>Set display photo</Text>
            </TouchableOpacity>
         </View>
         <View style={style.viewDiscWeb}>
              <TextInput  label={'Input Discord'} style={style.Input} value={discord} onChangeText={text => setDiscord(text)}/>
              <TextInput  label={'Input Website'} style={style.Input} value={website} onChangeText={text => setWebsite(text)}/>
              </View>
         <TextInput  label={'Input Title'} style={style.titleInput} value={title} onChangeText={text => setTitle(text)}/>
         <TextInput multiline={true} label={'Input Description'} style={style.titleDInput} value={description}  onChangeText={text => setDescription(text)}/>
         <TextInput  label={'Input Services Needed'} style={style.titleInput} value={service} onChangeText={text => setService(text)}/>
         <FAB label="Upload" onPress={()=>handlePackage()} style={style.Fab}/>
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
           <Appbar.Content title={'List Project'} titleStyle={style.title}/>
          </Appbar>
           <View style={style.PlimgW}>
            <Card>
             <Card.Cover source={displayImg === placeholder ? displayImg : {uri: displayImg}} style={{width:900,height:400}} />
             </Card>
             <FAB
      icon="plus"
      style={style.fabW}
      onPress={() => handleImgUpload()}
    />
           </View>
           <View style={style.profileVW}>
           <Avatar.Image size={80} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{marginLeft:'5%'}} />
           <View style={{width:'10%'}}>
              <Text style={style.name}>{auth.currentUser.displayName}</Text>
              </View>
              <TouchableOpacity style={{width:'10%'}} onPress={()=> handleProfileUpload()} >
              <Text style={profileImg === Pfplaceholder ? style.displayPH :{display:'none'} }>Set display photo</Text>
              </TouchableOpacity>
           </View>
           <View style={style.viewDiscWeb}>
              <TextInput  label={'Input Discord'} style={style.Input} value={discord} onChangeText={text => setDiscord(text)}/>
              <TextInput  label={'Input Website'} style={style.Input} value={website} onChangeText={text => setWebsite(text)}/>
              </View>
           <TextInput  label={'Input Title'} style={style.titleInput} value={title} onChangeText={text => setTitle(text)}/>
           <TextInput multiline={true} label={'Input Description'} style={style.titleDInput} value={description}  onChangeText={text => setDescription(text)}/>
           <TextInput  label={'Input Services Needed'} style={style.titleInput} value={service} onChangeText={text => setService(text)}/>
           <FAB label="Upload" onPress={()=>handlePackage()} style={style.FabW}/>
           
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
   },
   viewDiscWeb:{
    display:'flex',
    flexDirection:'row',
    width:'80%',
    justifyContent:'space-evenly',
    alignItems:'center'
   },
   Input:{
    width:'40%',
    height:40,
    marginTop:'5%'
   },
  
})