import EventDashboard from "@/features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { Container } from "semantic-ui-react"
import { useState } from "react"

function App() {
  const [formOpen, setFormOpen]=useState(false)
  return (
    <>
      <div>
        <NavBar setFormOpen={setFormOpen}/>
        <Container className="main">
          <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
        </Container>
      </div>
    </>
  )
}

export default App
