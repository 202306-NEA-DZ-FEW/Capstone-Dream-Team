import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import BlogCardList from "@/components/Blog/BlogCard/blogCardList";
import StoryCardList from "@/components/Blog/StoryCard/storyCardList";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

export default function Blogs({ blogs, stories }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [storiesNum, setStoriesNum] = useState(4);
    const [blogsNum, setBlogsNum] = useState(6);
    const showMoreStories = () => {
        setStoriesNum(storiesNum + 2); // Show all stories when the button is clicked
    };

    const showMoreBlogs = () => {
        setBlogsNum(blogsNum + 3); // Show all stories when the button is clicked
    };
    return (
        <Layout>
            <div className='flex flex-col dark:text-white'>
                <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
                    <div className='text-center lg:w-2/3 w-full'>
                        <p className='sm:text-4xl text-4xl mb-4 font-medium p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via--400 to-blue-600'>
                            {t("blogPage.titleStories")}
                        </p>
                        <p className='mb-8 text-xl md:text-2xl lg:text-2xl'>
                            {t("blogPage.sub-textStories")}
                        </p>
                    </div>
                </div>
                <StoryCardList stories={stories} numToShow={storiesNum} />
                {storiesNum < stories.length && (
                    <div className='flex flex-row-reverse justify-center'>
                        <p className='text-base flex text-teal-500 font-bold no-underline hover:underline pb-5 px-24'>
                            <span onClick={showMoreStories}>
                                {t("blogPage.loadMore")}
                            </span>
                            <svg
                                className={`w-4 h-4 ${
                                    router.locale === "en"
                                        ? "ml-1 mt-1"
                                        : "mr-1 mt-2"
                                } `}
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M12 5v14'></path>
                                <path d='M19 12l-7 7-7-7'></path>
                            </svg>
                        </p>
                    </div>
                )}
                <hr className='mx-auto w-5/6 sm:max-w-xl md:max-w-full lg:max-w-screen-xl' />

                <div className='container mx-auto flex px-5 py-10 items-center justify-center flex-col'>
                    <div className='text-center lg:w-2/3 w-full'>
                        <p className='sm:text-4xl text-4xl mb-4 font-medium p-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600'>
                            {t("blogPage.titleBlogs")}
                        </p>
                        <p className='mb-8 sm:text-2xl text-2xl '>
                            {t("blogPage.sub-textBlogs")}
                        </p>
                    </div>
                </div>
                <BlogCardList blogs={blogs} numToShow={blogsNum} />
                {blogsNum < blogs.length && (
                    <div className='flex flex-row-reverse justify-center '>
                        <p className='text-base flex text-teal-500 font-bold no-underline hover:underline pb-5 px-24'>
                            <span onClick={showMoreBlogs}>
                                {t("blogPage.loadMore")}
                            </span>
                            <svg
                                className={`w-4 h-4 ${
                                    router.locale === "en"
                                        ? "ml-1 mt-1"
                                        : "mr-1 mt-2"
                                }  `}
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M12 5v14'></path>
                                <path d='M19 12l-7 7-7-7'></path>
                            </svg>
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    const dataBlogs = [];
    const dataStories = [];
    const q = query(collection(db, "blogs"), where("type", "==", "article"));
    const p = query(collection(db, "blogs"), where("type", "==", "story"));
    const queryBlog = await getDocs(q);
    const queryStory = await getDocs(p);
    queryBlog.forEach((doc) => {
        dataBlogs.push({ id: doc.id, data: doc.data() });
    });
    queryStory.forEach((doc) => {
        dataStories.push({ id: doc.id, data: doc.data() });
    });
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            blogs: dataBlogs,
            stories: dataStories,
        },
    };
}
