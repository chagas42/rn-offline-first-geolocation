import styled from "styled-components/native";
import { Theme } from "../../theme";
import { Image } from "expo-image";

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;

  background-color: ${Theme.COLORS.GRAY_700};
`;

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Message = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.MD}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
`;

export const Name = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.LG}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
`;

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`;
