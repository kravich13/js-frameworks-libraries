import {
  BackgroundProps,
  BorderColorProps,
  BorderProps,
  BorderRadiusProps,
  BorderStyleProps,
  ColorProps,
  FlexGrowProps,
  FontWeightProps,
  MarginBottomProps,
  MarginLeftProps,
  MarginProps,
  MarginRightProps,
  MarginTopProps,
  PaddingBottomProps,
  PaddingLeftProps,
  PaddingProps,
  PaddingRightProps,
  PaddingTopProps,
  TextAlignProps,
  WidthProps,
  FontSizeProps,
  FlexProps,
} from 'styled-system';

type GeneralProps = FlexProps &
  PaddingLeftProps &
  PaddingRightProps &
  PaddingBottomProps &
  PaddingTopProps &
  MarginLeftProps &
  MarginBottomProps &
  MarginTopProps &
  MarginRightProps &
  WidthProps &
  BorderProps &
  BorderRadiusProps &
  BorderColorProps &
  BorderStyleProps &
  MarginProps &
  PaddingProps;

export type TextProps = GeneralProps &
  ColorProps &
  FontWeightProps &
  TextAlignProps &
  FontSizeProps;

export type ColumnProps = FlexGrowProps & { header?: boolean };

export type StyledTouchableOpacityProps = GeneralProps & BackgroundProps;
