import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './home';
import { ColorPixelatedScreen } from './color-pixelated';

export type RootStackParamList = {
  Home: undefined;
  ColorPixelated: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ColorPixelated" component={ColorPixelatedScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
