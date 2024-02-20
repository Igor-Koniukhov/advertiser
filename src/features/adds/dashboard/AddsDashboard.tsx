import { Grid } from "semantic-ui-react"
import AddsList from "./AddsList.tsx"
import { useAppSelector } from "@/app/store/store.ts"
import { useEffect } from "react"
import { actions } from "@/features/adds/addsSlice.ts"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"

export default function AddsDashboard() {
  const { data: adds, status } = useAppSelector((state) => state.adds)
  const { loadCollection } = useFirestore("adds")

  useEffect(() => {
    loadCollection(actions)
  }, [loadCollection])
  if (status === "loading") return <LoadingComponent />
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
