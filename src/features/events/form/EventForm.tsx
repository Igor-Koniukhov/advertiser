import { AppEvent } from "@/app/types/event"
import { ChangeEvent, useState } from "react"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "@/app/store/store.ts"
import { createEvent, updateEvent } from "@/features/events/eventSlice.ts"
import { createId } from "@paralleldrive/cuid2"

export default function EventForm() {
  let { id } = useParams()
  const event = useAppSelector((state) => state.events.events.find((e) => e.id === id))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialValues = event ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  }
  const [values, setValue] = useState<AppEvent>(initialValues)
  const onSubmit = () => {
    id = id ?? createId()
    event
      ? dispatch(updateEvent({ ...event, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id,
            hostedBy: "bob",
            attendees: [],
            hostPhotoURL: "",
          }),
        )
    navigate(`/events/${id}`)
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue({ ...values, [name]: value })
  }
  return (
    <>
      <Segment clearing>
        <Header content={event ? "Update Event" : "Create Event"} />
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
          <Button as={Link} to="/events" type="button" floated="right" content="Cancel" />
        </Form>
      </Segment>
    </>
  )
}
