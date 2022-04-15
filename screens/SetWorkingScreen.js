import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import React from "react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { app } from "../firebase";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
const database = getDatabase(app);
const isiticiRef = ref(database, "isitici/isitici");
let isIsiticiAuto;
const SetWorkingScreen = () => {
  useEffect(() => {
    onValue(isiticiRef, (result) => {
      const data = result.val().auto;
      isIsiticiAuto = data;
    });
  }, [isIsiticiAuto]);
  const [sicaklik, setSicaklik] = useState(null);
  const [nem, setNem] = useState(null);
  const [isiticiIsAuto, setIsitici] = useState(isIsiticiAuto);

  const setSicaklikVeNem = () => {
    if ( sicaklik === null || nem === null) {
      console.log("sicaklik boş olamaz");
      return;
    } else {
      console.log(sicaklik);
      set(ref(database, "sicaklik/result/settable"), {
        sicaklik: sicaklik,
        nem: nem,
      });
    }
  };
  const isiticiSwitch = () => {
    setIsitici((isitici) => !isitici);
    const updates = {};
    updates["isitici/isitici/auto"] = isiticiIsAuto;
    update(ref(database), updates);
  };
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"position"}
      >
        <Card style={styles.detailContainer}>
          <Text style={styles.textContainer}>Sıcaklık</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSicaklik}
            value={sicaklik}
            placeholder="Set Sicaklik"
            keyboardType="numeric"
          />
          <Text style={styles.textContainer}>Nem</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNem}
            value={nem}
            placeholder="Set Nem"
            keyboardType="numeric"
          />

          <Button
            style={styles.btnContainer}
            title="Ayarla"
            onPress={setSicaklikVeNem}
          />
        </Card>
        <Card style={styles.isiticiContainer}>
          <Text style={styles.textContainer}>Isıtıcı is Auto</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isiticiIsAuto ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={isiticiSwitch}
            value={isiticiIsAuto}
          />
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SetWorkingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: "#696969",
    fontWeight: "bold",
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#696969",
  },
  detailContainer: {
    alignItems: "center",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    margin: 10,
  },
  btnContainer: {
    backgroundColor: "#81b0ff",
    borderRadius: 10,
    alignItems: "center",
  },
  isiticiContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    margin: 10,
  },
});
