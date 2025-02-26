import { Button, Screen, Text } from "@/components"
import { useSession } from "@/services/supabase/AuthContext"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, ViewStyle } from "react-native"

export default function HomeScreen() {
  const { themed } = useAppTheme()
  const { signOut, session } = useSession()
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($container)}>
        <Text preset="heading">{`Welcome ${session?.user?.email}`}</Text>
        <Button onPress={() => signOut()}>Sign out</Button>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.background,
  flex: 1,
  justifyContent: "center",
})
