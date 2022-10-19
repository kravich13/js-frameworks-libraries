import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const MERCEDES_URI =
  'https://media.ed.edmunds-media.com/mercedes-benz/gle-class-coupe/2021/oem/2021_mercedes-benz_gle-class-coupe_4dr-suv_amg-gle-53_fq_oem_4_1280x855.jpg';
const AVENDATOR_URI =
  'https://images.unsplash.com/photo-1596711715198-16788fb84007?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770';

export const SoftZoomOnTouch = () => {
  const $scrollView = useRef(null);

  const handlePress = () => {};

  const [dataState, setDataState] = useState([
    { uri: MERCEDES_URI, title: 'Avendator SVJ', isSelected: true },
    { uri: AVENDATOR_URI, title: 'GLE Coupe', isSelected: false },
    { uri: AVENDATOR_URI, title: 'GLE Coupe', isSelected: false },
  ]);

  // useEffect(() => {
  //   $scrollView.current.scrollTo({ x: 100, animated: true });
  // }, []);

  const textElements = useCallback(
    (item, index, arr) => (
      <View key={index} style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>

        {index !== 1 && index !== arr.length && <Text style={styles.separator}>|</Text>}
      </View>
    ),
    []
  );

  const imageElements = useCallback(
    (item, index) => (
      <TouchableOpacity key={index} onPress={handlePress}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{
              uri: item.uri,
            }}
          />
        </View>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My cars</Text>

      <View style={styles.textContainer}>{dataState.map(textElements)}</View>

      <View style={styles.scrollView}>
        <ScrollView ref={$scrollView} style={{ flexGrow: 1 }} horizontal>
          {dataState.map(imageElements)}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    height: 250,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    marginBottom: 23,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 23,
  },
  text: {
    fontSize: 18,
  },
  separator: {
    fontSize: 17,
    marginHorizontal: 10,
    fontWeight: '800',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    width: 220,
    borderRadius: 220 / 2,
    backgroundColor: 'firebrick',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
  },
});
