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
          <img src="/advertiser-white.png" alt="logo" />
        </MenuItem>
        <MenuItem name="Adds" as={NavLink} to="/adds" />
        <MenuItem>
          <Button
            as={NavLink}
            to="createAdd"
            floated="right"
            positive={true}
            content="Create add"
          />
        </MenuItem>
        {authenticated ? <SignInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
