import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, Modal } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = () => {
    axios
      .get("http://192.168.48.172:8081/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleDeleteUser = () => {
    axios
      .delete(`http://192.168.48.172:8081/api/users/${selectedUserId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== selectedUserId));
        setSelectedUserId(null);
        setModalVisible(false);
      })
      .catch((error) => {
        alert("Error deleting user");
        console.error("Error:", error);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>City: {item.city}</Text>
            <Button
              title="Delete"
              onPress={() => {
                setSelectedUserId(item.id);
                setModalVisible(true);
              }}
            />
          </View>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text>Are you sure you want to delete this user?</Text>
          <Button title="Delete" onPress={handleDeleteUser} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    padding: 16,
  },
  userCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
});

export default UserList;
