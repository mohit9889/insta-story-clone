import { User } from "~/types/types";
import Story from "./Story";

type Props = {
  stories: User[];
};

const StoryList = ({ stories }: Props) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-2 hide-scrollbar border-b-[1px]">
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
