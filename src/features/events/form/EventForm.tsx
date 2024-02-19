import { AppEvent } from "@/app/types/event"
import { useState, ChangeEvent } from "react"
import { Segment, Header, Form, Button } from "semantic-ui-react"
import { createId } from "@paralleldrive/cuid2"
type Props = {
  setFormOpen: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (event: AppEvent) => void
}
export default function EventForm({ setFormOpen, addEvent, selectedEvent, updateEvent }: Props) {
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  }
  const [values, setValue] = useState<AppEvent>(initialValues)
  const onSubmit = () => {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : addEvent({ ...values, id: createId(), hostedBy: "bob", attendees: [], hostPhotoURL: "" })
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue({ ...values, [name]: value })
  }
  return (
    <>
      <Segment clearing>
        <Header content={selectedEvent ? "Update event" : "Create Event"} />
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <input
              type="text"
              placeholder="Event title"
              value={values.title}
              name="title"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Category"
              value={values.category}
              name="category"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Description"
              value={values.description}
              name="description"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="City"
              value={values.city}
              name="city"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              placeholder="Venue"
              value={values.venue}
              name="venue"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="date"
              placeholder="Date"
              value={values.date}
              name="date"
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            type="button"
            floated="right"
            content="Cancel"
            onClick={() => setFormOpen(false)}
          />
        </Form>
      </Segment>
    </>
  )
}
