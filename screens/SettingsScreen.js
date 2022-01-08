import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings screen</Text>
      <Button
        title="Auth Setting"
        onPress={() => navigation.navigate("Auth")}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
