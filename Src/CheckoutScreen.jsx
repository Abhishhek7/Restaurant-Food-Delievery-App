import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

const CheckoutScreen = () => {
  const { cart, setCart } = useCart();
  const navigation = useNavigation();

  // State for Payment Method & Extra Requests
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [extraRequests, setExtraRequests] = useState({
    spicyFood: false,
    fastDelivery: false,
    customRequest: "",
  });

  // Calculate Total Price
  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  // Handle Order Confirmation
  const handleConfirmOrder = () => {
    if (paymentMethod === "Debit Card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
      Alert.alert("Payment Error", "Please fill in all card details.");
      return;
    }

    Alert.alert("Order Confirmed!", "Your food will be delivered soon. 🍽️", [
      {
        text: "OK",
        onPress: () => {
          setCart([]); // Clear Cart
          navigation.navigate("Home"); // Redirect to HomeScreen
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Order Summary */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemText}>{item.name} x {item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
        }
      />

      {/* Payment Options */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === "Cash on Delivery" && styles.selectedOption]}
        onPress={() => {
          setPaymentMethod("Cash on Delivery");
          setShowCardForm(false);
        }}
      >
        <Text style={styles.optionText}>💵 Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === "Debit Card" && styles.selectedOption]}
        onPress={() => {
          setPaymentMethod("Debit Card");
          setShowCardForm(true);
        }}
      >
        <Text style={styles.optionText}>💳 Debit Card</Text>
      </TouchableOpacity>

      {/* Debit Card Form */}
      {showCardForm && (
        <View style={styles.cardForm}>
          <TextInput
            placeholder="Card Number"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="Expiry (MM/YY)"
              style={[styles.input, styles.halfInput]}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
            />
            <TextInput
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              style={[styles.input, styles.halfInput]}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
            />
          </View>
        </View>
      )}

      {/* Extra Requests */}
      <Text style={styles.sectionTitle}>Extra Requests</Text>
      <TouchableOpacity
        style={[styles.extraOption, extraRequests.spicyFood && styles.selectedOption]}
        onPress={() => setExtraRequests({ ...extraRequests, spicyFood: !extraRequests.spicyFood })}
      >
        <Text style={styles.optionText}>🌶️ Spicy Food</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.extraOption, extraRequests.fastDelivery && styles.selectedOption]}
        onPress={() => setExtraRequests({ ...extraRequests, fastDelivery: !extraRequests.fastDelivery })}
      >
        <Text style={styles.optionText}>🚀 Fast Delivery</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Any other request?"
        style={styles.input}
        onChangeText={(text) => setExtraRequests({ ...extraRequests, customRequest: text })}
      />

      {/* Confirm Order Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmText}>✅ Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  cartItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: "bold" },
  totalText: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  paymentOption: { padding: 15, borderRadius: 10, marginTop: 10, backgroundColor: "#f5f5f5" },
  selectedOption: { backgroundColor: "#ff6347", color: "#fff" },
  optionText: { fontSize: 16, fontWeight: "bold" },
  cardForm: { marginTop: 10, backgroundColor: "#f5f5f5", padding: 15, borderRadius: 10 },
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: "#ddd" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  extraOption: { padding: 15, borderRadius: 10, marginTop: 10, backgroundColor: "#f5f5f5" },
  confirmButton: { marginTop: 20, backgroundColor: "#28a745", paddingVertical: 15, borderRadius: 10, alignItems: "center" },
  confirmText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export default CheckoutScreen;
