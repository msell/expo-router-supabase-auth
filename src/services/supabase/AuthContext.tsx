import { setStorageItemAsync, useStorageState } from "@/utils/storage/useStorageState"
import { Session } from "@supabase/supabase-js"
import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import { Alert } from "react-native"

import { supabase } from "./supabase"

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void
  signOut: () => void
  session?: Session | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function useSession() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />")
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ? JSON.stringify(session) : null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ? JSON.stringify(session) : null)
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            if (__DEV__) {
              console.tron.log(error)
            }
            if (error.code === "invalid_credentials") {
              Alert.alert("Invalid credentials")
            }

            return
          }
          setSession(JSON.stringify(data.session))
        },
        signOut: async () => {
          if (__DEV__) {
            console.tron.log("signOut")
          }
          await supabase.auth.signOut()
          setSession(null)
        },
        session: session ? JSON.parse(session) : null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
