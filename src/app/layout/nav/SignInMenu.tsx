import { Dropdown, Image, Menu } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/store/store.ts"
import { signOut } from "@/features/auth/authSlice.tsx"

export const SignInMenu = () => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSignOut = () => {
    dispatch(signOut())
    navigate("/")
  }
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text={currentUser?.email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create event" icon="plus" />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
