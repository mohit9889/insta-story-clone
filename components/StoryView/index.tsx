import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import CloseSvg from "~/public/svg/close.svg";
import { User } from "~/types/types";
import styles from "./style.module.scss";

type Props = {
  story: User;
  onClose: () => void;
  onNext: () => void;
};

const StoryView = ({ story, onClose, onNext }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset the currentIndex to 0 whenever the story prop changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [story]);

  if (!story || !story.stories) return null;

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
      <button className="absolute right-3 top-5 z-[10000]" onClick={onClose}>
        <span className="icon-20 icon-white">
          <CloseSvg />
        </span>
      </button>
      {storiesData.length && (
        <Stories
          key={story.id}
          stories={storiesData}
          currentIndex={currentIndex}
          onAllStoriesEnd={() => {
            onNext();
          }}
          width="100%"
          height="100vh"
          defaultInterval={5000}
          storyStyles={{ height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default StoryView;
