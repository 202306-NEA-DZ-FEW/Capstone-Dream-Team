import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

import { db } from "@/util/firebase";

export default function Blog({ articles, stories }) {
    return <div></div>;
}

export async function getStaticProps() {
    const dataArticles = [];
    const dataStories = [];
    const q = query(collection(db, "blogs"), where("type", "==", "article"));
    const p = query(collection(db, "blogs"), where("type", "==", "story"));

    const queryArticle = await getDocs(q);
    const queryStory = await getDocs(p);
    queryArticle.forEach((doc) => {
        dataArticles.push(doc.data());
    });
    queryStory.forEach((doc) => {
        dataStories.push(doc.data());
    });
    return {
        props: {
            articles: dataArticles,
            stories: dataStories,
        },
    };
}
