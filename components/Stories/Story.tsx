import Image from "next/image";
import { User } from "~/types/types";

type Props = {
  story: User;
};

const Story = ({ story }: Props) => {
  return (
    <button key={story.id} className="flex flex-col items-center">
      <div className="mt-1 mb-2 w-[56px] h-[56px] ring-2 ring-red-500 rounded-full p-1">
        <Image
          src={story.profile_image}
          alt={story.user_name}
          height={56}
          width={56}
          className="rounded-full"
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
