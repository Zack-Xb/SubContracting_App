import { Appbar,Text } from "react-native-paper";
import { View } from "react-native";
export const Header =()=>{
    return(
        <Appbar.Header>
        <Appbar.Content >
          <View>
            <Text>Alpha Platform</Text>
          </View>
        </Appbar.Content>
      </Appbar.Header>
    );
};

