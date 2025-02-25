import { Screen, Text } from "@/components"
import { ViewStyle } from "react-native"

export default function HomeScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
