import styled, { DefaultTheme } from "styled-components/native";
import { Theme } from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${Theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  color: ${Theme.COLORS.BRAND_LIGHT};
  font-size: ${Theme.FONT_SIZE.XXXL}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Slogan = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.MD}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
  text-align: center;

  margin-bottom: 32px;
`;
