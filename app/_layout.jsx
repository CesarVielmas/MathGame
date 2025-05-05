import { Stack } from 'expo-router';
import { LanguageProvider } from '../constants/translations';

export default function RootLayout() {
  return (
    <LanguageProvider>
       <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", 
          gestureEnabled: true,          
          animationDuration: 500,         
        }}>
    </Stack>
    </LanguageProvider>
  );
}