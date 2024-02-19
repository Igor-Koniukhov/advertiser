import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import EventForm from "../form/EventForm"
import { sampleData } from "@/app/api/sampleData"
import { AppEvent } from "@/app/types/event"
import { useEffect, useState } from "react"

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void
  selectedEvent: AppEvent | null
  selectEvent: (event: AppEvent | null) => void
}
export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([])

  useEffect(() => {
    setEvents(sampleData)
  }, [])

  const addEvent = (event: AppEvent) => {
    setEvents((prevState) => {
      return [...prevState, event]
    })
    setFormOpen(false)
  }

  const updateEvent = (updatedEvent: AppEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
    selectEvent(null)
    setFormOpen(false)
  }

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId))
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} deleteEvent={deleteEvent}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            updateEvent={updateEvent}
            addEvent={addEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : "create"}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
