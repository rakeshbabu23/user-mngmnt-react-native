// components/AddUser.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddUser = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const handleAddUser = () => {
    if (!name || !email || !city) {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://192.168.48.172:8081/api/user", { name, email, city })
      .then((response) => {
        alert("User added successfully");
        setName("");
        setEmail("");
        setCity("");
        navigation.navigate("UserList");
      })
      .catch((error) => {
        alert("Error adding user");
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Add User</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
        style={styles.input}
      />
      <Button title="Add User" onPress={handleAddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default AddUser;
