import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useCart } from "./CartContext"; // ✅ Import Cart Context

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
  const { addToCart } = useCart(); // ✅ Get addToCart function from CartContext

  const [extraDishes, setExtraDishes] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const dishes = generateRandomDishes();
    setExtraDishes(dishes);
    setQuantities(Array(dishes.length + (selectedDish ? 1 : 0)).fill(1));
  }, []);

  const allDishes = selectedDish ? [selectedDish, ...extraDishes] : extraDishes;

  const updateQuantity = (index, change) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(1, (newQuantities[index] || 1) + change);
      return newQuantities;
    });
  };

  const handleAddToCart = (index) => {
    const dish = allDishes[index];
    const quantity = quantities[index] || 1;
    addToCart(dish, quantity); // ✅ Store in global state
    alert(`${dish.name} added to cart (Quantity: ${quantity})`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dish Details</Text>

      <FlatList
        data={allDishes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>

              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(index, -1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[index] || 1}</Text>
                <TouchableOpacity onPress={() => updateQuantity(index, 1)} style={styles.qtyButton}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(index)}>
              <Text style={styles.cartButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
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
  infoContainer: { flex: 1, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green", marginTop: 4 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  qtyText: { fontSize: 16, fontWeight: "bold" },
  quantity: { fontSize: 16, fontWeight: "bold" },
  cartButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  cartButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

export default DishDetailsScreen;
