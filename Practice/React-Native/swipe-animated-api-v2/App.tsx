import { StatusBar } from 'expo-status-bar';
import React, { createRef, RefObject, useCallback, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Swipe } from './components/Swipe';
import { Titles } from './components/Titles';

const MERCEDES_URI =
  'https://media.ed.edmunds-media.com/mercedes-benz/gle-class-coupe/2021/oem/2021_mercedes-benz_gle-class-coupe_4dr-suv_amg-gle-53_fq_oem_4_1280x855.jpg';
const AVENDATOR_URI =
  'https://images.unsplash.com/photo-1596711715198-16788fb84007?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770';
const Q8_URI =
  'https://d1672trkrgk4ug.cloudfront.net/eyJrZXkiOiJvcmlnaW5hbC9mMzg1ODcwNWY1NjU0MjU1YjAyYWVmZGQ1NmEyMTkzYy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjc0MCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=';

export interface IData {
  id: string;
  uri: string;
  title: string;
  isPoster: boolean;
  ref: RefObject<View>;
}

export const data: IData[] = [
  {
    id: 'left-spacer',
    uri: '',
    title: '',
    isPoster: false,
    ref: createRef(),
  },
  {
    id: 'one',
    uri: MERCEDES_URI,
    title: 'Avendator SVJ',
    isPoster: true,
    ref: createRef(),
  },
  {
    id: 'two',
    uri: AVENDATOR_URI,
    title: 'GLE Coupe',
    isPoster: true,
    ref: createRef(),
  },
  {
    id: 'three',
    uri: Q8_URI,
    title: 'RS Q8',
    isPoster: true,
    ref: createRef(),
  },
  {
    id: 'right-spacer',
    uri: '',
    title: '',
    isPoster: false,
    ref: createRef(),
  },
];

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isScrollFinished, setIsScrollFinished] = useState(true);

  const handlePress = useCallback(
    (index: number) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex]
  );

  const scrollFinished = useCallback(
    (value: boolean) => {
      setIsScrollFinished(value);
    },
    [setIsScrollFinished]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>My cars</Text>

        <Titles inputArr={data} scrollX={scrollX} selectedIndex={selectedIndex} isScrollFinished={isScrollFinished} />

        <Swipe
          inputArr={data}
          scrollX={scrollX}
          selectedIndex={selectedIndex}
          setSelectedIndex={handlePress}
          scrollFinished={scrollFinished}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    marginBottom: 23,
  },
});
