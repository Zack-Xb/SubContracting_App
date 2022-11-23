import { View,StyleSheet,Image ,TouchableOpacity, Platform,ScrollView} from "react-native";
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



//get both ids
export const EditPackages=()=>{
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });
     const navigation=useNavigation();
     const[xata,setXata]=useState([]);
    
     const fetchPackages=async()=>{
        await getDocs(query(collection(db,'Users',auth.currentUser.uid,'Packages')))
        .then(snapshot=>setXata(snapshot.docs.map(doc=>({
        id: doc.id,
        imageRef: doc.data().displayImage,
        profileImage: doc.data().profileImage,
        title: doc.data().title,
        rate: doc.data().rate ,
        name: doc.data().name,
        description: doc.data().description 
        })))).catch(error =>alert(error.message));
      }
      
     useEffect(()=>{
        fetchPackages();
        console.log(xata);
     },[])

     const Item=({title,name,Display,docId,profile,rate,description})=>(
         <Card style={{height:'80%',width:'80%',backgroundColor:'#111111',alignSelf:'center'}}>
          <Card.Title title={title} titleStyle={style.title}
          right={(props) => <IconButton {...props} icon="pencil-plus" 
          onPress={() => navigation.navigate('editPackx',{
              title: title,
              name: name,
              display: Display,
              id: docId,
              profileImg : profile,
              rate: rate,
              description: description
          })}
           color={'#03E1FF'}/>}/>
         </Card>
        
     )
     const renderItem=({item})=>(
        <Item  title={item.title}  name={item.name} Display={item.imageRef} docId={item.id} profile={item.profileImage} rate={item.rate} description={item.description}/>
     )
    if(isTabletOrMobileDevice){
    return(
     <Layout>
      <Appbar style={style.header}>
          <Appbar.BackAction onPress={() => navigation.navigate('SB') } color='#fff' />
           <Appbar.Content title={'Packages'} titleStyle={style.title}/>
          </Appbar>
         <Text>{xata.description}</Text>
         
        <FlatList
        data={xata}
        renderItem={renderItem}
        keyExtractor={item=> item.imageRef}
        style={{width:'100%',height:'100%'}}
        />
       
     </Layout>
    )
}else{
return(
    <Layout>
        <Navbar/>
         <FlatList
        data={xata}
        renderItem={renderItem}
        />
    </Layout>
)
}
}

const style=StyleSheet.create({
 title:{
    fontFamily:"Oswald",
    fontSize:25,
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