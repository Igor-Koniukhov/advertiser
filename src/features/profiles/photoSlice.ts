import { Photo } from "@/app/types/profile.ts"
import { createGenericSlice, GenericState } from "@/app/store/genericSlice.ts"

type State = {
  data: Photo[]
}

const initialState: State = {
  data: [],
}

export const photoSlice = createGenericSlice({
  name: "photos",
  initialState: initialState as GenericState<Photo[]>,
  reducers: {},
})

export const actions = photoSlice.actions
