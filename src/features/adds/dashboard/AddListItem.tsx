import {
  Button,
  Icon,
  Item,
  ItemGroup,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react"
import AddListAttendee from "./AddListAttendee.tsx"
import { AppEvent } from "@/app/types/event"
import { Link } from "react-router-dom"

type Props = {
  add: AppEvent
}

export default function AddListItem({ add }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={add.hostPhotoURL || "/user.png"} />
            <Item.Content>
              <Item.Header>{add.title}</Item.Header>
              <Item.Description>Hosted by {add.hostedBy}</Item.Description>
              {add.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon="right"
                  color="red"
                  content="Add not active."
                />
              )}
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
        <Button color="red" floated="right" content="Delete" />
        <Button as={Link} to={`/adds/${add.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </SegmentGroup>
  )
}
