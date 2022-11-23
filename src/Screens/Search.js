import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { View,FlatList,ScrollView } from "react-native";
import  {HomeBar} from '../components/Appbars/HomeBar'
import { Card } from "react-native-paper";
import { auth,db,storage } from "../../FirebaseSdk";
import { query,getDocs,collection } from "firebase/firestore";
import * as React from 'react';
import { Text } from "react-native-paper";


export const Search=()=>{
 
   return(
    <Layout>
        <HomeBar s={true}/>
       <View style={{height:'90%',width:'90%',display:'flex',flexDirection:'column',alignItems:'center'}}>
         <Text style={{color:'#fff',fontSize:30,fontFamily:'Oswald'}}>Find the best Packages that suits your needs  </Text>
         <Text style={{color:'grey',fontSize:40,fontFamily:'Oswald'}}> OR  </Text>
         <Text style={{color:'#fff',fontSize:30,fontFamily:'Oswald'}}> Contact a service provider directly... </Text>
       </View>
    </Layout>
   );
}