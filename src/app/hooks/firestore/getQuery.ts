import { CollectionOptions } from "@/app/hooks/firestore/hooks.ts"
import { collection, orderBy, Query, query, where } from "@firebase/firestore"
import { db } from "@/app/config/firebase.ts"

export const getQuery = (path: string, options?: CollectionOptions): Query => {
  let q = collection(db, path) as Query
  if (options && options.queries) {
    options.queries.forEach(({ attribute, operator, value }) => {
      q = query(q, where(attribute, operator, value))
    })
  }
  if (options && options.sort) {
    const { attribute, order } = options.sort
    q = query(q, orderBy(attribute, order))
  }
  return q
}
