import { Grid } from "semantic-ui-react"
import AddsList from "./AddsList.tsx"
import { useAppSelector } from "@/app/store/store.ts"
import { useEffect, useState } from "react"
import { actions } from "@/features/adds/addsSlice.ts"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { AddsFilters } from "@/features/adds/dashboard/AddsFilters.tsx"
import { QueryOptions } from "@/app/hooks/firestore/hooks.ts"

export default function AddsDashboard() {
  const { data: adds, status } = useAppSelector((state) => state.adds)
  const { loadCollection } = useFirestore("adds")
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: ">=", value: new Date() },
  ])

  useEffect(() => {
    loadCollection(actions, {
      queries: query,
    })
  }, [loadCollection, query])
  if (status === "loading") return <LoadingComponent />
  return (
    <Grid>
      <Grid.Column width={10}>
        <AddsList events={adds} />
      </Grid.Column>
      <Grid.Column width={6}>
        <AddsFilters setQuery={setQuery} />
      </Grid.Column>
    </Grid>
  )
}
