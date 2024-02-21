export type Profile = {
  id: string
  metadata?: Metadata | null
  photoURL: string | null
  displayName: string | null
  createdAt: string
  description: string
}

type Metadata = {
  createdAt: string
}
export type Photo = {
  id: string
  name: string
  url: string
}
