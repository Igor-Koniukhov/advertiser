import { FilePond, registerPlugin } from "react-filepond"

import "filepond/dist/filepond.min.css"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useState } from "react"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { auth } from "@/app/config/firebase.ts"
import { createId } from "@paralleldrive/cuid2"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/app/config/firebase.ts"
import { Profile } from "@/app/types/profile.ts"
import { updateProfile } from "@firebase/auth"

registerPlugin(FilePondPluginImageCrop, FilePondPluginImagePreview, FilePondPluginImageTransform)
type Props = {
  profile: Profile
  setEditMode: (value: boolean) => void
}
export const PhotoUpload = ({ profile, setEditMode }: Props) => {
  const [files, setFiles] = useState<any>([])
  const { update } = useFirestore("profiles")
  const { set } = useFirestore(`profiles/${auth.currentUser?.uid}/photos`)

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      server={{
        process: (_fieldName, file, _metadata, load, error, progress) => {
          const id = createId()
          const storageRef = ref(storage, `${auth.currentUser?.uid}/user_images/${id}`)
          const task = uploadBytesResumable(storageRef, file)
          task.on(
            "state_changed",
            (snap) => {
              progress(true, snap.bytesTransferred, snap.totalBytes)
            },
            (err) => {
              error(err.message)
            },
            () => {
              getDownloadURL(task.snapshot.ref).then(async (url) => {
                if (!profile.photoURL) {
                  await update(profile.id, {
                    photoURL: url,
                  })
                  await updateProfile(auth.currentUser!, {
                    photoURL: url,
                  })
                }
                await set(id, {
                  name: file.name,
                  url,
                })
                setEditMode(false)
              })
              load(id)
            },
          )
        },
      }}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
      allowImageCrop={true}
      imageCropAspectRatio="1:1"
      instantUpload={false}
    />
  )
}
