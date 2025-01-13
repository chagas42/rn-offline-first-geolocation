import styled from "styled-components/native";
import { Theme } from "../../theme";

export const Container = styled.View`
  flex: 1;
  background: ${Theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`;

export const Title = styled.Text`
  color: ${Theme.COLORS.WHITE};
  font-size:  ${Theme.FONT_SIZE.MD}px;
  font-family:  ${Theme.FONT_FAMILY.BOLD};
  margin-bottom: 12px;
`;
export const Label = styled.Text`
  color: ${Theme.COLORS.GRAY_400};
  font-size:  ${Theme.FONT_SIZE.SM}px;
  font-family:  ${Theme.FONT_FAMILY.REGULAR};
  margin-top: 32px;
  text-align: center;
`;