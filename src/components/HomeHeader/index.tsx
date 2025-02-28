import { TouchableOpacity } from "react-native";
import { Power } from "phosphor-react-native";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Theme } from "../../theme";

import { Container, Greeting, Message, Name, Picture } from "./styles";

export function HomeHeader() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  const handleLogout = () => {
    app.currentUser?.logOut();
  };
  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user.profile.name}</Name>
      </Greeting>

      <TouchableOpacity onPress={handleLogout}>
        <Power size={32} color={Theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
