import * as React from 'react';
import { View,StyleSheet,TouchableOpacity, Keyboard,FlatList,Platform } from 'react-native';
import { Text,Appbar,Avatar,TextInput ,Card,ActivityIndicator,FAB} from 'react-native-paper';
import { auth,db,storage } from "../../../FirebaseSdk";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import { Layout } from '../../components/Layout';
import { useNavigation } from '@react-navigation/native';
import { useMediaQuery } from 'react-responsive';
import { query,getDocs,collection ,getDoc} from 'firebase/firestore';
import placeholder from '../../assets/Pl.png';
import Pfplaceholder from '../../assets/profilPl.png';

export const EditDisplay=()=>{
    const navigation=useNavigation();
    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
     });


    const[profileImg,setProfileImg]=React.useState(Pfplaceholder);
    const [ProfileimageUpload,setProfileImageUpload]=React.useState(null);
    const [description,setDescription]=React.useState('');
    const [pack,setPack]=React.useState('');
    const [completeS,setCompleteS]=React.useState(false);

    const fetchPackages=async()=>{
        const q=query(collection(db,'Users',auth.currentUser.uid,'Packages'));
      const qS=getDocs(q);
         await qS
         .then(snapshot=>setPack(snapshot.docs.map(doc=>({
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

       const fetchDescription=async()=>{
        const q=query(doc(db,'Service Provider',auth.currentUser.uid));
      const qS=getDoc(q);
         await qS
         .then((d)=>{setDescription(d.data().description);}
         
         ).catch(error =>alert(error.message));
       }

       const handleDisplay=()=>{
        
        const storageRef2= ref(storage,`Profile Photos/${auth.currentUser.uid}`);

        if(ProfileimageUpload != null){
          uploadBytes(storageRef2,ProfileimageUpload);
        }
       
       
        updateDoc(doc(db,'ServiceProvider',auth.currentUser.uid),{
          profileImage: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          description: description,
        }).then(()=>{
          alert('Upload was successfull');
         
          if(isTabletOrMobileDevice){
            navigation.navigate('SB')
        }else{
            navigation.navigate('ServiceHome')
        }
        
        });
       }

    React.useEffect(()=>{
    
        getDownloadURL(ref(storage,`Profile Photos/${auth.currentUser.uid}`)).then(
          (url)=>
          setProfileImg(url)
        ).catch((error)=>(alert(error.message)));
        fetchDescription;
        fetchPackages();
      },[])
      const ItemS =({title,image,c,name,docId,profile,rate,description})=>{
        const [X,setX]=React.useState('')
        React.useEffect(()=>{
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
         const renderItemS = ({ item }) => (
            <ItemS title={item.title} image={item.imageRef} c={'#fff'}  name={item.name}  docId={item.id} 
            profile={item.profileImage} rate={item.rate} description={item.description} />
           );

     if(isTabletOrMobileDevice){
        return(
            <Layout>
                 <Appbar style={style.header}>
          <Appbar.BackAction onPress={() => navigation.navigate('SB') } color='#fff' />
           <Appbar.Content title={'Edit Display Page'} titleStyle={style.title}/>
          </Appbar>
          <Avatar.Image size={70} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{alignSelf:'center'}} />
          <TouchableOpacity style={{width:'100%'}} onPress={()=> handleProfileUpload()} >
          <Text style={profileImg === Pfplaceholder ? style.displayPH :{display:'none'} }>Set profile photo</Text>
          </TouchableOpacity>
          <Text style={style.name}>{auth.currentUser.displayName}</Text>
          <View style={style.profileV}>
          <Text style={style.about}>About</Text>
         </View>
         <TouchableOpacity style={{width:'100%'}} activeOpacity={1} onPress={()=>Keyboard.dismiss()}>
         <TextInput multiline={true} label={'Edit Description'} style={style.titleDInput} value={description}  onChangeText={text => setDescription(text)} 
         />
         </TouchableOpacity>
         <View style={style.profileV}>
          <Text style={style.about}>Packages</Text>
         
         </View>
         <FlatList
          data={pack}
          renderItem={renderItemS}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop:"2%"}}
          />
             <View style={style.buttons}>
          <FAB label="Add Package" onPress={()=>navigation.navigate('List')} />
          <FAB label="Upload" onPress={()=>handleDisplay()} />
          </View>
        
            
            </Layout>
        )
     }else{
        return(
            <Layout>
                     <Appbar style={style.headerW}>
          <Appbar.BackAction onPress={() => navigation.navigate('ServiceHome') } color='#fff' />
           <Appbar.Content title={'Edit Display Page'} titleStyle={style.title}/>
          </Appbar>
             <Avatar.Image size={100} source={profileImg === Pfplaceholder ? profileImg : {uri: profileImg}} style={{alignSelf:'center'}} />
          <TouchableOpacity style={{width:'100%'}} onPress={()=> handleProfileUpload()} >
          <Text style={profileImg === Pfplaceholder ? style.displayPH :{display:'none'} }>Set profile photo</Text>
          </TouchableOpacity>
          <Text style={style.name}>{auth.currentUser.displayName}</Text>
          <View style={style.profileV}>
          <Text style={style.about}>About</Text>
         </View>
        
         <TextInput multiline={true} label={'Edit Description'} style={style.titleDInput} value={description}  onChangeText={text => setDescription(text)} 
         />
          <View style={style.profileV}>
          <Text style={style.about}>Packages</Text>
         </View>
          <FlatList
          data={pack}
          renderItem={renderItemS}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop:"2%"}}
          />
          <View style={style.buttons}>
          <FAB label="Add Package" onPress={()=>navigation.navigate('List')} style={{alignSelf:'center',marginBottom:'3%',marginTop:'2%'}}/>
          <FAB label="Upload" onPress={()=> handleDisplay()} style={{alignSelf:'center',marginBottom:'3%',marginTop:'2%'}}/>
          </View>
        
            </Layout>
        )
     }

}
const style= StyleSheet.create({
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
      displayPH:{
        fontFamily:'Raleway',
        fontSize:15,
        color:'#03E1FF',
        alignSelf:'center'
      },
      name:{
        fontFamily:'Raleway',
        fontSize:25,
        color:'#fff',
        alignSelf:'center'
      },
      title:{
        fontFamily:'Oswald',
        fontSize:30,
        color:'#fff',
        alignSelf:'center'
        
      },
      profileV:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height:'5%',
        backgroundColor:'#111111',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%'
      },
      about:{
        fontFamily:'Raleway',
        fontSize:20,
        color:'#03E1FF',
        alignSelf:'center',
      
      },
      titleDInput:{
        width:'80%',
        minHeight:130,
        marginTop:'5%',
        alignSelf:'center'
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
    buttons:{
      display:"flex",
      flexDirection:'row',
      justifyContent:'space-evenly',
      width:'80%',
      alignItems:'center'
      ,marginBottom:'20%'
      ,marginTop:'2%'
    }
})