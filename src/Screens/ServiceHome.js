import { StyleSheet,View,SafeAreaView,FlatList,Platform,ScrollView, TouchableOpacity,Image,RefreshControl } from "react-native";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Avatar,Button,Card,Title,Paragraph,Text,Surface,FAB} from "react-native-paper";
import cardData from '../components/data/ServiceD'
import WcardDATA from '../components/data/ServiceDW'
import Carousel from 'react-native-reanimated-carousel';
import { ServiceHomeBar } from "../components/Appbars/ServiceHomeBar";
import { useState,useEffect,useCallback } from "react";
import { color, scrollTo } from "react-native-reanimated";
import { getDocs,collection,query,updateDoc, doc,setDoc } from "firebase/firestore";
import { auth,db,storage } from "../../FirebaseSdk";
import { useMediaQuery } from "react-responsive";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL,ref } from "firebase/storage";



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ServiceHome=()=>{
    const navigation=useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });

     const [sp,Setsp]=useState([]);
     const [spW,SetspW]=useState([]);
     const[data,setData]=useState([]);
    
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
      const handleDataW=async()=>{
        const q=query(collection(db,'AdminSPW'));
        const qS=getDocs(q);
        await qS.then(snapshot=>SetspW(
            snapshot.docs.map(doc=>({
                label1:doc.data().label1,
                label2:doc.data().label2,
                label3:doc.data().label3,
                image1: doc.data().image1,
                image2: doc.data().image2,
                image3: doc.data().image3,
            }))
        )).catch(error =>alert(error.message));
        }      
      
    
        const fetchProjects=async()=>{
           await getDocs(collection(db,'Projects'))
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

        if(isTabletOrMobileDevice === false){
          useEffect(()=>{
            handleDataW();
            console.log(sp);
        },[])
          }else{
      
          
          }

          const handleImgDownload=(image)=>{
             getDownloadURL(ref(storage,`ProjectImages/${image}`))
          .then((url)=>{
            return(url);
          }).catch((error)=>(alert(error.message))) }
          
           
     const Item =({title,image,c,name,docId,profile,description,discord,website,service})=>{
      const [X,setX]=useState('');

      useEffect(()=>{
        getDownloadURL(ref(storage,`ProjectImages/${image}`))
      .then((url)=>{
       setX(url)
    }).catch((error)=>(alert(error.message)));     
      },[])
     

        return(
        <View style={Platform.OS === 'web' ? style.ListViewMW: style.ListView}>
         <Card style={Platform.OS === 'web' ? style.CardsMW:style.Cards}  onPress={()=>navigation.navigate('dispProj',{
           title: title,
           name: name,
           display: image,
           id: docId,
           profileImg : profile,
           description: description,
           discord: discord,
           website: website,
           service: service
      })}>
             <Card.Cover source={{ uri: X}} style={{width:200,height:200}} />
         <Card.Title title= {title}  titleStyle={{color:c,fontFamily:'Raleway'}} />
     <Card.Content>
     </Card.Content>
     <Card.Actions>
       
     </Card.Actions>
     </Card>
     </View>
    
 );};
      const ItemW =({title1,title2,title3,image1,image2,image3,c})=>(
         <View style={style.Wcarousel}>
         <View style={image1 === '' ? {display:'none'} : style.ListViewW}>
         <Card style={Platform.OS === 'web' ? style.CardsW:style.Cards}>
         <Card.Cover source={{ uri: image1 }}  />
     <Card.Title title= {title1}  titleStyle={{color:c,fontFamily:'Raleway'}} />
     <Card.Content>
     </Card.Content>
     <Card.Actions>
       
     </Card.Actions>
     </Card>
     </View>
     <View style={image2 === '' ? {display:'none'} : style.ListViewW}>
     <Card style={Platform.OS === 'web' ? style.CardsW:style.Cards}>
     <Card.Cover source={{ uri: image2}} />
   <Card.Title title= {title2}  titleStyle={{color:c,fontFamily:'Raleway'}} />
   <Card.Content>
   </Card.Content>
   <Card.Actions>
   
   </Card.Actions>
   </Card>
   </View>
   <View style={image3 === '' ? {display:'none'} : style.ListViewW}>
     <Card style={Platform.OS === 'web' ? style.CardsW:style.Cards}>
     <Card.Cover source={{ uri: image3}} />
   <Card.Title title= {title3}  titleStyle={{color:c,fontFamily:'Raleway'}} />
   <Card.Content>
   </Card.Content>
   <Card.Actions>
   
   </Card.Actions>
   </Card>
   </View>
   
   </View>
      );
   
      const renderItem = ({ item }) => (
         <Item title={item.title} image={item.imageRef} c={'#fff'} name={item.name}  docId={item.id} 
         profile={item.profileImage} description={item.description} service={item.service} discord={item.discord} website={item.website}/>
       );
       const renderItemW = ({ item }) => (
         <ItemW title1={item.label1} title2={item.label2} title3={item.label3} 
         image1={item.image1} image2={item.image2} image3={item.image3} c={'#000'}/>
       );
   
   

   if(isTabletOrMobileDevice){
    return(
       <Layout>
         <ServiceHomeBar/>
         <View style={Platform.OS === 'web' ? style.ContainerMW:style.Container}>
          <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} >
          
          <Text style={style.services} >Projects</Text>
      
          <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
         
         <Text style={style.servicesT} >Tools</Text>
         <View style={style.listview}>
           <FAB label="List Package" onPress={()=>navigation.navigate('List')} style={{marginBottom:'3%'}}/>
           <FAB label="Edit Package" onPress={()=>navigation.navigate('Edit')} style={{marginBottom:'3%'}}/>
           <FAB label="Set Profile Display" onPress={()=>navigation.navigate('setDisp')} style={{marginBottom:'3%'}}/>
           <FAB label="Edit Profile Display" onPress={()=>navigation.navigate('editDisp')}/>
          </View>
        
         </ScrollView>
         </View>
       
       </Layout>
    )}else{
     return(
      <Layout>
        <Navbar/>
        <View style={style.ContainerW}>
        
             <Text style={Platform.OS === 'web' ? style.servicesW :style.services} >Projects</Text>
             
             <View  > 
         <Carousel
         width={1500}
         height={300}
         data={spW}
         renderItem={renderItemW}
     />
             </View>
             <Text style={Platform.OS === 'web' ? style.servicesW :style.services} >Tools</Text>
             <View style={style.listview}>
           <FAB label="List Package" onPress={()=>navigation.navigate('List')}/>
           <FAB label="Edit Package" onPress={()=>navigation.navigate('Edit')}/>
           <FAB label="Set Profile Display" onPress={()=>navigation.navigate('setDisp')} />
           <FAB label="Edit Profile Display" onPress={()=>navigation.navigate('editDisp')}/>
          </View>
             </View>
       </Layout>
     )
    }
}

const style = StyleSheet.create({
    Container:{
       display:'flex',
       flexDirection:'column',
       width:'95%',
       height:'90%',
       paddingBottom:'12%',
 
    },
    ContainerMW:{
     display:'flex',
     flexDirection:'column',
     width:'95%',
     height:'90%',
     paddingBottom:'4%',
   
  },
    ContainerW:{
     display:'flex',
     flexDirection:'column',
     width:'95%',
     height:'90%',
    paddingBottom:'3%'
 
    },
    Cards:{
      width:'100%',
      height:'23%',
      
    },
    CardsMW:{
     width:'90%',
     height:'23%',
     
   },
    CardsW:{
       width:'55%',
       height:'90%',
        
     },
    services:{
     fontFamily:'Oswald',
     fontSize:30,
     color:'#fff',
     paddingTop:'3%',
  
    },
    servicesW:{
       fontFamily:'Oswald',
       fontSize:40,
       color:'#fff',
       paddingTop:'1%'
      },
    ListView:{
     padding:'1%',
     marginBottom:'5%'
      
 },
 ListViewMW:{
   
   width:'100%'
    
 },
 ListViewW:{
   width:'40%',
   
 },
 Wcarousel:{
    display:'flex',
    flexDirection:'row',
    width:'80%',
    justifyContent:'space-between',
    alignItems:'center'
 },
  lpackage:{
    fontFamily:'Oswald',
    fontSize:25,
    color:'#fff',
    paddingTop:'3%'
   },
   surface:{
    backgroundColor:'grey',
    width:'40%',
    height:'95%',
    padding:'5%'
   },
    servicesT:{
     fontFamily:'Oswald',
     fontSize:30,
     color:'#fff',
     marginTop:'3%',
     alignSelf:'center'
     
    },
    toolsview:{
        display:'flex',
        flexDirection:'row',
        width:'95%',
        height:'40%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    listview:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      justifyContent:'space-evenly',
      alignItems:'center',
      height:'40%',
     
    }
 })