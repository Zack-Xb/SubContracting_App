import { Appbar,Searchbar,Text } from "react-native-paper";
import { View,StyleSheet, Platform,TouchableOpacity } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { getDocs,collection,query,updateDoc, doc,setDoc } from "firebase/firestore";
import { auth,db } from "../../../FirebaseSdk";

export const ServiceHomeBar=(props)=>{
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const[active,setActive]=useState(false);
    const[toggle,setToggle]=useState('packages');
    
const handleToggleSp=()=>{
  setToggle('sp');
}
const handleToggleP=()=>{
    setToggle('packages');
  }
  

    function handleClick() {
        setActive(true);
        console.log('active')
      }
      function handleCancel() {
        setActive(false);
        console.log('notactive')
      }
return(
    <>
    <Appbar style={Platform.OS === 'web'? style.appBW:style.appB}>
      <View style={style.column}>
        <Text style={ style.title}>Alpha Platform</Text>
        <View style={style.row}>
        <View onStartShouldSetResponder={()=>handleClick()} style={{width:'90%'}}>
        <Searchbar
               placeholder="Search projects"
               onChangeText={onChangeSearch}
               value={searchQuery}
               style={style.search}
               placeholderTextColor={'#fff'}
               iconColor={'#fff'}
               inputStyle={{color:"#fff"}}
               onPressIn={()=>handleClick()}
                />   
              </View>
              <Entypo name='cross' color={'#fff'} size={30} onPress={()=>handleCancel()} style={active ? '' : {display:'none'}}/>
        </View>
      </View>
  </Appbar>
  <View style={active? Platform.OS === 'web' ? style.activeSearchW : style.activeSearch : style.notActive }>
    <View style={style.searchToggle}>
        <TouchableOpacity style={{padding:10}} onPress={()=>handleToggleP()}>
            <Text style={toggle === 'packages' ? style.toggleTextactive:style.toggleText}>Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleToggleSp()}>
            <Text style={toggle === 'sp' ? style.toggleTextactive:style.toggleText}>Service Providers</Text>
            </TouchableOpacity>
    </View>
  </View>
  </>
);   
};

const style= StyleSheet.create({
    column:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      height:'100%',
      alignItems:'center',
      justifyContent:'center',
      zIndex:9999

    },
    row:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height: 40,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
       color:'#fff',
       fontFamily:'Oswald',
       fontSize:30,
       alignSelf:'center',
       marginBottom:'2%',
     
    },
    titleS:{
        display:'none'
     },
    search:{
       
        backgroundColor:'#222222'
    },
    appB:{
        height:'18%',
        paddingTop:'10%',
        backgroundColor:'#111111',
        transition: "all 1s ease-in-out",
        width:"100%"
    },
    appBs:{
        height:'15%',
        paddingTop:'17%',
        backgroundColor:'#111111',
        transition: "all 1s ease-in-out",

    },
    appBW:{
        height:'17%',
        paddingTop:'7%',
        backgroundColor:'#111111',
        transition: "all 1s ease-in-out",
        width:"100%"
    },
    activeSearch:{
     width:'100%',
     height:'83%',
     backgroundColor:'#222222',
     transition: "all 0.5s ease-in-out",
     flexDirection:'column',
     position:'absolute',
     bottom:0,
     alignItems:'center',
     zIndex:9999

    },
    activeSearchW:{
        width:'100%',
        height:'86.5%',
        backgroundColor:'#222222',
        transition: "all 0.5s ease-in-out",
        flexDirection:'column',
        position:'absolute',
        bottom:0,
        alignItems:'center',
        zIndex:9999
   
       },
    notActive:{
        display:'none'
    },
    searchToggle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'#111111',
        width:'100%'
    },
    toggleText:{
        color:'white',
        fontSize:20,
        fontFamily:'Raleway'
    },
    toggleTextactive:{
        color:'#03E1FF',
        fontSize:20,
        fontFamily:'Raleway',
    }

})