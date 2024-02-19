import NavBar from "./nav/NavBar"
import { Container } from "semantic-ui-react"
import { Outlet, useLocation } from "react-router-dom"
import HomePage from "@/features/home/HomePage"
import { ModalManager } from "@/app/common/modals/ModalManager.tsx"

function App() {
  const location = useLocation()
  return (
    <>
      <ModalManager />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default App
