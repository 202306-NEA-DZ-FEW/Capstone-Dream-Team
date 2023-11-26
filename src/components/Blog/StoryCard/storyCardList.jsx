import React from "react";

import StoryCard from "./storyCard";

export default function StoryCardList({ stories, numToShow }) {
    const displayedStories = stories.slice(0, numToShow);

    return (
        <div>
            {displayedStories.map((story, index) => (
                <div key={index}>
                    <StoryCard story={story} index={index} />
                </div>
            ))}
        </div>
    );
}
