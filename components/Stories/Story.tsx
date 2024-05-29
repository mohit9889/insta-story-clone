import Image from "next/image";
import { User } from "~/types/types";

type Props = {
  story: User | null;
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
      <div className="mt-1 mb-2 w-[56px] h-[56px] rounded-full relative">
        <Image
          src={story.profile_image}
          alt={story.user_name}
          height={56}
          width={56}
          className="rounded-full"
          fetchPriority="high"
          priority
        />
        <div className="absolute top-[-4px] left-[-4px] w-[64px] h-[64px]">
          <Image
            src="/svg/story-ring.svg"
            height={64}
            width={64}
            alt="story ring"
          />
        </div>
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
