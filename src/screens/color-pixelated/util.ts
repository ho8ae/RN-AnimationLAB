import { rect, Skia, SkImage } from '@shopify/react-native-skia';

export type Pixel = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
};

export const getPixels = (
  image: SkImage,
  stageWidth: number,
  stageHeight: number,
  density: number,
) => {
  'worklet'; // 성능 향상을 위한 worklet 사용 Reanimated 라이브러리 (ui 스레드 실행)

  const result: Pixel[] = [];

  // 오프 screen surface 생성
  // MakeOffscreen 메서드는 GPU 백드 서피스를 생성합니다.
  // width와 height는 픽셀 단위로 지정합니다.
  // 이 서피스는 메모리에 존재하며, 화면에 표시되지 않습니다.
  // 반환된 서피스에서 getCanvas() 메서드를 호출하여 캔버스를 가져옵니다.
  const canvas = Skia.Surface.MakeOffscreen(
    stageWidth,
    stageHeight,
  )!.getCanvas();
  console.log('canvas', canvas);

  // 이미지를 캔버스에 그리는 함수
  canvas.drawImageRect(
    image,
    // 이미지의 크기와 위치를 지정하는 사각형
    rect(0, 0, image.width(), image.height()),

    // 캔버스에 그릴 위치와 크기를 지정하는 사각형
    rect(0, 0, stageWidth, stageHeight),

    // 그리기 스타일 설정
    Skia.Paint(),
  );

  // 캔버스에서 0,0 위치에서 stageWidth와 stageHeight 크기의 픽셀 데이터를 읽어옵니다.
  const pixels = Array.from(
    canvas.readPixels(0, 0, {
      alphaType: image.getImageInfo().alphaType, // 투명도 정보
      colorType: image.getImageInfo().colorType, // 색상 정보 형ㅅ기
      width: stageWidth,
      height: stageHeight,
    })!,
  );

  // desity에 간격에 따라 픽셀을 샘플링
  for (let y = 0; y < stageHeight; y += density) {
    for (let x = 0; x < stageWidth; x += density) {
      result.push({
        x,
        y,

        // 픽셀 데이터에서 RGBA 값을 추출합니다. 인덱스로 접근 
        r: pixels[(x + y * stageWidth) * 4],
        g: pixels[(x + y * stageWidth) * 4 + 1],
        b: pixels[(x + y * stageWidth) * 4 + 2],
        a: pixels[(x + y * stageWidth) * 4 + 3] / 255,
      });
    }
  }
  return result;
};
