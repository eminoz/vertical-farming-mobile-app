import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Switch } from "react-native";
import Card from "../components/UI/Card";
import { app } from "../firebase";
import { getDatabase, set, ref } from "firebase/database";
const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const database = getDatabase(app);
  
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    set(ref(database, "led"), {
      led: isEnabled,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.detailContainer}>
          <Text style={styles.textContainer}>Led!</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    alignItems: "center",
  },
  detailContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#696969",
  },
});

