import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text> Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Detail", {
            user: {
              id: "jane",
              firstName: "Jane",
              lastName: "Done",
              age: 25,
            },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomeScreen;
