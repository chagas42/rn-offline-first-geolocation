import styled from "styled-components/native";
import { Theme } from "../../theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin: 32px 0;
  padding: 22px;
  border-radius: 6px;

  background-color: ${Theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;
  background-color: ${Theme.COLORS.GRAY_600};

  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};

  flex: 1;
  text-align: justify;
  textAlignVertical: center;
`;

export const TextHighlight = styled.Text`
  color: ${Theme.COLORS.BRAND_LIGHT};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
`;
