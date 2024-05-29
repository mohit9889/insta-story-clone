import { fireEvent, render, screen } from "@testing-library/react";
import StoryList from "~/components/Stories/StoryList";
import { User } from "~/types/types";

// Mocking the Story component
jest.mock(
  "~/components/Stories/Story",
  () =>
    ({ story, onClick }: { story: User; onClick: () => void }) => (
      <div data-testid={`story-${story.id}`} onClick={onClick}>
        {story.user_name}
      </div>
    ),
);

// Mocking the StoryView component
jest.mock(
  "~/components/StoryView/StoryView",
  () =>
    ({
      story,
      onClose,
      onNext,
    }: {
      story: User;
      onClose: () => void;
      onNext: () => void;
    }) => (
      <div data-testid="story-view">
        <button data-testid="close-button" onClick={onClose}>
          Close
        </button>
        <button data-testid="next-button" onClick={onNext}>
          Next
        </button>
        <div>{story.user_name}</div>
      </div>
    ),
);

// Mock stories data
const mockStories: User[] = [
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
    stories: [
      {
        id: 791,
        image: "https://picsum.photos/400/800?random=635",
        data_type: "image",
        posted_on: new Date(),
      },
    ],
  },
  {
    id: 3,
    user_name: "Alice Smith",
    profile_image: "https://picsum.photos/128/128?random=223",
    stories: [],
  },
];

describe("StoryList component", () => {
  it("renders without crashing", () => {
    render(<StoryList stories={mockStories} />);
    mockStories.forEach((story) => {
      expect(screen.getByTestId(`story-${story.id}`)).toBeInTheDocument();
    });
  });

  it("displays the selected story in StoryView when a story is clicked", () => {
    render(<StoryList stories={mockStories} />);
    fireEvent.click(screen.getByTestId("story-1"));
    expect(screen.getByTestId("story-view")).toBeInTheDocument();
    expect(screen.queryAllByText("John Doe")).toHaveLength(2);
  });

  it("closes the StoryView when the close button is clicked", () => {
    render(<StoryList stories={mockStories} />);
    fireEvent.click(screen.getByTestId("story-1"));
    expect(screen.getByTestId("story-view")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-button"));
    expect(screen.queryByTestId("story-view")).toBeNull();
  });

  it("navigates to the next story when the next button is clicked", () => {
    render(<StoryList stories={mockStories} />);
    fireEvent.click(screen.getByTestId("story-1"));
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.queryAllByText("Jane Doe")).toHaveLength(2);
  });

  it("closes the StoryView when the last story is finished", () => {
    render(<StoryList stories={mockStories} />);
    fireEvent.click(screen.getByTestId("story-3"));
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.queryByTestId("story-view")).toBeNull();
  });
});
