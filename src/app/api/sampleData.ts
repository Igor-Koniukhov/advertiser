import { Timestamp } from "@firebase/firestore"
export const sampleData = [
  {
    id: "1",
    title: "Trip to Empire State building",
    date: Timestamp.fromDate(new Date(Date.now() + 30 * 86400000)),
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "NY, USA",
    venue: "Trip to Empire State Building, 5th Avenue, New York, NY, USA",
    hostedBy: "Bob",
    hostPhotoURL: "",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: Timestamp.fromDate(new Date(Date.now() + 60 * 86400000)),
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Visite some places",
    hostedBy: "Tom",
    hostPhotoURL: "",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "",
      },
    ],
  },
]
