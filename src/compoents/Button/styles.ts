import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
