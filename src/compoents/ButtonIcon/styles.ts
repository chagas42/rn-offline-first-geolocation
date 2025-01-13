import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${Theme.COLORS.GRAY_600};
`;