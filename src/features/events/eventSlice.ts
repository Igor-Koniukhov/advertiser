import { AppEvent } from "@/app/types/event.ts"
import { sampleData } from "@/app/api/sampleData.ts"
import { createSlice } from "@reduxjs/toolkit"

type State = {
  events: AppEvent[]
}

const initialState: State = {
  events: sampleData,
}

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload)
    },
    updateEvent: (state, action) => {
      state.events[state.events.findIndex((e) => e.id === action.payload.id)] = action.payload
    },
    deleteEvent: (state, action) => {
      state.events.splice(
        state.events.findIndex((e) => e.id === action.payload.id),
        1,
      )
    },
  },
})

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions
