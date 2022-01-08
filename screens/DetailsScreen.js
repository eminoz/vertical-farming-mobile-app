import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const { itemId, user } = route.params;
  console.log(route.params);
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,marginTop:100}}   >
        <Text>Details Screen</Text>
        <Text> name : {JSON.stringify(user.firstName)} </Text>
        <Text> initial : {JSON.stringify(itemId)} </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
