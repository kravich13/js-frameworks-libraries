import styled from 'styled-components/native';
import {
  background,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  color,
  flex,
  flexGrow,
  fontSize,
  fontWeight,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  textAlign,
  width,
} from 'styled-system';
import { ColumnProps, StyledTouchableOpacityProps, TextProps } from './types';

export const StyledText = styled.Text<TextProps>`
  ${flex};
  ${width};
  ${margin};
  ${padding};
  ${paddingLeft};
  ${paddingRight}'
  ${paddingTop};
  ${paddingBottom};
  ${marginTop};
  ${marginBottom};
  ${marginLeft};
  ${marginRight};
  ${borderRadius};
  ${borderStyle};
  ${borderColor};
  ${borderWidth};

  ${textAlign};
  ${fontSize};
  ${color};
  ${fontWeight};
`;

export const StyledTouchableOpacity = styled.TouchableOpacity<StyledTouchableOpacityProps>`
  ${flex};
  ${width};
  ${margin};
  ${padding};
  ${paddingLeft};
  ${paddingRight}'
  ${paddingTop};
  ${paddingBottom};
  ${marginTop};
  ${marginBottom};
  ${marginLeft};
  ${marginRight};
  ${borderRadius};
  ${borderStyle};
  ${borderColor};
  ${borderWidth};

  ${background};
`;

export const StyledCardTitle = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 40px;
  font-weight: 800;
`;

export const StyledColumn = styled.Text<ColumnProps>`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;

  color: ${({ header }) => (header ? 'black' : 'white')};
  font-weight: ${({ header }) => (header ? 700 : 500)};
  ${flexGrow};
`;

export const StyledWrongInputText = styled.Text`
  color: red;
  text-shadow-color: white;
  text-shadow-radius: 10px;
  font-weight: 600;
  margin-top: 5px;
`;
