// components/UserDetail.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const UserDetail = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.48.172:8081/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user details", error));
  }, [id]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default UserDetail;
