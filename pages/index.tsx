import { GetServerSideProps } from "next";
import { fetchFeed } from "~/api";
import StoryList from "~/components/Stories/StoryList";
import { User } from "~/types/types";

type Props = {
  feed: User[];
};

const Home = ({ feed }: Props) => {
  return (
    <div>
      <StoryList stories={feed} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await fetchFeed();

  return {
    props: {
      feed,
    },
  };
};

export default Home;
