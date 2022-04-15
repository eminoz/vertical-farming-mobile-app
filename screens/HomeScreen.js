import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Card from "../components/UI/Card";
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details");
            }}
          >
            <Card style={styles.cardContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  margin: 20,
                  color: "#696969",
                }}
              >
                Show working system
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SetWorking");
            }}
          >
            <Card style={styles.cardContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  margin: 20,
                  color: "#696969",
                }}
              >
                Set Working Screen
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 20,
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 20,
    color: "#006400",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 15,
  },
});
export default HomeScreen;
