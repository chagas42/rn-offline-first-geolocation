import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.View`
  width: 100%;
  padding: 0 32px 24px;
  flex-direction: row;
  justify-content: space-between;

  background-color: ${Theme.COLORS.GRAY_700};
  z-index: 1;
`;

export const Title = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.XL}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
`;