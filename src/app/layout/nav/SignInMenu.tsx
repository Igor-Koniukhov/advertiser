import { Dropdown, Image, Menu } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "@/app/store/store.ts"
import { signOut } from "@firebase/auth"
import { auth } from "@/app/config/firebase.ts"

export const SignInMenu = () => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleSignOut = async () => {
    await signOut(auth)
    navigate("/")
  }
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.photoURL || "/user.png"} />
      <Dropdown pointing="top left" text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create event" icon="plus" />
          <Dropdown.Item
            as={Link}
            to={`/profiles/${currentUser?.uid}`}
            text="My profile"
            icon="user"
          />
          <Dropdown.Item as={Link} to="/account" text="My account" icon="settings" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
