import { Tab, TabPane } from "semantic-ui-react"
import { ProfileAbout } from "@/features/profiles/ProfileAbout.tsx"
import { Profile } from "@/app/types/profile.ts"
import { ProfilePhoto } from "@/features/profiles/ProfilePhoto.tsx"

type Props = {
  profile: Profile
}

export const ProfileContent = ({ profile }: Props) => {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhoto profile={profile} /> },
    { menuItem: "Events", render: () => <TabPane>Events</TabPane> },
    { menuItem: "Followers", render: () => <TabPane>Followers</TabPane> },
    { menuItem: "Following", render: () => <TabPane>Following</TabPane> },
  ]
  return <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} />
}
