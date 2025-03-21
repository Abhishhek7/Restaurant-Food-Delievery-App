import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "./CartContext";

const CartScreen = () => {
  const { cart, setCart } = useCart();

  // 🛒 Function to remove an item from the cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 🛍️ Calculate total price
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty 😢</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} x {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* 🏷️ Total Price Section */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#ff6347",
  },
  removeButton: {
    padding: 10,
  },
  removeText: {
    fontSize: 20,
    color: "#ff0000",
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
