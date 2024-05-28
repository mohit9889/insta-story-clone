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
      <h1 className="text-2xl font-semibold p-4">Instagram</h1>
      <StoryList stories={feed} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data using the fetchFeed function
  const feed = await fetchFeed();

  return {
    props: {
      feed,
    },
  };
};

export default Home;
