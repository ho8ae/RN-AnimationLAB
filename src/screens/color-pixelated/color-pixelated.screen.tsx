// @refresh reset
import { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';

export const ColorPixelatedScreen: FC = () => {
  const { width: stageWidth, height: stageHeight } = useWindowDimensions();

  const image = useImage(
    'https://www.iesabroad.org/sites/default/files/2023-05/view-seoul-city-skyline-seoul-tower-sunrise-south-korea.jpg',
  );

  if (!image) {
    return null;
  }

  return (
    <Canvas
      style = {{
        width: stageWidth,
        height: stageHeight,
        backgroundColor: 'black',
      }}
    >
      <Image
        image={image}
        x={0}
        y={0}
        width={stageWidth}
        height={stageHeight}
        fit="fill"
      />
    </Canvas>
  );
};
