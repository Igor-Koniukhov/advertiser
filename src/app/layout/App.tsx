import EventDashboard from "@/features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { Container } from "semantic-ui-react"
import { useState } from "react"
import { AppEvent } from "../types/event"
import { Outlet } from "react-router-dom"

function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)

  const handleSelectedEvent = (event: AppEvent) => {
    setSelectedEvent(event)
    setFormOpen(true)
  }
  const handleCreateFormOpen = ()=>{
    setSelectedEvent(null);
    setFormOpen(true)
  }
  return (
    <>
      <div>
        <NavBar setFormOpen={handleCreateFormOpen} />
        <Container className="main">
          <Outlet/>
        </Container>
      </div>
    </>
  )
}

export default App
