import { View,StyleSheet,Image ,TouchableOpacity, Platform} from "react-native";
import { Text,Card ,FAB,Appbar,TextInput,Avatar,IconButton} from "react-native-paper";
import { auth,db,storage } from "../../../FirebaseSdk";
import { useMediaQuery } from "react-responsive";
import { Layout } from "../../components/Layout";
import { ref,uploadBytes } from "firebase/storage";
import { getDocs,collection,query,updateDoc, doc,setDoc,addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Navbar } from "../../components/Navbar";




export const EditProjects=()=>{
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });
     const navigation=useNavigation();
     const[data,setData]=useState([]);
    
     const fetchProjects=async()=>{
        await getDocs(collection(db,'Users',auth.currentUser.uid,'Projects'))
        .then(snapshot=>setData(snapshot.docs.map(doc=>({
        id: doc.id,
        imageRef: doc.data().displayImage,
        profileImage: doc.data().profileImage,
        title: doc.data().title,
        service: doc.data().service ,
        discord: doc.data().discord,
        website: doc.data().website,
        name: doc.data().name,
        description: doc.data().description 
        }))))
      }
      
     useEffect(()=>{
        fetchProjects();
        console.log(data);
     },[])

     const Item=({title,name,Display,docId,profile,service,description,discord,website})=>(
      <Card style={{height:'80%',width:'80%',backgroundColor:'#111111',alignSelf:'center'}}>
       <Card.Title title={title} titleStyle={style.title}
       right={(props) => <IconButton {...props} icon="pencil-plus" 
       onPress={() => navigation.navigate('editProjx',{
           title: title,
           name: name,
           display: Display,
           id: docId,
           profileImg : profile,
           service: service ,
           description: description,
           discord: discord,
           website: website
       })}
        color={'#03E1FF'}/>}/>
      </Card>
     )
     const renderItem=({item})=>(
        <Item  title={item.title} docId={item.id} Display={item.imageRef} profile={item.profileImage} service={item.service}
        discord={item.discord} website={item.website} name={item.name} description={item.description} />
     )
    if(isTabletOrMobileDevice){
    return(
     <Layout>
      <Appbar style={style.header}>
          <Appbar.BackAction onPress={() =>  {if(isTabletOrMobileDevice){
            navigation.navigate('B')
        }else{
            navigation.navigate('Home')
        } }} color='#fff' />
           <Appbar.Content title={'Projects'} titleStyle={style.title}/>
          </Appbar>
        <FlatList
        data={data}
        renderItem={renderItem}
        style={{width:'100%',height:'100%'}}
        />
     </Layout>
    )
}else{
return(
    <Layout>
      <Navbar/>
         <FlatList
        data={data}
        renderItem={renderItem}
        />
    </Layout>
)
}
}

const style=StyleSheet.create({
 title:{
    fontFamily:"Oswald",
    fontSize:30,
    color:'white'
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
})