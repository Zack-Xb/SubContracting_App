import { Appbar,Searchbar,Text } from "react-native-paper";
import { View,StyleSheet } from "react-native";
import { useState } from "react";
import {Ionicons} from "@expo/vector-icons";

export const OrderBar=()=>{
    return(
        <Appbar style={style.appb}>
            <View style={style.container}>
            <Ionicons name='notifications' color={'#fff'} size={30}/>
                <Text style={style.inbox}>Manage Orders</Text>
                 <Ionicons name='filter' color={'#fff'} size={30}/>
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
        height:'12%',
        paddingTop:'8%',
        display:'flex',
        justifyContent:"center"
      
                
    },
    inbox:{
        color:'#fff',
        fontFamily:'Oswald',
        fontSize:20
    }
})