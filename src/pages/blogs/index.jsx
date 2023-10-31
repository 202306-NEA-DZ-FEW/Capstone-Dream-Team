import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import StoryCardList from "@/components/Blog/StoryCard/storyCardList";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

export default function Blog({ articles, stories }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [numToShow, setNumToShow] = useState(4);

    const showMoreStories = () => {
        setNumToShow(numToShow + 2); // Show all stories when the button is clicked
    };
    const showLessStories = () => {
        setNumToShow(4); // Show all stories when the button is clicked
    };
    return (
        <Layout>
            <div className='flex flex-col'>
                <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
                    <div className='text-center lg:w-2/3 w-full'>
                        <p className='sm:text-4xl text-4xl mb-4 font-medium p-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600'>
                            {t("blogPage.title")}
                        </p>
                        <p className='mb-8 sm:text-2xl text-2xl '>
                            {t("blogPage.sub-text")}
                        </p>
                    </div>
                </div>
                <StoryCardList
                    language={router.locale}
                    articles={articles}
                    numToShow={numToShow}
                />
                {numToShow < articles.length && (
                    <div className='flex flex-row-reverse'>
                        <p className='text-base text-teal-500 font-bold no-underline hover:underline py-5 px-24'>
                            <span onClick={showMoreStories}>See More</span>
                            <span className='text-xs ml-1'>&#x279c;</span>
                        </p>
                    </div>
                )}
                {numToShow > articles.length && (
                    <div className='flex flex-row-reverse'>
                        <p className='text-base text-teal-500 font-bold no-underline hover:underline py-5 px-24'>
                            <span onClick={showLessStories}>See Less</span>
                            <span className='text-xs ml-1'>&uarr;</span>
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
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
            ...(await serverSideTranslations(locale, ["common"])),
            articles: dataArticles,
            stories: dataStories,
        },
    };
}
