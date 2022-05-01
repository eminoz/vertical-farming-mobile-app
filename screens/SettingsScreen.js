import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Switch } from "react-native";
import Card from "../components/UI/Card";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  update,
  onValue,
} from "firebase/database";

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMotorActive, setMotorActive] = useState(false);
  const [isiticiActive, setIsiticiActive] = useState(false);
  const [havalandirma, setHavalandırma] = useState(false);

  const database = getDatabase(app);


  const ledRed = ref(database, "led");
  useEffect(() => {
    onValue(ledRed, (read) => {
      const data = read.val().led;
      setIsEnabled(data);
    });
  }, [isEnabled]);

  const sumotoruRef = ref(database, "sumotoru");
  useEffect(() => {
    onValue(sumotoruRef, (read) => {
      const data = read.val().motor;
      setMotorActive(data);
    });
  }, [isMotorActive]);

  const isiticiRef = ref(database, "isitici/isitici");

  useEffect(() => {
    onValue(isiticiRef, (read) => {
      const data = read.val().isActive;
      setIsiticiActive(data);
    });
  }, [isiticiActive]);

  const havalandırmaRef = ref(database, "havalandirma/havalandirmaMotoru");

  useEffect(() => {
    onValue(havalandırmaRef, (read) => {
      console.log(read.val());
      const data = read.val().isActive;
      setHavalandırma(data);
    });
  }, [havalandirma]);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const updates = {};
    updates["led/led"] = !isEnabled;
    update(ref(database), updates);
  };

  const motorSwitch = () => {
    setMotorActive((motor) => !motor);
    const updates = {};
    updates["sumotoru/motor"] = !isMotorActive;
    update(ref(database), updates);
  };

  const havalandırmaSwitch = () => {
    setHavalandırma((hava) => !hava);
    const updates = {};
    updates["havalandirma/havalandirmaMotoru/isActive"] = !havalandirma;
    update(ref(database), updates);
  };
  const isiticiSwitch = () => {
    setIsiticiActive((isitici) => !isitici);
    const updates = {};
    updates["isitici/isitici/isActive"] = !isiticiActive;
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
        <Card style={styles.detailContainer}>
          <Text style={styles.textContainer}>Havalandırma</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={havalandirma ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={havalandırmaSwitch}
            value={havalandirma}
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
