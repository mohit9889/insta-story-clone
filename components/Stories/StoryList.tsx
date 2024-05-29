import { useState } from "react";
import StoryView from "~/components/StoryView";
import { User } from "~/types/types";
import Story from "./Story";

type Props = {
  stories: User[];
};

const StoryList = ({ stories }: Props) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null,
  );
  const [currentSelectedStory, setCurrentSelectedStory] = useState<User | null>(
    null,
  );

  const handleSelectedStories = (index: number) => {
    setCurrentStoryIndex(index);
    setCurrentSelectedStory(stories[index]);
  };

  const handleNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextIndex);
      setCurrentSelectedStory(stories[nextIndex]);
    } else {
      // Close the story view when the last story is finished
      setCurrentStoryIndex(null);
      setCurrentSelectedStory(null);
    }
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto p-2 hide-scrollbar border-b-[1px]">
        {stories.map((story, index) => (
          <Story
            key={story.id}
            story={story}
            onClick={() => handleSelectedStories(index)}
          />
        ))}
      </div>

      {currentSelectedStory && (
        <StoryView
          story={currentSelectedStory}
          onClose={() => {
            setCurrentStoryIndex(null);
            setCurrentSelectedStory(null);
          }}
          onNext={handleNextStory}
        />
      )}
    </>
  );
};

export default StoryList;
