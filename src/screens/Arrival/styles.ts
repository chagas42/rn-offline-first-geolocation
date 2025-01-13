import styled from 'styled-components/native';
import { Theme } from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${Theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`;

export const Label = styled.Text`
  color: ${Theme.COLORS.GRAY_300};
  font-size: ${Theme.FONT_SIZE.SM}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};

  margin-top: 32px;
  margin-bottom: 5px;
`;

export const LicensePlate = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.XXXL}px;
  font-family: ${Theme.FONT_FAMILY.BOLD};
`;

export const Description = styled.Text`
  color: ${Theme.COLORS.GRAY_100};
  font-size: ${Theme.FONT_SIZE.MD}px;
  font-family: ${Theme.FONT_FAMILY.REGULAR};

  text-align: justify;
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  
  margin-top: 32px;
  padding: 32px;
`;