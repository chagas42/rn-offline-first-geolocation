import styled from 'styled-components/native';
import { Theme } from '../../theme';
export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const Info = styled.View`
  flex: 1;
`;
export const Label = styled.Text`
  color: ${Theme.COLORS.GRAY_300};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
`;
export const Description = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
`;