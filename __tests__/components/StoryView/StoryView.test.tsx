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
      data_type: "image",
      posted_on: new Date(),
    },
    {
      id: 71,
      image: "https://picsum.photos/400/800?random=638",
      data_type: "image",
      posted_on: new Date(),
    },
    {
      id: 991,
      image: "https://picsum.photos/400/800?random=634",
      data_type: "image",
      posted_on: new Date(),
    },
  ],
};

describe("StoryView component", () => {
  it("renders without crashing", () => {
    render(
      <StoryView
        story={mockStory}
        onClose={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
  });

  it("renders null when story prop or its stories data is not provided", () => {
    const { container } = render(
      <StoryView
        story={null}
        onClose={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(container.firstChild).toBeNull();

    const { container: container2 } = render(
      <StoryView
        story={{
          id: 1,
          user_name: "John Doe",
          profile_image: "https://picsum.photos/120/120?random=665",
          stories: [],
        }}
        onClose={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(container2.firstChild).toBeNull();
  });

  it("calls onNext when all stories end", () => {
    const onNextMock = jest.fn();
    const { getByTestId } = render(
      <StoryView
        story={mockStory}
        onClose={() => {}}
        onNext={onNextMock}
        onPrev={() => {}}
      />,
    );

    // Find the Stories component by its data-testid attribute
    const storiesComponent = getByTestId("Stories");

    // Simulate the end of all stories
    fireEvent(storiesComponent, new Event("allStoriesEnd"));

    // Check if onNext has been called
    expect(onNextMock).toHaveBeenCalled();
  });

  it("calls onPrev when previous button is clicked and current index is 0", () => {
    const onPrevMock = jest.fn();
    const { getByRole } = render(
      <StoryView
        story={mockStory}
        onClose={() => {}}
        onNext={() => {}}
        onPrev={onPrevMock}
      />,
    );

    // Click the previous button
    fireEvent.click(getByRole("button", { name: /previous icon/i }));

    // Ensure that onPrev has been called
    expect(onPrevMock).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <StoryView
        story={mockStory}
        onClose={onCloseMock}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );

    fireEvent.click(getByRole("button"));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
