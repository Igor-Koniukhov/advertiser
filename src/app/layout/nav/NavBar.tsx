import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import { SignInMenu } from "@/app/layout/nav/SignInMenu.tsx"
import { SignedOutButtons } from "@/app/layout/nav/SignedOutButtons.tsx"
import { useAppSelector } from "@/app/store/store.ts"

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth)
  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <MenuItem header as={NavLink} to="/">
          <img src="/logo.png" alt="logo" />
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to="/events" />
        <MenuItem>
          <Button
            as={NavLink}
            to="createEvent"
            floated="right"
            positive={true}
            content="Create event"
          />
        </MenuItem>
        {authenticated ? <SignInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
