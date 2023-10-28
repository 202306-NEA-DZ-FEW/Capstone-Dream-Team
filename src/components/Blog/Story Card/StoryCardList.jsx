import React from "react";
import StoryCard from "./StoryCard";

export default function StoryCardList(props) {
    return (
        <div>
            {props.data.map((article, index) => (
                <div key={index}>
                    <StoryCard {...article} />
                </div>
            ))}
        </div>
    );
}
