import Image from "next/image";
import { User } from "~/types/types";

type Props = {
  story: User;
  onClick: () => void;
};

const Story = ({ story, onClick }: Props) => {
  if (!story) return null;

  return (
    <button
      key={story.id}
      className="flex flex-col items-center"
      onClick={onClick}
    >
      <div className="mt-1 mb-2 w-[56px] h-[56px] ring-2 ring-red-500 rounded-full p-1">
        <Image
          src={story.profile_image}
          alt={story.user_name}
          height={56}
          width={56}
          className="rounded-full"
          priority
        />
      </div>
      <span className="text-xs">
        {story.user_name.length > 8
          ? `${story.user_name.slice(0, 8)}...`
          : story.user_name}
      </span>
    </button>
  );
};

export default Story;
