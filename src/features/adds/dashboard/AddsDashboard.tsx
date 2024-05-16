import { Grid } from "semantic-ui-react"
import AddsList from "./AddsList.tsx"
import { useAppSelector } from "@/app/store/store.ts"
import { useEffect, useState } from "react"
import { actions } from "@/features/adds/addsSlice.ts"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { AddsFilters } from "@/features/adds/dashboard/AddsFilters.tsx"
import { QueryOptions } from "@/app/hooks/firestore/hooks.ts"
import AddListItemPlaceholder from "@/features/adds/dashboard/AddListItemPlaceholder.tsx"

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

  return (
    <Grid>
      <Grid.Column width={10}>
        {status === "loading" ? (
          <>
            <AddListItemPlaceholder />
            <AddListItemPlaceholder />
          </>
        ) : (
          <AddsList events={adds} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <AddsFilters setQuery={setQuery} />
      </Grid.Column>
    </Grid>
  )
}
