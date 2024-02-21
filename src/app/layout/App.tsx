import NavBar from "./nav/NavBar"
import { Container } from "semantic-ui-react"
import { Outlet, useLocation } from "react-router-dom"
import HomePage from "@/features/home/HomePage"
import { ModalManager } from "@/app/common/modals/ModalManager.tsx"
import { useEffect } from "react"
import { onAuthStateChanged } from "@firebase/auth"
import { auth } from "@/app/config/firebase.ts"
import { useAppDispatch } from "@/app/store/store.ts"
import { logout, signIn } from "@/features/auth/authSlice.tsx"

function App() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user))
        } else {
          dispatch(logout())
        }
      },
      error: (error) => console.log(error),
      complete: () => {},
    })
  }, [dispatch])
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
