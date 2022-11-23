import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,StyleSheet,Platform
} from "react-native";

const KeyboardAvoidingWrapper =({children})=>{

    return(
     <KeyboardAvoidingView style={Platform.OS === 'web' ? style.W : style.M }  behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
          </TouchableWithoutFeedback>
      </ScrollView>
     </KeyboardAvoidingView>
    );

}
const style = StyleSheet.create({
    W:{display:'none'},
    M:{width:'100%',height:'100%'}
})
export default KeyboardAvoidingWrapper