import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const Button = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.buttonTitleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonTitleStyle: {
    borderRadius: 10,
    padding: 10,
    fontSize: 23,
  },
});
