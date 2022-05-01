import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  Alert,
} from "react-native";
import React from "react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { app } from "../firebase";
import {
  getDatabase,
  set,
  update,
  ref,
  child,
  get,
  onValue,
} from "firebase/database";
const database = getDatabase(app);
const dbRef = ref(getDatabase());

const SetWorkingScreen = () => {
  const [sicaklik, setSicaklik] = useState(null);
  const [nem, setNem] = useState(null);
  const [isiticiIsAuto, setIsitici] = useState(false);
  const [isHavalandirmaActive, setHavalandirmaActive] = useState(false);
  const isiticiRef = ref(database, "isitici/isitici");
  useEffect(() => {
    onValue(isiticiRef, (read) => {
      const data = read.val().auto;
      setIsitici(data);
    });
  }, [isiticiIsAuto]);

  const havalandırmaRef = ref(database, "havalandirma/havalandirmaMotoru");
  useEffect(() => {
    onValue(havalandırmaRef, (read) => {
      const data = read.val().isAuto;
      setHavalandirmaActive(data);
    });
  }, [isHavalandirmaActive]);

  const setSicaklikVeNem = () => {
    if (sicaklik === null || nem === null) {
      warningAlert();
      return;
    } else {
      set(ref(database, "sicaklik/result/settable"), {
        sicaklik: sicaklik,
        nem: nem,
      });
      successAlert();
    }
  };
  const successAlert = () =>
    Alert.alert(
      "Success",
      `Sıcaklık: ${sicaklik} Nem: ${nem} olarak ayarlandı`,
      [{ text: "OK" }]
    );
  const warningAlert = () =>
    Alert.alert("Warnig", "Sıcaklık veya Nem boş olamaz", [
      {
        text: "Cancel",

        style: "cancel",
      },
      { text: "OK" },
    ]);

  const isiticiSwitch = async () => {
    await setIsitici((isitici) => !isitici);

    const updates = {};
    updates["isitici/isitici/auto"] = !isiticiIsAuto;
    update(ref(database), updates);
  };
  const havalandırmaSwitch = () => {
    setHavalandirmaActive((hava) => !hava);
    const updates = {};
    updates["havalandirma/havalandirmaMotoru/isAuto"] = !isHavalandirmaActive;
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
        <Card style={styles.isiticiContainer}>
          <Text style={styles.textContainer}>Havalandırma is Auto</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isHavalandirmaActive ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={havalandırmaSwitch}
            value={isHavalandirmaActive}
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
