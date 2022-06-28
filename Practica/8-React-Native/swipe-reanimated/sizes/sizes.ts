import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const ITEM_SIZE = SCREEN_WIDTH * 0.33;
export const TITLE_ELEM_WIDTH = 150;
export const SPACER_ITEM_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;
export const snapToInterval = Number((ITEM_SIZE + 1.4).toFixed());
export const WHITE_SPACE_WIDTH = 150;
