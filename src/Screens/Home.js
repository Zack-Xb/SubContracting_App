import { StyleSheet,View,SafeAreaView,FlatList,Platform,ScrollView,RefreshControl } from "react-native";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Avatar,Button,Card,Title,Paragraph,Text,FAB,ActivityIndicator} from "react-native-paper";
import cardData from '../components/data/ServiceD'
import WcardDATA from '../components/data/ServiceDW'
import Carousel from 'react-native-reanimated-carousel';
import { HomeBar } from "../components/Appbars/HomeBar";
import { useState,useEffect,useCallback } from "react";
import { scrollTo } from "react-native-reanimated";
import { getDocs,collection,query,updateDoc, doc,setDoc } from "firebase/firestore";
import { auth,db,storage } from "../../FirebaseSdk";
import { useMediaQuery } from "react-responsive";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL,ref } from "firebase/storage";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

 const Home =()=>{
  const navigation=useNavigation();
  const isTabletOrMobileDevice = useMediaQuery({    
    maxDeviceWidth: 1224,
 });
 const [refreshing, setRefreshing] = useState(false);

 const onRefresh = useCallback(() => {
   setRefreshing(true);
   wait(2000).then(() => setRefreshing(false));
   setCompleteS(false);
   setCompleteP(false);
 }, []);

  
   const [sp,Setsp]=useState([]);
   const [spW,SetspW]=useState([]);
   const [completeS,setCompleteS]=useState(false);
   const [completeP,setCompleteP]=useState(false);

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

    const[xata,setXata]=useState([]);
    const[pata,setPata]=useState([]);

    const fetchPackages=async()=>{
      const q=query(collection(db,'Packages'));
    const qS=getDocs(q);
       await qS
       .then(snapshot=>setXata(snapshot.docs.map(doc=>({
       id: doc.id,
       imageRef: doc.data().displayImage,
       profileImage: doc.data().profileImage,
       title: doc.data().title,
       rate: doc.data().rate ,
       name: doc.data().name,
       description: doc.data().description 
       }))
       )).catch(error =>alert(error.message));
     }
     const fetchProjects=async()=>{
      await getDocs(collection(db,'Projects'))
      .then(snapshot=>setPata(snapshot.docs.map(doc=>({
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
       fetchPackages();
       fetchProjects();
       console.log(xata);
    },[])


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
  
   
   
    if(isTabletOrMobileDevice === false){
      useEffect(()=>{
        handleDataW();
        console.log(spW);
    },[])
    }else{
      useEffect(()=>{
        handleData();
        console.log(sp);
    },[])
    }
 

   const Item =({title,image,c})=>(
     <View style={Platform.OS === 'web' ? style.ListViewMW: style.ListView}>
      <Card style={Platform.OS === 'web' ? style.CardsMW:style.Cards}>
      <Card.Cover source={{ uri: image }} style={{width:'100%'}}/>
      <Card.Title title= {title}  titleStyle={{color:c,fontFamily:'Raleway'}} />
  <Card.Content>
  </Card.Content>
  <Card.Actions>
    
  </Card.Actions>
  </Card>
  </View>
   );
   const ItemProj =({title,image,c,name,docId,profile,description,discord,website,service})=>{
    const [P,setP]=useState('')
    useEffect(()=>{
      getDownloadURL(ref(storage,`ProjectImages/${image}`))
   .then((url)=>{
        setP(url);
        setCompleteP(true);
     }).catch((error)=>(alert(error.message)));
    },[])
    return(
    <View style={Platform.OS === 'web' ? style.ListViewMW: style.ListView}>
     <Card style={Platform.OS === 'web' ? style.CardsMW:style.Cards} onPress={()=>navigation.navigate('dispProj',{
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
     <Card.Cover source={{ uri: P }} style={completeP ? isTabletOrMobileDevice?  {width:200}:{minHeight:400,width:400} : {display:'none'}}/>
    
      <ActivityIndicator animating={true} style={completeS ? {display:'none'}:''} size={'large'}/>
      
     <Card.Title title= {title}  titleStyle={{color:c,fontFamily:'Raleway'}} />
 <Card.Content>
 </Card.Content>
 <Card.Actions>
   
 </Card.Actions>
 </Card>
 </View>
   )};
   const ItemS =({title,image,c,name,docId,profile,rate,description})=>{
    const [X,setX]=useState('')
    useEffect(()=>{
      getDownloadURL(ref(storage,`PackageImages/${image}`))
   .then((url)=>{
        setX(url);
        setCompleteS(true);
     }).catch((error)=>(alert(error.message)));
    },[])
   
      return(

      <View style={Platform.OS === 'web' ? style.ListViewMW: style.ListView}>
      <Card style={Platform.OS === 'web' ? style.CardsMW:style.Cards} onPress={()=>navigation.navigate('dispPack',{
           title: title,
           name: name,
           display: image,
           id: docId,
           profileImg : profile,
           rate: rate,
           description: description,
         
      })}>

       <Card.Cover source={{uri: X}} style={completeS ? isTabletOrMobileDevice? {width:200}:{minHeight:400,width:400} : {display:'none'}} />
      
      <ActivityIndicator animating={true} style={completeS ? {display:'none'}:''} size={'large'}/>
      
       
     
      <Card.Title title= {title}  titleStyle={{color:c,fontFamily:'Raleway'}} />
  <Card.Content>
  </Card.Content>
  
  </Card>
  </View>
      )
      };
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

   const renderItemS = ({ item }) => (
     <ItemS title={item.title} image={item.imageRef} c={'#fff'}  name={item.name}  docId={item.id} 
     profile={item.profileImage} rate={item.rate} description={item.description} />
    );
    const renderItem = ({ item }) => (
      <Item title={item.service} image={item.image} c={'#fff'}/>
    );
    const renderItemProj = ({ item }) => (
      <ItemProj title={item.title} image={item.imageRef} c={'#fff'}  name={item.name}  docId={item.id} 
      profile={item.profileImage} description={item.description} service={item.service} discord={item.discord} website={item.website}/>
    );
    const renderItemW = ({ item }) => (
      <ItemW title1={item.label1} title2={item.label2} title3={item.label3} 
      image1={item.image1} image2={item.image2} image3={item.image3} c={'#000'}/>
    );


    if(isTabletOrMobileDevice){  
      return(
        <Layout>
          <HomeBar />
           <View style={Platform.OS === 'web' ? style.ContainerMW:style.Container}>
          <ScrollView  showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} >
          <View style={style.listview}>
           <FAB label="List Project" onPress={()=>navigation.navigate('ListProj')}/>
           <FAB label="Edit Project" onPress={()=>navigation.navigate('EditProj')}/>
          </View>
          <Text style={style.services} >Services</Text>
          <FlatList
          data={sp}
          renderItem={renderItem}
          keyExtractor={item => item.service}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
          <Text style={style.services} >Packages</Text>
        
        
          <FlatList
          data={xata}
          renderItem={renderItemS}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
          <Text style={style.services} >Projects</Text>
      

         

       
          <FlatList
          data={pata}
          renderItem={renderItemProj}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginBottom:'5%'}}
          />
        
        
         
       
         </ScrollView>
         </View>
       
        </Layout>
           );
      
    }else {
     
           return(
            <Layout >
              <Navbar/>
              <View style={style.ContainerW}>
              <View style={style.listview}>
           <FAB label="List Project" onPress={()=>navigation.navigate('ListProj')}/>
           <FAB label="Edit Project" onPress={()=>navigation.navigate('EditProj')}/>
          </View>
              <Text style={Platform.OS === 'web' ? style.servicesW :style.services} >Services</Text>
             <View  > 
         <Carousel
         width={1500}
         height={300}
         data={spW}
         renderItem={renderItemW}
     />
             </View>
             <Text style={Platform.OS === 'web' ? style.servicesW :style.services} >Packages</Text>
             <View style={{width:'100%'}} > 
             <FlatList
          data={xata}
          renderItem={renderItemS}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginBottom:'5%',width:'100%'}}
          />

             </View>
             <Text style={Platform.OS === 'web' ? style.servicesW :style.services} >Projects</Text>
             <View style={{width:'100%'}} > 
         {/* <Carousel
           loop
           autoPlayInterval={2000}
           autoPlay
         width={700}
         height={500}
         data={pata}
         renderItem={renderItemProj}
        
     /> */}
     <FlatList
          data={pata}
          renderItem={renderItemProj}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginBottom:'5%',width:'100%'}}
          />

             </View>
    
             </View>
            </Layout>
               );
         
      
     
      }
}

export default Home;

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
   paddingBottom:'12%'

   },
   Cards:{
     width:'100%',
     height:'23%',
     
   },
   CardsMW:{
    width:'90%',
    height:'50%',
    
  },
   CardsW:{
      width:'55%',
      height:'90%',
       
    },
   services:{
    fontFamily:'Oswald',
    fontSize:30,
    color:'#fff',
    paddingTop:'3%'
   },
   servicesW:{
      fontFamily:'Oswald',
      fontSize:40,
      color:'#fff',
      paddingTop:'1%'
     },
   ListView:{
    padding:'1%',
   
     
},
ListViewMW:{
  height:'100%',
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
listview:{
  display:'flex',
  flexDirection:'row',
  width:'95%',
  justifyContent:'space-evenly',
  alignItems:'center',
  height:'10%'
}
   
})