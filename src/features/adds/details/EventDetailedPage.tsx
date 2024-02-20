import { Grid } from "semantic-ui-react"
import { EventDetailedHeader } from "@/features/adds/details/EventDetailedHeader.tsx"
import { EventDetailedChat } from "@/features/adds/details/EventDetailedChat.tsx"
import { EventDetailedSidebar } from "@/features/adds/details/EventDetailedSidebar.tsx"
import { EventDetailedInfo } from "@/features/adds/details/EventDetailedInfo.tsx"
import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "@/app/store/store.ts"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "@firebase/firestore"
import { db } from "@/app/config/firebase.ts"
import { setAdds } from "@/features/adds/addsSlice.ts"
import { toast } from "react-toastify"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"

export default function EventDetailedPage() {
  const { id } = useParams()
  const event = useAppSelector((state) => state.adds.adds.find((e) => e.id === id))
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const unsubscribe = onSnapshot(doc(db, "adds", id), {
      next: (doc) => {
        dispatch(setAdds({ id: doc.id, ...doc.data() }))
        setLoading(false)
      },
      error: (err) => {
        console.log(err)
        toast.error(err.message)
        setLoading(false)
      },
    })
    return () => unsubscribe()
  }, [id, dispatch])

  if (loading) return <LoadingComponent />
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
