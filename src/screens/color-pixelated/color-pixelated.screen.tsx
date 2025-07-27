// @refresh reset
import { FC } from 'react';
import { Text, View } from 'react-native';
import { useWindowDimensions } from 'react-native';

export const ColorPixelatedScreen: FC = () => {
  const { width:stageWidth, height:stageHeight } = useWindowDimensions();
  
  return (
    <View>
      <Text>Color Pixelated</Text>
    </View>
  );
};
