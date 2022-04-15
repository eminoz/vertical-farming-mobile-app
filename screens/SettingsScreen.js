import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Switch } from "react-native";
import Card from "../components/UI/Card";
import { app } from "../firebase";
import { getDatabase, set, ref, update } from "firebase/database";

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMotorActive, setMotorActive] = useState(false);
  const [isiticiActive, setIsiticiActive] = useState(false);
  const database = getDatabase(app);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    set(ref(database, "led"), {
      led: isEnabled,
    });
  };
  const motorSwitch = () => {
    setMotorActive((motor) => !motor);
    set(ref(database, "sumotoru"), {
      motor: isMotorActive,
    });
  };
  const isiticiSwitch = () => {
    setIsiticiActive((isitici) => !isitici);
    const updates = {};
    updates["isitici/isitici/isActive"] = isiticiActive;
    update(ref(database), updates);
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
        <Card style={styles.detailContainer}>
          <Text style={styles.textContainer}>Su Motoru</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isMotorActive ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={motorSwitch}
            value={isMotorActive}
          />
        </Card>
        <Card style={styles.detailContainer}>
          <Text style={styles.textContainer}>Isıtıcı</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isiticiActive ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={isiticiSwitch}
            value={isiticiActive}
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    margin: 10,
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#696969",
  },
});
