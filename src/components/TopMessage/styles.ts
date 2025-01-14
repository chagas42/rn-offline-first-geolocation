import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../../theme';
const dimensions = Dimensions.get('window')
export const Container = styled.View`
  width: ${dimensions.width}px;
  position: absolute;
  z-index: 1;
  
  background-color: ${Theme.COLORS.GRAY_500};
  padding-bottom: 5px;
  
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};
  
  margin-left: 4px;
`;