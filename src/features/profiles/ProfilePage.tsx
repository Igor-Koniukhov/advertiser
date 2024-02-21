import { Grid } from "semantic-ui-react"
import { ProfileHeader } from "@/features/profiles/ProfileHeader.tsx"
import { ProfileContent } from "@/features/profiles/ProfileContent.tsx"
import { useParams } from "react-router"
import { useAppSelector } from "@/app/store/store.ts"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { useEffect } from "react"
import { actions } from "@/features/profiles/profileSlice.ts"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"

export const ProfilePage = () => {
  const { id } = useParams()
  const { status, data } = useAppSelector((state) => state.profiles)
  const profile = data.find((x) => x.id === id)
  const { loadDocument } = useFirestore("profiles")
  useEffect(() => {
    if (id) loadDocument(id, actions)
  }, [id, loadDocument])
  if (status === "loading") return <LoadingComponent content="Loading profile..." />
  if (!profile) return <h2>Not found</h2>
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  )
}
