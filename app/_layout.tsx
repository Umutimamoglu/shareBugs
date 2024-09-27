import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { ThemeProvider } from "@shopify/restyle";
import theme from '@/utils/theme';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Fontlar yüklenene kadar SplashScreen'i gizleme
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Yüklenme tamamlanmadıysa, bir yükleme göstergesi gösterebilirsiniz
  }
  return <Stack>


    <Stack.Screen
      name="login"
      options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          </TouchableOpacity>
        ),
        headerRight: () => (

          <TouchableOpacity >
            <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
          </TouchableOpacity>

        ),

      }}
    />
    <Stack.Screen
      name="signup"
      options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          </TouchableOpacity>
        ),
        headerRight: () => (

          <TouchableOpacity >
            <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
          </TouchableOpacity>

        ),

      }}
    />
    <Stack.Screen name="index" options={{ headerShown: false }} />

    <Stack.Screen
      name="welcome"
      options={{
        title: '',
        headerBackTitle: '',
        headerShown: false


      }}
    />

    <Stack.Screen name="auth/(tabs)" options={{ headerShown: false }} />
  </Stack>


}

const RootLayoutNav = () => {
  return (

    <ThemeProvider theme={theme}>
      <InitialLayout />
    </ThemeProvider>

  );
}

export default RootLayoutNav