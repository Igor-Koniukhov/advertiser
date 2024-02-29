import { Button, Header, Image, Item, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { AppEvent } from "@/app/types/event.ts"
import { useAppSelector } from "@/app/store/store.ts"
import { toast } from "react-toastify"
import { useState } from "react"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { arrayRemove, arrayUnion } from "@firebase/firestore"

type Props = {
  add: AppEvent
}

export const EventDetailedHeader = ({ add }: Props) => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const [loadin, setLoading] = useState(false)
  const { update } = useFirestore("adds")
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
  const toggleAttendance = async () => {
    if (!currentUser) {
      toast.error("Must be logged in")
      return
    }
    setLoading(true)
    if (add.isGoing) {
      const attendee = add.attendees?.find((x) => x.id === currentUser.uid)
      await update(add.id!, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser.uid),
      })
      setLoading(false)
    } else {
      update(add.id!, {
        attendees: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        attendeeIds: arrayUnion(currentUser.uid),
      })
      setLoading(false)
    }
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

        <Segment attached="bottom" clearing>
          {add.isHost ? (
            <Button as={Link} to={`/manage/${add.id}`} color="orange" floated="right">
              Manage Event
            </Button>
          ) : (
            <Button
              content={add.isGoing ? "Cancel my place" : "JOIN THIS EVENT"}
              color={add.isGoing ? "grey" : "teal"}
              onClick={toggleAttendance}
              loading={loadin}
            />
          )}
        </Segment>
      </Segment.Group>
    </>
  )
}
