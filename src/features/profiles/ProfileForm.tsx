import { Profile } from "@/app/types/profile.ts"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { FieldValues, useForm } from "react-hook-form"
import { updateProfile } from "@firebase/auth"
import { auth } from "@/app/config/firebase.ts"
import { Button, Form } from "semantic-ui-react"

type Props = {
  profile: Profile
  setEditMode: (value: boolean) => void
}

export const ProfileForm = ({ profile, setEditMode }: Props) => {
  const { update } = useFirestore("profiles")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      displayName: profile.displayName,
      description: profile.description,
    },
  })
  const onSubmit = async (data: FieldValues) => {
    await update(profile.id, data)
    if (profile.displayName !== data.displayName) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName,
      })
    }
    setEditMode(false)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        placeholder="Display Name"
        {...register("displayName", { required: true })}
        error={errors.displayName && "Display name is required"}
      />
      <Form.TextArea placeholder="Tell us about yourself" {...register("description")} />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting || !isValid || !isDirty}
        floated="right"
        type="submit"
        size="large"
        positive
        content="Update profile"
      />
    </Form>
  )
}
