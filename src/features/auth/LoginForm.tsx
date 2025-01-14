import { ModalsWrapper } from "@/app/common/modals/ModalsWrapper.tsx"
import { FieldValues, useForm } from "react-hook-form"
import { Button, Divider, Form, Label } from "semantic-ui-react"
import { useAppDispatch } from "@/app/store/store.ts"
import { closeModal } from "@/app/common/modals/modalSlice.ts"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { auth } from "@/app/config/firebase.ts"
import { SocialLogin } from "@/features/auth/SocialLogin.tsx"

export const LoginForm = () => {
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
      await signInWithEmailAndPassword(auth, data.email, data.password)
      dispatch(closeModal())
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      })
    }
  }
  return (
    <ModalsWrapper header="Sign into re-events" size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          content="Login"
        />
        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Form>
    </ModalsWrapper>
  )
}
