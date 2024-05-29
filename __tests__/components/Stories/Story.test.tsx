import { fireEvent, render } from "@testing-library/react";
import Story from "~/components/Stories/Story";
import { User } from "~/types/types";

const mockStory: User = {
  id: 1,
  user_name: "John Doe",
  profile_image: "https://picsum.photos/128/128?random=223",
  stories: [],
};

describe("Story component", () => {
  it("renders without crashing", () => {
    render(<Story story={mockStory} onClick={() => {}} />);
  });

  it("displays the user's profile image and name correctly", () => {
    const { getByAltText, getByText } = render(
      <Story story={mockStory} onClick={() => {}} />,
    );

    const profileImage = getByAltText(mockStory.user_name);
    expect(profileImage).toBeInTheDocument();

    const userName = getByText(mockStory.user_name);
    expect(userName).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Story story={mockStory} onClick={onClick} />);

    const storyButton = getByRole("button");
    fireEvent.click(storyButton);

    expect(onClick).toHaveBeenCalled();
  });

  it("renders a placeholder if the story prop is not provided", () => {
    const { container } = render(<Story story={null} onClick={() => {}} />);
    const button = container.querySelector("button");
    expect(button).not.toBeInTheDocument();
  });
});
