// @refresh reset
import { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { Canvas, Circle, Image, Skia, useImage } from '@shopify/react-native-skia';
import { getPixels,Pixel } from './util';

type  DotProps = {
  pixel: Pixel;
  radius:number;
}

const Dot: FC<DotProps> = ({ pixel, radius }) => {
  const {x,y,r,g,b,a} = pixel;
  const paint = Skia.Paint();
  paint.setColor(Skia.Color(`rgba(${r}, ${g}, ${b}, ${a})`));

  // Circle 컴포넌트를 사용하여 픽셀을 그립니다.
  return <Circle cs={x} cy={y} r={radius} paint={paint} />; 
}

const DENSITY = 20; // 픽셀 샘플링 간격


export const ColorPixelatedScreen: FC = () => {
  const { width: stageWidth, height: stageHeight } = useWindowDimensions();

  const image = useImage(
    'https://www.iesabroad.org/sites/default/files/2023-05/view-seoul-city-skyline-seoul-tower-sunrise-south-korea.jpg',
  );

  if (!image) {
    return null;
  }

  const pixels = getPixels(image,stageWidth,stageHeight,DENSITY);

  return (
    <Canvas
      style = {{
        width: stageWidth,
        height: stageHeight,
        backgroundColor: 'black',
      }}
    >

      {pixels.map(pixel => <Dot pixel={pixel} radius={DENSITY / 2} />)}      
      {/* <Image
        image={image}
        x={0}
        y={0}
        width={stageWidth}
        height={stageHeight}
        fit="fill"
      /> */}
    </Canvas>
  );
};
