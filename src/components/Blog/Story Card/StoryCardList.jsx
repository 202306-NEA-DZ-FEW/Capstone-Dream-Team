import React from "react";

export default function StoryCardList(props) {
    return (
        <div>
            {props.data.map((article, index) => (
                <div key={index}>
                    <StoryCardList {...article} />
                </div>
            ))}
        </div>
    );
}
