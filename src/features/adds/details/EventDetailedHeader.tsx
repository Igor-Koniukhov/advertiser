import { Button, Header, Image, Item, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { AppEvent } from "@/app/types/event.ts"
type Props = {
  add: AppEvent
}

export const EventDetailedHeader = ({ add }: Props) => {
  const eventImageStyle = {
    filter: "brightness(30%)",
  }

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  }
  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={`/categoryImages/${add.category}.jpg`} fluid style={eventImageStyle} />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header size="huge" content={add.title} style={{ color: "white" }} />
                  <p>{add.date}</p>
                  <p>
                    Hosted by <strong>{add.hostedBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom">
          <Button>Cancel My Place</Button>
          <Button color="teal">JOIN THIS EVENT</Button>

          <Button as={Link} to={`/manage/${add.id}`} color="orange" floated="right">
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    </>
  )
}
