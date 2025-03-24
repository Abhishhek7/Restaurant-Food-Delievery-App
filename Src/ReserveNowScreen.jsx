import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReserveNowScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");

  const handleReserve = () => {
    if (!name || !guests) {
      Alert.alert("Missing Details", "Please fill in all required fields.");
      return;
    }

    // Simulate sending reservation data to a backend
    Alert.alert(
      "Reservation Confirmed",
      `Table reserved for ${name} on ${date.toDateString()} for ${guests} guests.`
    );

    // Navigate back to Home or another confirmation screen
    navigation.navigate("Home ");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve Your VIP Table</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>📅 {date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Special Requests (Optional)"
        value={specialRequest}
        onChangeText={setSpecialRequest}
      />

      <TouchableOpacity onPress={handleReserve} style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15, fontSize: 16,
  },
  dateButton: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 15 },
  dateText: { fontSize: 16 },
  reserveButton: { backgroundColor: "#FFD700", padding: 12, borderRadius: 8, alignItems: "center" },
  reserveButtonText: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a" },
});

export default ReserveNowScreen;
