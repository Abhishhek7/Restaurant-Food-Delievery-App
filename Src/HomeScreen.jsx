import React from "react";
import  { useContext } from "react";
import { useCart } from "./CartContext"; // ✅ Correct
import { useState,useEffect } from "react";
import * as Location from "expo-location";


import { View, Text,Button, Alert, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";

const dishes = [
  { id: "1", name: "Grilled Salmon", price: "1800", image: require("../assets/salmon.jpeg") },
  { id: "2", name: "Pasta Alfredo", price: "1500", image: require("../assets/pasta.jpeg") },
  { id: "3", name: "Veggie Pizza", price: "800", image: require("../assets/pizza.webp") },
];

const signatureDishes = [   
  { id: "1", name: "Truffle Steak", price: "2500", description: "Premium beef steak with truffle sauce", image: require("../assets/steak.jpeg") },
  { id: "2", name: "Lobster Bisque", price: "2200", description: "Rich and creamy lobster soup", image: require("../assets/bisque.jpeg") },
  { id: "3", name: "Sushi Platter", price: "3000", description: "Fresh sushi selection by our top chef", image: require("../assets/sushi.webp") },
  { id: "4", name: "Chocolate Lava Cake", price: "1200", description: "Warm chocolate cake with melting center", image: require("../assets/cake.jpeg") },
];
const reviews = [
    {
      id: "1",
      name: "Sophia Carter",
      rating: 5,
      review: "Absolutely loved the food! The sushi platter was fresh and delicious. Highly recommended!",
      image: require("../assets/user1.webp"),
    },
    {
      id: "2",
      name: "Michael Brown",
      rating: 4,
      review: "Great ambiance and quick service. The pasta Alfredo was amazing!",
      image: require("../assets/user2.jpeg"),
    },
    {
      id: "3",
      name: "Emma Wilson",
      rating: 5,
      review: "Best restaurant in town! The chocolate lava cake is to die for. Will visit again.",
      image: require("../assets/user3.webp"),
    },
  ];
  
const HomeScreen = ({ navigation }) => {
  const { cart } = useCart();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch location every 5 seconds
    const locationInterval = setInterval(() => {
      getLocation();
    }, 5000);

    return () => clearInterval(locationInterval); // Cleanup on unmount
  }, []);

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please allow location access to continue.");
      setLoading(false);
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    let geocode = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    if (geocode.length > 0) {
      let place = geocode[0];
      setAddress(`${place.name || ""}, ${place.street || ""}, ${place.city || ""}, ${place.region || ""}, ${place.country || ""}`);
    }
    setLoading(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Top Header Section */}
        <View style={styles.header}>
          {/* Logo */}
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          
          {/* Cart Icon */}
          <View>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
  <Text>🛒 Cart ({cart?.length ?? 0})</Text>
</TouchableOpacity>


    </View>
        </View>
        
        {/* Hero Image */}
        <Image source={require("../assets/restaurant.jpg")} style={styles.heroImage} />
        
        {/* Welcome Text */}
        <Text style={styles.title}>Welcome to Gourmet Bistro</Text>
        <Text style={styles.subtitle}>Delicious flavors, crafted for you</Text>
         {/* Add Navigation Button to WelcomeScreen */}
         <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Welcome")} // Navigate to WelcomeScreen
        >
          <Text style={styles.buttonText}>Go to Welcome Screen</Text>
        </TouchableOpacity>
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Our Special Dishes</Text>
        <FlatList
  data={dishes}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.enhancedCard}
      onPress={() => navigation.navigate("DishDetails", { dish: item })}
    >
      <Image source={item.image} style={styles.enhancedDishImage} />
      <Text style={styles.enhancedDishName}>{item.name}</Text>
      <Text style={styles.enhancedDishPrice}>{item.price}</Text>
    </TouchableOpacity>
  )}
/>
{/* Why Choose Us Section */}
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <View style={styles.whyChooseContainer}>
          <View style={styles.whyChooseCard}>
            <Text style={styles.whyChooseTitle}>🌟 High-Quality Ingredients</Text>
            <Text style={styles.whyChooseText}>We use only the freshest and best ingredients.</Text>
          </View>
          <View style={styles.whyChooseCard}>
            <Text style={styles.whyChooseTitle}>👨‍🍳 Expert Chefs</Text>
            <Text style={styles.whyChooseText}>Our chefs craft each dish with passion.</Text>
          </View>
          <View style={styles.whyChooseCard}>
            <Text style={styles.whyChooseTitle}>🚀 Fast Delivery</Text>
            <Text style={styles.whyChooseText}>Get your food delivered quickly & fresh.</Text>
          </View>
        </View>

       {/* Our Signature Dishes */}
<Text style={styles.sectionTitle}>Our Signature Dishes</Text>

<FlatList
  data={signatureDishes}
  keyExtractor={(item) => item.id}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.horizontalList}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={styles.showcaseContainer} 
      onPress={() => navigation.navigate("DishDetails", { selectedDish: item })}
    >
      <Image source={item.image} style={styles.showcaseImage} />
      <View style={styles.overlay} />
      <Text style={styles.showcaseText}>{item.name}</Text>
      <Text style={styles.showcasePrice}>{item.price}</Text>
    </TouchableOpacity>
  )}
/>

{/* Call to Action */}
<TouchableOpacity 
  style={styles.button} 
  onPress={() => navigation.navigate("DishDetails")}
>
  <Text style={styles.buttonText}>Order Now</Text>
</TouchableOpacity>


{/* Customer Reviews Section */}
    
<Text style={styles.sectionTitle}>What Our Customers Say</Text>
<FlatList
  data={reviews}
  keyExtractor={(item) => item.id}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.reviewList}
  renderItem={({ item }) => (
    <View style={styles.reviewCard}>
      <Image source={item.image} style={styles.reviewImage} />
      <Text style={styles.reviewName}>{item.name}</Text>
      <View style={styles.starContainer}>
        {Array.from({ length: item.rating }).map((_, index) => (
          <Image key={index} source={require("../assets/star.webp")} style={styles.starIcon} />
        ))}
      </View>
      <Text style={styles.reviewText} numberOfLines={3}>{item.review}</Text>
    </View>
  )}
/>
{/* VIP Table Reservations Section */}
<View style={styles.vipContainer}>
          <Text style={styles.vipTitle}>✨ VIP Table Reservations</Text>
          <Text style={styles.vipSubtitle}>Enjoy an exclusive dining experience</Text>
          
          <View style={styles.vipCard}>
            <Image source={require("../assets/table.webp")} style={styles.vipImage} />
            
            <View style={styles.vipDetails}>
              <Text style={styles.vipPerks}>🏆 Priority Booking</Text>
              <Text style={styles.vipPerks}>🍽️ Chef's Secret Menu</Text>
              <Text style={styles.vipPerks}>🍷 Complimentary Wine</Text>

              <TouchableOpacity
  style={styles.vipButton}
  onPress={() => navigation.navigate("ReserveNowScreen")}
>
  <Text style={styles.vipButtonText}>Reserve Now</Text>
</TouchableOpacity>

            </View>
          </View>
        </View>
        <Text style={styles.locationtitle}>📍 Real-Time Location Tracker</Text>

      <TouchableOpacity style={styles.locationbutton} onPress={getLocation} disabled={loading}>
        <Text style={styles.locationbuttonText}>{loading ? "Fetching..." : "Refresh Location"}</Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.card}>
          <Text style={styles.label}>🌍 Coordinates:</Text>
          <Text style={styles.value}>
            Latitude: {location.latitude} {"\n"}
            Longitude: {location.longitude}
          </Text>
        </View>
      )}

      {address && (
        <View style={styles.card}>
          <Text style={styles.label}>📌 Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
      )}
</View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  // 📌 Header Container
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 160, // Adjust size as needed
    height: 80,
    resizeMode: "contain",
    marginLeft: -30,
  },
  cartIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  heroImage: {
    width: "90%",
    height: 200,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    marginBottom: 10,
  },
  menuList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  enhancedCard: {
    position: "relative",
    width: 160, // Slightly bigger
    height: 200,
    borderRadius: 12,
    marginRight: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Floating effect
  },
  enhancedDishImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)", // Dark overlay effect
    borderRadius: 12,
  },
  enhancedDishName: {
    position: "absolute",
    bottom: 30,
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  enhancedDishPrice: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffcc00", // Golden price color
  },
  whyChooseContainer: {
    width: "90%",
  },
  whyChooseCard: {
    backgroundColor: "#ffe5e5",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  whyChooseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  whyChooseText: {
    fontSize: 14,
    color: "#666",
  },
  horizontalList: {
    paddingVertical: 15,
  },
  showcaseContainer: {
    position: "relative",
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  showcaseImage: {
    width: 250, 
    height: 150, 
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", 
  },
  showcaseText: {
    position: "absolute",
    bottom: 10,
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  showcasePrice: {
    position: "absolute",
    top: 10,
    right: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6347",
  },
  button: {
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  reviewList: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  reviewCard: {
    width: 250,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor:  "#ffe5e5", // SOLID COLOR for better readability
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  reviewTextContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light semi-transparent background
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  reviewImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 2,
  },
  reviewText: {
    fontSize: 14,
    color: "#333", // Darker text color for visibility
    textAlign: "center",
    fontStyle: "italic",
  },
  /* ======= VIP Table Section ======= */
  vipContainer: {
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
  },
  vipTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  vipSubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 15,
  },
  vipCard: {
    backgroundColor: "#1a1a1a", // Elegant dark background
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  vipImage: {
    width: "100%",
    height: 150,
  },
  vipDetails: {
    padding: 15,
  },
  vipPerks: {
    fontSize: 16,
    color: "#FFD700", // Gold text for premium feel
    fontWeight: "bold",
    marginVertical: 5,
  },
  vipButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  vipButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  locationtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 20,
  },
  locationbutton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  locationbuttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
  },
});

export default HomeScreen;
