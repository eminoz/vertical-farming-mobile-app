import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/UI/Card";
import { app } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
const DetailsScreen = () => {
  const [active, setActive] = useState(true);
  const [motorIsActive, setMotorActive] = useState(true);
  const [havalandırma, setHavalandirma] = useState(true);
  const [isitici, setIsitici] = useState(true);
  const [nem, setNem] = useState(null);
  const [derece, setDerece] = useState(null);

  const database = getDatabase(app);

  const starCountRef = ref(database, "led/");
  const suMotoruRef = ref(database, "sumotoru/");
  const sicaklikRef = ref(database, "sicaklik/");
  const isiticiRef = ref(database, "isitici/");
  const havalandırmaRef = ref(database, "havalandirma/");

  useEffect(() => {
    onValue(havalandırmaRef, (result) => {
      const data = result.val().havalandirmaMotoru;
      setHavalandirma(data.isActive);
    });
  }, [havalandırma]);
  useEffect(() => {
    onValue(isiticiRef, (result) => {
      const data = result.val().isitici.auto;

      setIsitici(data.isActive);
    });
  }, [isiticiRef]);
  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().led;
      setActive(data);
    });
  }, [active]);

  useEffect(() => {
    onValue(suMotoruRef, (motor) => {
      const data = motor.val().motor;
      setMotorActive(data);
    });
  }, [motorIsActive]);
  useEffect(() => {
    onValue(sicaklikRef, (read) => {
      const derece = read.val().result.current.sicaklik;
      const nem = read.val().result.current.nem;
      setDerece(derece);
      setNem(nem);
    });
  }, [derece, nem]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Led : </Text>
            <Text style={styles.ledInfo}>{active ? "OFF" : "ON"} </Text>
          </Card>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Su Motoru:</Text>
            <Text style={styles.ledInfo}>{motorIsActive ? "OFF" : "ON"}</Text>
          </Card>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Derece / Nem</Text>
            <Text style={styles.ledInfo}>{`${derece} / %${nem}`}</Text>
          </Card>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Havalandırma</Text>
            <Text style={styles.ledInfo}>{`${
              havalandırma ? "OFF" : "ON"
            }`}</Text>
          </Card>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Isıtıcı</Text>
            <Text style={styles.ledInfo}>{`${isitici ? "OFF" : "ON"}`}</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: "90%",
    maxWidth: 400,
    padding: 15,
    maxHeight: 400,
    margin: 10,
  },
  lableText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#556b2f",
  },
  ledInfo: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    margin: 15,
  },
});
