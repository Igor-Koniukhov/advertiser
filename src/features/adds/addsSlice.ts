import { AppEvent } from "@/app/types/event.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Timestamp } from "@firebase/firestore"

type State = {
  adds: AppEvent[]
}

const initialState: State = {
  adds: [],
}

export const addsSlice = createSlice({
  name: "adds",
  initialState,
  reducers: {
    setAdds: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.adds = action.payload
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

export const { setAdds } = addsSlice.actions
