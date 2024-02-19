import { AppEvent } from "@/app/types/event"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
}

export default function EventList({ events }: Props) {
  return (
    <>
      {events.map((event: AppEvent) => (
        <EventListItem
          event={event}
          key={event.id}
        />
      ))}
    </>
  )
}
