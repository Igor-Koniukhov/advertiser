import { Profile } from "@/app/types/profile.ts"
import { createGenericSlice, GenericState } from "@/app/store/genericSlice.ts"
import { PayloadAction } from "@reduxjs/toolkit"
import { Timestamp } from "@firebase/firestore"

type State = {
  data: Profile[]
}

const initialState: State = {
  data: [],
}

export const profileSliece = createGenericSlice({
  name: "profile",
  initialState: initialState as GenericState<Profile[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<Profile[]>) => {
        state.data = action.payload
        state.status = "finished"
      },
      prepare: (profiles) => {
        let profileArray: Profile[] = []
        Array.isArray(profiles) ? (profileArray = profiles) : profileArray.push(profiles)
        const mapped = profileArray.map((profile) => {
          return {
            ...profile,
            createdAt: (profile.createdAt as unknown as Timestamp).toDate().toISOString(),
          }
        })
        return { payload: mapped }
      },
    },
  },
})

export const actions = profileSliece.actions
