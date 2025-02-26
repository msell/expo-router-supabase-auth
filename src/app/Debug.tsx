import { Screen, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Link } from "expo-router"
import { TextStyle, View, ViewStyle } from "react-native"

export default function DebugScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($container)}>
        <Text preset="heading">Debug</Text>
        <Link href="/" style={themed($button)}>
          Go to home
        </Link>
      </View>
    </Screen>
  )
}

const $button: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral700,
  fontSize: spacing.md,
  textDecorationLine: "underline",
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.angry100,
  flex: 1,
  justifyContent: "center",
})
