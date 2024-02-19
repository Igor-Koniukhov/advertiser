import { Dropdown, Image, Menu } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"

type Props = {
  setAuth: (value: boolean) => void
}
export const SignInMenu = ({ setAuth }: Props) => {
  const navigate = useNavigate()
  const handleSignOut = () => {
    setAuth(false)
    navigate("/")
  }
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text="Bob">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createEvent" text="Create event" icon="plus" />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
