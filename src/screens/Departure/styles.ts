import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${Theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`;

export const Message = styled.Text`
  color: ${Theme.COLORS.WHITE};
  font-family: ${Theme.FONT_FAMILY.REGULAR};
  textAlign: center;
  margin: 24px;
`;