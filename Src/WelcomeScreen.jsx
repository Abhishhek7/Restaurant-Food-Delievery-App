import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Bounce animation for logo
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: bounceAnim }] }}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </Animated.View>
      
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Welcome to Gourmet Bistro
      </Animated.Text>
      <Text style={styles.subtitle}>Delicious flavors, crafted for you</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff6f61",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default WelcomeScreen;
