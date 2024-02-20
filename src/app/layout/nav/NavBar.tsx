import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import { SignInMenu } from "@/app/layout/nav/SignInMenu.tsx"
import { SignedOutButtons } from "@/app/layout/nav/SignedOutButtons.tsx"
import { useAppSelector } from "@/app/store/store.ts"
import { sampleData } from "@/app/api/sampleData.ts"
import { doc, setDoc } from "@firebase/firestore"
import { db } from "@/app/config/firebase.ts"

export default function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth)
  const seedData = () => {
    sampleData.forEach(async (event) => {
      const { id, ...rest } = event
      await setDoc(doc(db, "adds", id), {
        ...rest,
      })
    })
  }
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
        {import.meta.env.DEV && (
          <MenuItem>
            <Button inverted={true} color="teal" content="Seed data" onClick={seedData} />
          </MenuItem>
        )}
        {authenticated ? <SignInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
