import { AppEvent } from "@/app/types/event"
import AddListItem from "./AddListItem.tsx"

type Props = {
  events: AppEvent[]
}

export default function AddsList({ events }: Props) {
  return (
    <>
      {events.map((event: AppEvent) => (
        <AddListItem add={event} key={event.id} />
      ))}
    </>
  )
}
