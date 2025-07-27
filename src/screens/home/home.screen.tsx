import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HomeScreenProps {}

export const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>안녕하세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
