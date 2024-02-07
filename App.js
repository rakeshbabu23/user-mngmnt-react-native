import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import DeleteUser from "./components/DeleteUser";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button onPress={() => navigation.navigate("AddUser")}>
                Add User
              </Button>
            ),
          })}
        />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{ title: "Delete User" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
