import { Divider, Grid, Header, Item, Segment, Statistic, Reveal, Button } from "semantic-ui-react"
import { Profile } from "@/app/types/profile.ts"

type Props = {
  profile: Profile
}

export const ProfileHeader = ({ profile }: Props) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={13}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.photoURL || "/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Folowers" value={10} />
            <Statistic label="Folowing" value={5} />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Folowing" />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button basic fluid color="red" content="Unfollow" />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
