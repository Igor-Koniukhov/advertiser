import { Grid } from "semantic-ui-react"
import { EventDetailedHeader } from "@/features/adds/details/EventDetailedHeader.tsx"
import { EventDetailedChat } from "@/features/adds/details/EventDetailedChat.tsx"
import { EventDetailedSidebar } from "@/features/adds/details/EventDetailedSidebar.tsx"
import { EventDetailedInfo } from "@/features/adds/details/EventDetailedInfo.tsx"
import { useParams } from "react-router"
import { useAppSelector } from "@/app/store/store.ts"
import { useEffect } from "react"
import { actions } from "@/features/adds/addsSlice.ts"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"

export default function EventDetailedPage() {
  const { id } = useParams()
  const add = useAppSelector((state) => state.adds.data.find((e) => e.id === id))
  const { status } = useAppSelector((state) => state.adds)
  const { loadDocument } = useFirestore("adds")

  useEffect(() => {
    if (!id) return
    loadDocument(id, actions)
  }, [id, loadDocument])

  if (status === "loading") return <LoadingComponent />
  if (!add) return <h2>Event not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader add={add} />
        <EventDetailedInfo add={add} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
