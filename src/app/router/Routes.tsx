import { createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import AddsDashboard from "@/features/adds/dashboard/AddsDashboard.tsx"
import EventDetailedPage from "@/features/adds/details/EventDetailedPage"
import AddsForm from "@/features/adds/form/AddsForm.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/adds", element: <AddsDashboard /> },
      { path: "/adds/:id", element: <EventDetailedPage /> },
      { path: "/manage/:id", element: <AddsForm /> },
      { path: "/createAdd", element: <AddsForm key="create" /> },
    ],
  },
])
