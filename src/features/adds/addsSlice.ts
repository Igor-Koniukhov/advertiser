import { AppEvent } from "@/app/types/event.ts"
import { PayloadAction } from "@reduxjs/toolkit"
import { Timestamp } from "@firebase/firestore"
import { createGenericSlice, GenericActions, GenericState } from "@/app/store/genericSlice.ts"

type State = {
  data: AppEvent[]
}

const initialState: State = {
  data: [],
}

export const addsSlice = createGenericSlice({
  name: "adds",
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = action.payload
        state.status = "finished"
      },
      prepare: (adds) => {
        let addsArray: AppEvent[] = []
        Array.isArray(adds) ? (addsArray = adds) : addsArray.push(adds)
        const mapped = addsArray.map((a: any) => {
          return { ...a, date: (a.date as Timestamp).toDate().toDateString() }
        })
        return { payload: mapped }
      },
    },
  },
})

export const actions = addsSlice.actions as GenericActions<AppEvent[]>
