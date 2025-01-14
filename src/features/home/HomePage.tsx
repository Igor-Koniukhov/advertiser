import { Button, Container, Header, Icon, Image, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header>
          <Image
            size="massive"
            src="/advertiser-white.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Event Advertiser
        </Header>
        <Button size="huge" inverted as={Link} to="/adds">
          Get started
          <Icon name="caret right" inverted />
        </Button>
      </Container>
    </Segment>
  )
}
