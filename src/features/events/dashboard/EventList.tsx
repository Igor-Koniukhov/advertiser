import { AppEvent } from "@/app/types/event"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
  selectEvent: (event: AppEvent) => void
  deleteEvent: (eventId: string) => void
}

export default function EventList({ events, selectEvent, deleteEvent }: Props) {
  return (
    <>
      {events.map((event: AppEvent) => (
        <EventListItem
          event={event}
          key={event.id}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  )
}
