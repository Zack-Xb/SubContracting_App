import { View,FlatList,StyleSheet,TouchableOpacity,Platform } from "react-native";
import { Card,Text } from "react-native-paper";
import { Layout } from "../components/Layout";
//get data from firebase => vertically scrollable flatlist with the service choices (same as home page for PM)
//AdminSP->DOC-> services +-
import { getDocs,collection,query,updateDoc, doc,setDoc } from "firebase/firestore";
import { db,auth } from "../../FirebaseSdk";
import { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMediaQuery } from "react-responsive";

//optimize for web and get data for home flatlist from firebase, create admin functionality, delve into chat

export const ServiceType=()=>{
    const navigation=useNavigation();
    const [sp,Setsp]=useState([]);

    const isTabletOrMobileDevice = useMediaQuery({    
      maxDeviceWidth: 1224,
   });

    const handleChoice= async(title)=>{
       await updateDoc(doc(db,'Users',auth.currentUser.uid),{
        ServiceType: title
       }).then(()=>{
         setDoc(doc(db,title,auth.currentUser.uid),{
            name: auth.currentUser.displayName
         });
         if(isTabletOrMobileDevice){
          navigation.navigate('SB')
           }else{
            navigation.navigate('ServiceHome')
           }
          }
       ).catch(error =>alert(error.message));
    }

    const handleData=async()=>{
        const q=query(collection(db,'AdminSP'));
        const qS=getDocs(q);
        await qS.then(snapshot=>Setsp(
            snapshot.docs.map(doc=>({
                service:doc.data().service,
                image: doc.data().image
            }))
        )).catch(error =>alert(error.message));
        }      
      
        useEffect(()=>{
            handleData();
            console.log(sp)
        },[])
    

    const Item =({title,image,c})=>(
        <TouchableOpacity onPress={()=>{handleChoice(title)}}>
        <Card style={Platform.OS === 'web' ? style.CardsW:style.Cards}>
        <Card.Cover source={{ uri: image }} />
    <Card.Title title= {title}  titleStyle={{color:c,fontFamily:'Raleway'}} />
    <Card.Content>
    </Card.Content>
    <Card.Actions>
      
    </Card.Actions>
    </Card>
    </TouchableOpacity>
     );
     const renderItem = ({ item }) => (
        <Item title={item.service} image={item.image} c={'#fff'}/>
      );


    return(
        <Layout>
            <Text style={style.Ts}>What Service do you provide?</Text>
            <View style={style.ListView}>
            <FlatList
            data={sp}
            renderItem={renderItem}
            />
            </View>
            
        </Layout>
    );
};
const style=StyleSheet.create({
    Cards:{
      width:'70%',
      height:'13%'
    },
    ListView:{
       marginLeft:'18%',
        width:'90%',
        height:'80%'
  },
  ListViewW:{
    width:'30%'
  },
  Ts:{
    fontFamily:'Oswald',
    fontSize:40,
    color:'#fff',
    marginTop:'10%'
},
})