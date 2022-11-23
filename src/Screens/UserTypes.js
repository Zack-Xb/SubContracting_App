import { View ,StyleSheet, Platform} from "react-native";
import { Layout } from "../components/Layout";
import { Card,Text,Button } from "react-native-paper";
import { updateDoc,doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db,auth } from "../../FirebaseSdk";
import { useMediaQuery } from "react-responsive";

export const UserTypes=()=>{
    const navigation= useNavigation();


   const isTabletOrMobileDevice = useMediaQuery({    
    maxDeviceWidth: 1224,
 });
   
    const handlePMType=async(props)=>{
      await updateDoc(doc(db,'Users',auth.currentUser.uid),{
         userType: 'Project Manager'
      })
      .then(()=>{
         if(isTabletOrMobileDevice){
        navigation.navigate('B')
         }else{
          navigation.navigate('Home')
         }
      })
      .catch(error =>alert(error.message));
        
    }
    const handleSPType=async(props)=>{
      await updateDoc(doc(db,'Users',auth.currentUser.uid),{
         userType: 'Service Provider'
      }).then(navigation.navigate('ServiceType')).catch(error =>alert(error.message));
        
    }
   if(Platform.OS === 'web'){
    return(
        <Layout>
            <Text style={style.TsW}>What type of user are you?</Text>
           <Card style={style.CardsW}>
           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content >
    </Card.Content>
    <Card.Actions>
      <Button mode="contained" onPress={()=>handlePMType()} style={style.button}  contentStyle={style.content}
      labelStyle={style.label}>
        Project Manager</Button>
    </Card.Actions>
  </Card>

  <Card style={style.Cards}>
  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
    </Card.Content>
    <Card.Actions >
      <Button mode="contained" onPress={()=>handleSPType()} style={style.button} contentStyle={style.content}
      labelStyle={style.label}>
        Service Provider</Button>
    </Card.Actions>
  </Card>
        </Layout>
    );
   }else{
    return(
      <Layout>
          <Text style={style.Ts}>What type of user are you?</Text>
         <Card style={style.Cards}>
         <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  <Card.Content >
  </Card.Content>
  <Card.Actions>
    <Button mode="contained" onPress={()=>handlePMType()} style={style.button}>Project Manager</Button>
  </Card.Actions>
</Card>

<Card style={style.Cards}>
<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  <Card.Content>
  </Card.Content>
  <Card.Actions >
    <Button mode="contained" onPress={()=>handleSPType()} style={style.button}>Service Provider</Button>
  </Card.Actions>
</Card>
      </Layout>
  );
   }
};

const style=StyleSheet.create({
    Ts:{
        fontFamily:'Oswald',
        fontSize:40,
        color:'#fff',
     
    },
    TsW:{
      fontFamily:'Oswald',
      fontSize:60,
      color:'#fff',
      marginTop:'1%'
  },
    Cards:{
        width:'60%',
        height:'30%',
        marginTop:'9%'
      
    },
    CardsW:{
      width:'60%',
      height:'30%',
      marginTop:'3%'
    
  },
    button:{
        marginLeft:'15%'
    },
    buttonW:{
      marginLeft:'15%',
  },
  content:{
    width:300,
    height:60,
    },
    label:{
      fontSize:20,
      fontFamily:'Raleway'
    }
})