import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react"
import AddListAttendee from "./AddListAttendee.tsx"
import { AppEvent } from "@/app/types/event"
import { Link } from "react-router-dom"
import { useState } from "react"
import { deleteDoc, doc } from "@firebase/firestore"
import { db } from "@/app/config/firebase.ts"
import { toast } from "react-toastify"

type Props = {
  add: AppEvent
}

export default function AddtListItem({ add }: Props) {
  const [loading, setLoading] = useState(false)

  const removeAddvertise = async () => {
    setLoading(true)
    try {
      await deleteDoc(doc(db, "adds", add.id as string))
    } catch (error: unknown) {
      console.log(error)
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={add.hostPhotoURL || "/user.png"} />
            <Item.Content>
              <Item.Header>{add.title}</Item.Header>
              <Item.Description>Hosted by {add.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {add.date}
          <Icon name="marker" /> {add.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {add.attendees!.map((attendee: any) => (
            <AddListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{add.description}</span>
        <Button
          loading={loading}
          onClick={removeAddvertise}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button as={Link} to={`/adds/${add.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </SegmentGroup>
  )
}
