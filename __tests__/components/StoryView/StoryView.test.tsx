import { fireEvent, render } from "@testing-library/react";
import StoryView from "~/components/StoryView";

// Mock user data
const mockStory = {
  id: 1,
  user_name: "John Doe",
  profile_image: "https://picsum.photos/120/120?random=665",
  stories: [
    {
      id: 791,
      image: "https://picsum.photos/400/800?random=665",
    },
    {
      id: 71,
      image: "https://picsum.photos/400/800?random=638",
    },
    {
      id: 991,
      image: "https://picsum.photos/400/800?random=634",
    },
  ],
};

describe("StoryView component", () => {
  it("renders without crashing", () => {
    render(
      <StoryView story={mockStory} onClose={() => {}} onNext={() => {}} />,
    );
  });

  it("renders null when story prop or its stories data is not provided", () => {
    const { container } = render(
      <StoryView story={null} onClose={() => {}} onNext={() => {}} />,
    );
    expect(container.firstChild).toBeNull();

    const { container: container2 } = render(
      <StoryView
        story={{ id: 1, user_name: "John Doe" }}
        onClose={() => {}}
        onNext={() => {}}
      />,
    );
    expect(container2.firstChild).toBeNull();
  });

  it("calls onNext when all stories end", () => {
    const onNextMock = jest.fn();
    const { getByTestId } = render(
      <StoryView story={mockStory} onClose={() => {}} onNext={onNextMock} />,
    );

    // Find the Stories component by its data-testid attribute
    const storiesComponent = getByTestId("Stories");

    // Simulate the end of all stories
    fireEvent(storiesComponent, new Event("allStoriesEnd"));

    // Check if onNext has been called
    expect(onNextMock).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <StoryView story={mockStory} onClose={onCloseMock} onNext={() => {}} />,
    );

    fireEvent.click(getByRole("button"));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
