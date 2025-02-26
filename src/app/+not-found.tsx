import { Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Link, Stack } from "expo-router"
import { TextStyle, View, ViewStyle } from "react-native"

export default function NotFound() {
  const { themed } = useAppTheme()
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={themed($container)}>
        <Text preset="heading">Not Found</Text>
        <Link href="/" style={themed($button)}>
          Go to home
        </Link>
      </View>
    </>
  )
}

const $button: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral700,
  fontSize: spacing.md,
  textDecorationLine: "underline",
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.background,
  flex: 1,
  justifyContent: "center",
})
