import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import BlogCardList from "@/components/Blog/BlogCard/blogCardList";
import StoryCardList from "@/components/Blog/StoryCard/storyCardList";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

export default function Blogs({ blogs, stories }) {
    const { t } = useTranslation("common");
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
                        <p className='sm:text-4xl text-4xl mb-4 font-medium p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200  via-blue-400 to-blue-600'>
                            {t("blogPage.titleStories")}
                        </p>
                        <p className='mb-8 text-xl md:text-2xl lg:text-2xl'>
                            {t("blogPage.sub-textStories")}
                        </p>
                    </div>
                </div>
                <StoryCardList stories={stories} numToShow={storiesNum} />
                {storiesNum < stories.length && (
                    <div className='flex justify-center pt-4 pb-10'>
                        <div className='flex items-center justify-center'>
                            <div
                                className='flex items-center rounded-full border border-gray-300 bg-secondary-50 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100'
                                onClick={showMoreStories}
                            >
                                <p className='px-1'>{t("blogPage.loadMore")}</p>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                    className='h-4 w-4'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                {/* <hr className='mx-auto w-5/6 sm:max-w-xl md:max-w-full lg:max-w-screen-xl' /> */}

                <div className='container mx-auto flex px-5 py-10 items-center justify-center flex-col'>
                    <div className='text-center lg:w-2/3 w-full'>
                        <p className='sm:text-4xl text-4xl mb-4 font-medium p-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-200  via-orange-400 to-orange-600'>
                            {t("blogPage.titleBlogs")}
                        </p>
                        <p className='mb-8 sm:text-2xl text-2xl '>
                            {t("blogPage.sub-textBlogs")}
                        </p>
                    </div>
                </div>
                <BlogCardList blogs={blogs} numToShow={blogsNum} />
                {blogsNum < blogs.length && (
                    <div className='flex justify-center pt-4 pb-10'>
                        <div className='flex items-center justify-center'>
                            <div
                                className='flex items-center rounded-full border border-gray-300 bg-secondary-50 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100'
                                onClick={showMoreBlogs}
                            >
                                <p className='px-1'>{t("blogPage.loadMore")}</p>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                    className='h-4 w-4'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                        </div>
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
