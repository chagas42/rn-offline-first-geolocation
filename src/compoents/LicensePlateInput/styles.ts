import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${Theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  color: ${Theme.COLORS.GRAY_300};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
`;

export const Input = styled.TextInput`
  color: ${Theme.COLORS.GRAY_200};
  font-size: ${Theme.FONT_SIZE.XXXL}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};

  text-align: center;
  margin-top: 16px;
`;