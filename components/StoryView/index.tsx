import Stories from "react-insta-stories";
import { User } from "~/types/types";
import styles from "./style.module.scss";

type Props = {
  story: User;
};

const StoryView = ({ story }: Props) => {
  const storiesData = story.stories.map((_story) => ({
    url: _story.image,
    type: "image",
    header: {
      heading: story.user_name,
      subheading: "Posted 30m ago",
      profileImage: story.profile_image,
    },
  }));

  return (
    <div className={styles["story-view"]}>
      <Stories
        stories={storiesData}
        height="100%"
        width="100%"
        defaultInterval={5000}
        storyStyles={{ height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default StoryView;
