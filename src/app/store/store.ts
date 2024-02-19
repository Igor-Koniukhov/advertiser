import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { eventSlice } from "@/features/events/eventSlice.ts"
import { modalSlice } from "@/app/common/modals/modalSlice.ts"
import { authSlice } from "@/features/auth/authSlice.tsx"

export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    modals: modalSlice.reducer,
    auth: authSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
