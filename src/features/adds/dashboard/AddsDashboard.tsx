import { Grid } from "semantic-ui-react"
import AddsList from "./AddsList.tsx"
import { useAppDispatch, useAppSelector } from "@/app/store/store.ts"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query } from "@firebase/firestore"
import { db } from "@/app/config/firebase.ts"
import { AppEvent } from "@/app/types/event.ts"
import { setAdds } from "@/features/adds/addsSlice.ts"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"

export default function AddsDashboard() {
  const { adds } = useAppSelector((state) => state.adds)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "adds"))
    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const evts: AppEvent[] = []
        querySnapshot.forEach((doc) => {
          evts.push({ id: doc.id, ...doc.data() } as AppEvent)
        })
        dispatch(setAdds(evts))
        setLoading(false)
      },
      error: (err) => {
        console.log(err)
        setLoading(false)
      },
      complete: () => console.log("never will see this!"),
    })
    return () => unsubscribe()
  }, [dispatch])
  if (loading) return <LoadingComponent />
  return (
    <Grid>
      <Grid.Column width={10}>
        <AddsList events={adds} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  )
}
