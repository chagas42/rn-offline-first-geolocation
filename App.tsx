import './src/libs/dayjs';
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "react-native";
import { AppProvider, UserProvider } from "@realm/react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Routes } from "./src/routes";
import { SignIn } from "./src/screens/SignIn";

import { REALM_APP_ID } from "@env";
import { ANDROID_CLIENT_ID } from "@env";

import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Loading } from "./src/compoents/Loading";
import { Theme } from "./src/theme";
import { RealmProvider } from "./src/libs/realm";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  console.log(ANDROID_CLIENT_ID);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={Theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: Theme.COLORS.GRAY_800}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
