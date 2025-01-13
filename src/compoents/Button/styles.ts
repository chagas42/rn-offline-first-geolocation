import styled, { DefaultTheme } from "styled-components/native";
import { Theme } from "../../theme";

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;
  background-color: ${Theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  color: ${Theme.COLORS.WHITE};
  font-size: ${Theme.FONT_SIZE.MD}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs(() => ({
  color: Theme.COLORS.WHITE,
}))``;
