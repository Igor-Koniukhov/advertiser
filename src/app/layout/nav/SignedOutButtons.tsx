import { Button, MenuItem } from "semantic-ui-react"
import { useAppDispatch } from "@/app/store/store.ts"
import { openModal } from "@/app/common/modals/modalSlice.ts"

export const SignedOutButtons = () => {
  const dispatch = useAppDispatch()
  return (
    <MenuItem position="right">
      <Button
        basic
        inverted
        content="Login"
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
      />
      <Button basic inverted content="Register" style={{ marginLeft: "0.5em" }} />
    </MenuItem>
  )
}
