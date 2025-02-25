import { Screen, Text } from "@/components"
import { ViewStyle } from "react-native"

export default function DebugScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="debug" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
