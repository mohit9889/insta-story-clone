import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { fetchFeed } from "~/api";
import StoryList from "~/components/Stories/StoryList";
import Home, { getServerSideProps } from "~/pages/index";
import { User } from "~/types/types";

// Mock the fetchFeed function
jest.mock("~/api", () => ({
  fetchFeed: jest.fn(),
}));

jest.mock("~/components/Stories/StoryList", () => {
  return jest.fn(() => <div data-testid="story-list" />);
});

const mockFeed: User[] = [
  {
    id: 1,
    user_name: "John Doe",
    profile_image: "https://picsum.photos/128/128?random=223",
    stories: [],
  },
  {
    id: 2,
    user_name: "Jane Doe",
    profile_image: "https://picsum.photos/128/128?random=223",
    stories: [],
  },
];

describe("Home component", () => {
  it("renders StoryList with the feed", () => {
    render(<Home feed={mockFeed} />);
    expect(screen.getByTestId("story-list")).toBeInTheDocument();
    expect(StoryList).toHaveBeenCalledWith({ stories: mockFeed }, {});
  });
});

describe("getServerSideProps", () => {
  it("fetches the feed and returns it as a prop", async () => {
    (fetchFeed as jest.Mock).mockResolvedValue(mockFeed);

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        feed: mockFeed,
      },
    });
    expect(fetchFeed).toHaveBeenCalledTimes(1);
  });
});
