import { Button, Card, Grid, Header, Image, TabPane } from "semantic-ui-react"
import { Profile } from "@/app/types/profile.ts"
import { useEffect, useState } from "react"
import { auth, storage } from "@/app/config/firebase.ts"
import { PhotoUpload } from "@/features/profiles/PhotoUpload.tsx"
import { useAppSelector } from "@/app/store/store.ts"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { actions } from "@/features/profiles/photoSlice.ts"
import { Photo } from "@/app/types/profile.ts"
import { updateProfile } from "@firebase/auth"
import { deleteObject, ref } from "firebase/storage"
import { toast } from "react-toastify"

type Props = {
  profile: Profile
}
export const ProfilePhoto = ({ profile }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const isCurrentUser = auth.currentUser?.uid === profile.id
  const { data: photos, status } = useAppSelector((state) => state.photos)
  const { loadCollection, remove } = useFirestore(`profiles/${profile.id}/photos`)
  const { update } = useFirestore("profiles")
  useEffect(() => {
    loadCollection(actions)
  }, [loadCollection])

  const handleSetMain = async (photo: Photo) => {
    await update(profile.id, {
      photoURL: photo.url,
    })
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url,
    })
  }

  const handleDeletePhoto = async (photo: Photo) => {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`)
      await deleteObject(storageRef)
      await remove(photo.id)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <TabPane loading={status === "loading"}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="photo" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add photo"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUpload profile={profile} setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button
                        basic
                        color="green"
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleSetMain(photo)}
                      >
                        Main
                      </Button>
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        onClick={() => handleDeletePhoto(photo)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  )
}
