import { useState } from "react";
import { Container, Title, Slogan } from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Realm, useApp } from "@realm/react";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../compoents/Button";

import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { Alert } from "react-native";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export const SignIn = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const response = await GoogleSignin.signIn();
      if (response.data?.idToken) {
        const credentials = Realm.Credentials.jwt(response.data.idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert("Entrar", "foi possivel conectar-se a sua conta google.");
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticating(false);
      Alert.alert("Entrar", "Não foi possivel conectar-se a sua conta google.");
    }
  }
  async function handleAppleSigIn() {
    try {
    } catch (error) {
      console.log(error);
      setIsAuthenticating(false);
      Alert.alert("Entrar", "Não foi possivel conectar-se a sua conta google.");
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veiculos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />

      {/* <Button
        title="Entrar com a Apple"
        isLoading={isAuthenticating}
        onPress={handleAppleSigIn}
      /> */}
    </Container>
  );
};
