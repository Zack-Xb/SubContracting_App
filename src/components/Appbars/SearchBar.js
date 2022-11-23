import { Appbar,Searchbar,Text } from "react-native-paper";
import { View,StyleSheet } from "react-native";
import { useState } from "react";
import {Ionicons} from "@expo/vector-icons";

export const SearchBar=()=>{
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return(
        <Appbar style={style.appb}>
            <View style={style.container}>
            <Searchbar
               placeholder="Search services"
               onChangeText={onChangeSearch}
               value={searchQuery}
                style={style.search}
                placeholderTextColor={'#fff'}
                iconColor={'#fff'}
                inputStyle={{color:"#fff"}}
                />     
            </View>
        </Appbar>
    );
}
const style = StyleSheet.create({
    edit:{
      color:'#0096FF',
      fontFamily:'Oswald',
      fontSize:20
    },
    container:{
        display:'flex',
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center'
    },
    appb:{
        backgroundColor:'#111111',
        minWidth:'100%',
        height:'15%',
        paddingTop:'10%',
        display:'flex',
        justifyContent:"center"
      
                
    },
    inbox:{
        color:'#fff',
        fontFamily:'Oswald',
        fontSize:20
    },
    search:{
       
        backgroundColor:'#222222'
    }
})