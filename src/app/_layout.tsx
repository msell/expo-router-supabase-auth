import { Text } from "@/components"
import { initI18n } from "@/i18n"
import { SessionProvider } from "@/services/supabase/AuthContext"
import { customFontsToLoad } from "@/theme"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"

import "react-native-url-polyfill/auto"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()
  return (
    <SessionProvider>
      <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
        <KeyboardProvider>
          <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </KeyboardProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
