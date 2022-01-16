import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/UI/Card";
import { app } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
const DetailsScreen = () => {
  const [active, setActive] = useState(null);

  const database = getDatabase(app);

  const starCountRef = ref(database, "led/");

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().led;
      setActive(data);
    });
  }, [active]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.cardContainer}>
            <Text style={styles.lableText}>Led : </Text>
            <Text style={styles.ledInfo}>{active ? "OFF" : "ON"} </Text>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    height: "90%",
    maxWidth: 400,
    padding: 15,
    maxHeight: 400,
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
