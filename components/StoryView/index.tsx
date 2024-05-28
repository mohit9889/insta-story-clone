import React, { useState } from "react";
import Stories from "react-insta-stories";
import { Story } from "~/types/types";

const StoryComponent: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };

  const storyContent = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    background: "red",
    cursor: "pointer",
  };

  return (
    <React.Fragment>
      <Stories
        stories={stories}
        defaultInterval={1500}
        // style={style}
        storyStyles={storyContent}
        loop={false}
        keyboardNavigation={true}
        // isPaused={() => {}}
        // currentIndex={}
        onStoryStart={() => {}}
        onStoryEnd={() => {}}
        onAllStoriesEnd={onAllStoriesEndHandler}
      />
    </React.Fragment>
  );
};

export default StoryComponent;
