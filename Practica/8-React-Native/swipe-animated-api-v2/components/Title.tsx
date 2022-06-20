import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { IData } from '../App';
import { TITLE_ELEM_WIDTH } from './Swipe';

interface ITitle_Props {
  item: IData;
}

export const Title = React.forwardRef<View, ITitle_Props>(({ item }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        styles.containerText,
        !!item.title && { borderBottomColor: 'black', borderBottomWidth: 1 },
        !item.title && { width: 150 },
      ]}
    >
      <Animated.Text style={[styles.text]}>{item.title}</Animated.Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 23,
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    width: TITLE_ELEM_WIDTH,
  },
  text: {
    color: 'red',
    fontWeight: '600',
    fontSize: 18,
    marginHorizontal: 10,
  },
  selectedIndexText: {
    color: 'red',
  },
  line: {
    top: 24,
    height: 5,
    backgroundColor: 'firebrick',
    position: 'absolute',
  },
});
