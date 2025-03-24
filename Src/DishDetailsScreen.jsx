import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

// Function to generate random signature dishes
const generateRandomDishes = () => {
  const dishImages = {
    Pasta: require("../assets/pasta.webp"),
    Burger: require("../assets/burger.webp"),
    Pizza: require("../assets/pizza.webp"),
    Noodles: require("../assets/Noodles.webp"),
    Sandwich: require("../assets/sandwich.webp"),
  };

  const dishNames = Object.keys(dishImages);

  return Array.from({ length: 5 }, (_, i) => {
    const randomDish = dishNames[Math.floor(Math.random() * dishNames.length)];
    return {
      id: i + 100,
      name: randomDish,
      price: (Math.random() * 200 + 100).toFixed(2),
      image: dishImages[randomDish],
    };
  });
};

const DishDetailsScreen = ({ route }) => {
  const { selectedDish } = route.params || {};
  const { addToCart, cart } = useCart();
  const navigation = useNavigation();

  const [extraDishes, setExtraDishes] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const dishes = generateRandomDishes();
    setExtraDishes(dishes);

    // Initialize quantity for each dish
    const initialQuantities = {};
    if (selectedDish) {
      initialQuantities[selectedDish.id] = 1;
    }
    dishes.forEach((dish) => {
      initialQuantities[dish.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleAddToCart = (dish) => {
    addToCart(dish, quantities[dish.id] || 1);
    alert(`${dish.name} added to cart (Quantity: ${quantities[dish.id]})`);
  };

  const isDishInCart = (dishId) => cart.some((item) => item.id === dishId);

  return (
    <View style={styles.container}>

      {/* 🛒 Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dish Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒 ({cart?.length ?? 0})</Text>
        </TouchableOpacity>
      </View>

      {/* 🌟 Special Dish Section */}
      {selectedDish && (
        <View style={styles.specialDishContainer}>
          <Text style={styles.sectionTitle}>Signature Dish</Text>
          <View style={styles.card}>
            <Image source={selectedDish.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{selectedDish.name}</Text>
              <Text style={styles.price}>₹{selectedDish.price}</Text>

              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(selectedDish.id, -1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[selectedDish.id] || 1}</Text>
                <TouchableOpacity onPress={() => updateQuantity(selectedDish.id, 1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Add to Cart Button OR Already in Cart */}
            {isDishInCart(selectedDish.id) ? (
              <View style={styles.alreadyInCartButton}>
                <Text style={styles.alreadyInCartText}>✔ Already in Cart</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.cartButtonSmall} onPress={() => handleAddToCart(selectedDish)}>
                <Text style={styles.cartButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* 🔥 Signature Dishes Section */}
      <Text style={styles.sectionTitle}>Special Dishes</Text>
      <FlatList
        data={extraDishes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>

              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[item.id] || 1}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Add to Cart Button OR Already in Cart */}
            {isDishInCart(item.id) ? (
              <View style={styles.alreadyInCartButton}>
                <Text style={styles.alreadyInCartText}>✔ Already in Cart</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.cartButtonSmall} onPress={() => handleAddToCart(item)}>
                <Text style={styles.cartButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", flex: 1 },
  cartButton: { padding: 10 },
  cartIcon: { fontSize: 30, fontWeight: "bold" },

  // Section Titles
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },

  // Dish Card Styles
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
  infoContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green", marginTop: 4 },

  // Quantity Controls
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyButton: { backgroundColor: "#ddd", padding: 5, borderRadius: 5, marginHorizontal: 5 },
  qtyText: { fontSize: 16, fontWeight: "bold" },
  quantity: { fontSize: 16, fontWeight: "bold" },

  // Add to Cart
  cartButtonSmall: { backgroundColor: "#ff6347", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  cartButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

export default DishDetailsScreen;
