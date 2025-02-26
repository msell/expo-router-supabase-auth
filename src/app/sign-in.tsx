import { Button, Screen, Text, TextField } from "@/components"
import { supabase } from "@/services/supabase"
import { useSession } from "@/services/supabase/AuthContext"
import { colors, spacing } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { Redirect, useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import PreventAuthenticatedViewer from "@/components/PreventAuthenticatedViewer"
const logo = require("../../assets/images/logo.png")

export default function SignInScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [_loading, setLoading] = useState(false)
  const { themed } = useAppTheme()
  const router = useRouter()

  async function onSignIn() {
    setLoading(true)
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      if (__DEV__) {
        console.tron.log(error)
      }
    }
    setLoading(false)
    if (data) {
      router.push("/(app)")
    }
  }

  async function onSignUp() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      if (__DEV__) {
        console.tron.log(error)
      }
    }
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  const onForgotPassword = () => {
    // Forgot Password Flow
    console.log("Forgot Password Flow")
  }

  return (
    <PreventAuthenticatedViewer>
      <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
        <View style={$container}>
          <View style={$topContainer}>
            <Image style={$logo} source={logo} resizeMode="contain" />
          </View>
          <View style={[$bottomContainer, $bottomContainerInsets]}>
            <View>
              <TextField
                containerStyle={$textField}
                label="Email"
                autoCapitalize="none"
                defaultValue={email}
                onChangeText={setEmail}
              />
              <TextField
                containerStyle={$textField}
                label="Password"
                autoCapitalize="none"
                defaultValue={password}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>
            <View>
              <Button onPress={onSignIn}>Sign In</Button>
              <Pressable style={$forgotPassword} onPress={onForgotPassword}>
                <Text preset="bold">Forgot Password?</Text>
              </Pressable>
              <Text style={$buttonDivider}>- or -</Text>
              <Button preset="reversed" onPress={onSignUp}>
                Sign Up
              </Button>
            </View>
            <View style={$cap} />
          </View>
        </View>
      </Screen>
    </PreventAuthenticatedViewer>
  )
}

const $container: ViewStyle = {
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  height: 200,
  justifyContent: "center",
  alignItems: "center",
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingBottom: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $cap: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  height: spacing.xl,
  position: "absolute",
  top: -spacing.xl,
  left: 0,
  right: 0,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md,
}

const $forgotPassword: ViewStyle = {
  marginVertical: spacing.md,
}

const $buttonDivider: TextStyle = {
  textAlign: "center",
  marginVertical: spacing.md,
}

const $logo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}
