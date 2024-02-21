import { Button, Icon } from "semantic-ui-react"
import { useState } from "react"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { useAppDispatch } from "@/app/store/store.ts"
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth"
import { toast } from "react-toastify"
import { auth } from "@/app/config/firebase.ts"
import { Timestamp } from "@firebase/firestore"
import { closeModal } from "@/app/common/modals/modalSlice.ts"

export const SocialLogin = () => {
  const [status, setStatus] = useState<any>({
    loading: false,
    provider: null,
  })

  const { set } = useFirestore("profile")
  const dispatch = useAppDispatch()
  const handleSocialLogin = async (selectedProvider: string) => {
    setStatus({ loading: true, provider: selectedProvider })
    let provider: AuthProvider
    if (selectedProvider === "github") {
      provider = new GithubAuthProvider()
    } else if (selectedProvider === "google") {
      provider = new GoogleAuthProvider()
    } else return
    try {
      if (provider) {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
          await set(result.user.uid, {
            displayName: result.user.displayName,
            email: result.user.email,
            createdAt: Timestamp.now(),
            photoURL: result.user.photoURL,
          })
        }
        dispatch(closeModal())
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStatus({ loading: false, provider: null })
    }
  }
  return (
    <>
      <Button
        type="button"
        fluid
        color="black"
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === "github"}
        onClick={() => handleSocialLogin("github")}
      >
        <Icon name="github" /> Login with GitHub
      </Button>
      <Button
        type="button"
        fluid
        color="google plus"
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === "google"}
        onClick={() => handleSocialLogin("google")}
      >
        <Icon name="google" /> Login with Google
      </Button>
    </>
  )
}
