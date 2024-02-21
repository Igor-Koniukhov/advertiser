import { ModalsWrapper } from "@/app/common/modals/ModalsWrapper.tsx"
import { FieldValues, useForm } from "react-hook-form"
import { Button, Form, Label } from "semantic-ui-react"
import { useAppDispatch } from "@/app/store/store.ts"
import { closeModal } from "@/app/common/modals/modalSlice.ts"
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { auth } from "@/app/config/firebase.ts"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { Timestamp } from "@firebase/firestore"

export const RegisterForm = () => {
  const { set } = useFirestore("profiles")
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onTouched",
  })
  const dispatch = useAppDispatch()
  const onSubmit = async (data: FieldValues) => {
    try {
      const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(userCreds.user, {
        displayName: data.displayName,
      })
      await set(userCreds.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      })
      dispatch(closeModal())
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      })
    }
  }
  return (
    <ModalsWrapper header="Register to Advertaser">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          defaultValue=""
          placeholder="Display name"
          {...register("displayName", {
            required: true,
          })}
          error={errors.displayName && "Display name is required"}
        />
        <Form.Input
          type="email"
          defaultValue=""
          placeholder="Email address"
          {...register("email", { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
          error={
            (errors.email?.type === "required" && "Email is required") ||
            (errors.email?.type === "pattern" && "Email is invalid")
          }
        />
        <Form.Input
          type="password"
          defaultValue=""
          placeholder="Password"
          {...register("password", { required: true, pattern: /^[a-zA-Z]\w{3,14}$/ })}
          error={
            (errors.password?.type === "required" && "Password is required") ||
            (errors.password?.type === "pattern" && "Password is invalid")
          }
        />
        {errors.root && (
          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Register"
        />
      </Form>
    </ModalsWrapper>
  )
}
