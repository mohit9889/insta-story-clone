import Image from "next/image";
import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import { User } from "~/types/types";
import { getTimeAgoString } from "~/utils/time";
import styles from "./style.module.scss";

type Props = {
  story: User | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const StoryView = ({ story, onClose, onNext, onPrev }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset the currentIndex to 0 whenever the story prop changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [story]);

  if (!story || !story.stories || story.stories.length === 0) return null;

  const storiesData = story.stories.map((_story) => ({
    url: _story.image,
    type: _story.data_type,
    header: {
      heading: story.user_name,
      subheading: `Posted ${getTimeAgoString(new Date(_story.posted_on))}`,
      profileImage: story.profile_image,
    },
  }));

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onPrev();
    }
  };

  return (
    <div className={styles["story-view"]} data-TestId="Stories">
      <button className="absolute right-3 top-5 z-[10000]" onClick={onClose}>
        <span className="h-[20px] w-[20px]">
          <Image
            src="/svg/close.svg"
            alt="close icon"
            height={20}
            width={20}
            priority
            fetchPriority="high"
          />
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
          onPrevious={() => {
            handlePrevious();
          }}
          onNext={() => {
            setCurrentIndex(currentIndex + 1);
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
