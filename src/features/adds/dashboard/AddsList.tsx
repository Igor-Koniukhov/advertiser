import { AppEvent } from "@/app/types/event"
import AddtListItem from "./AddtListItem.tsx"

type Props = {
  events: AppEvent[]
}

export default function AddsList({ events }: Props) {
  return (
    <>
      {events.map((event: AppEvent) => (
        <AddtListItem add={event} key={event.id} />
      ))}
    </>
  )
}
