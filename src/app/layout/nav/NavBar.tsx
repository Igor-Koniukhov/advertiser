import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import { SignInMenu } from "@/app/layout/nav/SignInMenu.tsx"
import { useState } from "react"
import { SignedOutButtons } from "@/app/layout/nav/SignedOutButtons.tsx"

export default function NavBar() {
  const [auth, setAuth] = useState(true)
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
        {auth ? <SignInMenu setAuth={setAuth} /> : <SignedOutButtons setAuth={setAuth} />}
      </Container>
    </Menu>
  )
}
