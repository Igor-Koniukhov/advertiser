import { Button, Grid, Header, TabPane } from "semantic-ui-react"
import { Profile } from "@/app/types/profile.ts"
import { useState } from "react"
import { ProfileForm } from "@/features/profiles/ProfileForm.tsx"
import { auth } from "@/app/config/firebase.ts"

type Props = {
  profile: Profile
}
export const ProfileAbout = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const isCurrentUser = auth.currentUser?.uid === profile.id
  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`About ${profile.displayName}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>Member since: {profile.createdAt}</strong>
                <div style={{ marginTop: 10 }}>{profile.description}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  )
}
