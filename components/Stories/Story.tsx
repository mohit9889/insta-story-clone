import Image from "next/image";
import { useState } from "react";
import StoryView from "~/components/StoryView";
import StoryRing from "~/public/svg/story-ring.svg";
import { User } from "~/types/types";

type Props = {
  story: User;
};

const Story = ({ story }: Props) => {
  const [selectedStory, setSelectedStory] = useState<User | null>(null);

  const handleSelectedStories = () => {
    setSelectedStory(story);
  };

  return (
    <>
      <button
        key={story.id}
        className="flex flex-col items-center"
        onClick={handleSelectedStories}
      >
        <div className="mt-1 mb-2 w-[56px] h-[56px] rounded-full relative z-[-1]">
          <Image
            src={story.profile_image}
            alt={story.user_name}
            height={56}
            width={56}
            className="rounded-full"
          />
          <span className="absolute top-[-4px] left-[-4px]">
            <StoryRing />
          </span>
        </div>
        <span className="text-xs">
          {story.user_name.length > 8
            ? `${story.user_name.slice(0, 8)}...`
            : story.user_name}
        </span>
      </button>

      {selectedStory ? <StoryView story={selectedStory} /> : null}
    </>
  );
};

export default Story;
