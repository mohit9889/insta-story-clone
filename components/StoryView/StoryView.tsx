import Image from "next/image";
import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import { User } from "~/types/types";
import { getTimeAgoString } from "~/utils/time";

type Props = {
  story: User | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const StoryView = ({ story, onClose, onNext, onPrev }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-500 ${!story ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
    >
      <div
        className={`relative flex flex-col items-center justify-center w-full h-full`}
      >
        <button className="absolute top-5 right-3 z-[10000]" onClick={onClose}>
          <span className="h-6 w-6">
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
        {storiesData.length > 0 && (
          <Stories
            key={story.id}
            stories={storiesData}
            currentIndex={currentIndex}
            onAllStoriesEnd={onNext}
            onPrevious={handlePrevious}
            onNext={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
            width="100%"
            height="100%"
            defaultInterval={5000}
            storyStyles={{ height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
    </div>
  );
};

export default StoryView;
