import { Button, Grid, Icon, Segment } from "semantic-ui-react"
import { AppEvent } from "@/app/types/event.ts"

type Props = {
  add: AppEvent
}
export const EventDetailedInfo = ({ add }: Props) => {
  return (
    <>
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{add.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{add.date}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{add.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button color="teal" size="tiny" content="Show Map" />
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    </>
  )
}
