import { createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import AddsDashboard from "@/features/adds/dashboard/AddsDashboard.tsx"
import EventDetailedPage from "@/features/adds/details/EventDetailedPage"
import AddsForm from "@/features/adds/form/AddsForm.tsx"
import { AccountPage } from "@/features/auth/AccountPage.tsx"
import { ProfilePage } from "@/features/profiles/ProfilePage.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/adds", element: <AddsDashboard /> },
      { path: "/adds/:id", element: <EventDetailedPage /> },
      { path: "/manage/:id", element: <AddsForm /> },
      { path: "/profiles/:id", element: <ProfilePage /> },
      { path: "/createAdd", element: <AddsForm key="create" /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
])
