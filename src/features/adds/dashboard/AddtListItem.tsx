import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react"
import AddListAttendee from "./AddListAttendee.tsx"
import { AppEvent } from "@/app/types/event"
import { Link } from "react-router-dom"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"

type Props = {
  add: AppEvent
}

export default function AddtListItem({ add }: Props) {
  const { remove } = useFirestore("adds")

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
          onClick={() => remove(add.id as string)}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button as={Link} to={`/adds/${add.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </SegmentGroup>
  )
}
