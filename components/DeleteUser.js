// components/DeleteUser.js
import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import axios from "axios";

const DeleteUser = ({ userId, onDelete, onClose }) => {
  const handleDeleteUser = () => {
    console.log("192.168.48.172:8081/api/users/${Number(userId)}");
    axios
      .delete(`http://192.168.48.172:8081/api/users/${Number(userId)}`)
      .then(() => {
        onDelete();
        onClose();
      })
      .catch((error) => {
        alert("Error deleting user");
        console.error("Error:", error);
      });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.container}>
        <Text>Are you sure you want to delete this user?</Text>
        <Button title="Delete" onPress={handleDeleteUser} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
});

export default DeleteUser;
