import { Grid } from "semantic-ui-react"
import { EventDetailedHeader } from "@/features/events/details/EventDetailedHeader.tsx"
import { EventDetailedChat } from "@/features/events/details/EventDetailedChat.tsx"
import { EventDetailedSidebar } from "@/features/events/details/EventDetailedSidebar.tsx"
import { EventDetailedInfo } from "@/features/events/details/EventDetailedInfo.tsx"
import { useParams } from "react-router"
import { useAppSelector } from "@/app/store/store.ts"

export default function EventDetailedPage() {
  const { id } = useParams()
  const event = useAppSelector((state) => state.events.events.find((e) => e.id === id))
  if (!event) return <h2>Event not found</h2>
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
