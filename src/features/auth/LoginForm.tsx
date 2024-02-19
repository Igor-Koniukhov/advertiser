import { ModalsWrapper } from "@/app/common/modals/ModalsWrapper.tsx"
import { FieldValues, useForm } from "react-hook-form"
import { Button, Form } from "semantic-ui-react"
import { useAppDispatch } from "@/app/store/store.ts"
import { closeModal } from "@/app/common/modals/modalSlice.ts"
import { signIn } from "@/features/auth/authSlice.tsx"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onTouched",
  })
  const dispatch = useAppDispatch()
  const onSubmit = (data: FieldValues) => {
    dispatch(signIn(data))
    dispatch(closeModal())
  }
  return (
    <ModalsWrapper header="Sign into re-events">
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
          placeholder="Email address"
          {...register("password", { required: true, pattern: /^[a-zA-Z]\w{3,14}$/ })}
          error={
            (errors.password?.type === "required" && "Password is required") ||
            (errors.password?.type === "pattern" && "Password is invalid")
          }
        />
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Login"
        />
      </Form>
    </ModalsWrapper>
  )
}
