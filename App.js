import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./Src/CartContext"; // ✅ Import CartProvider
import HomeScreen from "./Src/HomeScreen";
import CartScreen from "./Src/CartScreen";
import DishDetailsScreen from "./Src/DishDetailsScreen";
import Welcomescreen from "./Src/WelcomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>  {/* ✅ Wrap your entire app inside CartProvider */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Welcome" component={Welcomescreen} />
          <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
