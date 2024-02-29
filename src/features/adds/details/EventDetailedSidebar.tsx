import { Item, Label, Segment } from "semantic-ui-react"
import { AppEvent } from "@/app/types/event.ts"
import { Link } from "react-router-dom"
type Props = {
  add: AppEvent
}
export const EventDetailedSidebar = ({ add }: Props) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {add.attendees?.length} People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {add.attendees!.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.id}>
              {add.hostUid === attendee.id && (
                <Label style={{ position: "absolute" }} color="orange" ribbon="right">
                  Host
                </Label>
              )}
              <Item.Image size="tiny" src={attendee.photoURL} />
              <Item.Content verticalAlign="middle">
                <Item.Header as={Link} to={`/profiles/${attendee.id}`}>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  )
}
