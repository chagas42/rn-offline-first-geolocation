import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${Theme.COLORS.GRAY_700};

`;

export const Label = styled.Text`
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
  color: ${Theme.COLORS.GRAY_300};
`;

export const Input = styled.TextInput`
  font-size: ${Theme.FONT_SIZE.MD}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
  color: ${Theme.COLORS.GRAY_200};
  vertical-align: top;
  margin-top: 16px;
`;