import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { StrictMode } from "react";

export default function App() {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </StrictMode>
  );
}
