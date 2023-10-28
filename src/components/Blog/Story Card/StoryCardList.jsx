import React from "react";
import StoryCard from "./storyCard";

export default function StoryCardList({ articles, numToShow }) {
    const displayedArticles = articles.slice(0, numToShow);

    return (
        <div>
            {displayedArticles.map((article, index) => (
                <div key={index}>
                    <StoryCard article={article} index={index} />
                </div>
            ))}
        </div>
    );
}
