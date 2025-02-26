import { useSession } from "@/services/supabase/AuthContext"
import { Redirect } from "expo-router"
import { PropsWithChildren } from "react"

/*
 * This component is used to prevent authenticated users from accessing the screen.
 * It will redirect to the home screen if the user is authenticated.
 */
export default function PreventAuthenticatedViewer({ children }: PropsWithChildren) {
  const { session } = useSession()

  if (session) {
    return <Redirect href="/(app)" />
  }

  return children
}
