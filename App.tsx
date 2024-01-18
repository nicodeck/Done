import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { StrictMode } from "react";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <HomeScreen />
      </SafeAreaProvider>
    </StrictMode>
  );
}
