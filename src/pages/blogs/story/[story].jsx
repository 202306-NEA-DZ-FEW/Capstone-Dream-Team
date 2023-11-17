import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import BlogCardList from "@/components/Blog/BlogCard/blogCardList";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

export default function Story({ story, similarStories }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const paragraphs = story.content.split("\n\n");
    return (
        <Layout>
            {/* Container */}
            <div className='container dark:text-white w-full md:max-w-3xl mx-auto pt-10'>
                <div
                    className='w-full px-4 md:px-6 text-base text-gray-800 leading-normal'
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {/* Title */}
                    <div className='font-sans'>
                        <p className='text-base md:text-sm text-green-500 font-bold'>
                            &lt;{" "}
                            <Link
                                href='/blogs'
                                className='text-base md:text-sm text-green-500 font-bold no-underline hover:underline'
                            >
                                {t("blogPage.blog.back")}
                            </Link>
                        </p>
                        <h1 className='dark:text-white font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl'>
                            {story.title}
                        </h1>
                        <p className='dark:text-white text-sm md:text-base font-normal text-gray-600'>
                            {t("blogPage.blog.publishedOn")}{" "}
                            {story.publish_date}
                        </p>
                    </div>
                    <div className='py-3'>
                        <img
                            src='/images/fatoom_in_yemen.png'
                            alt='Image Description'
                            className=' block'
                        />
                    </div>
                    {/* Post Content */}
                    {/* Lead Para */}

                    <div>
                        {paragraphs.map((paragraph, index) => (
                            <p className='py-5 dark:text-white' key={index}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div
                    className={`flex dark:text-white text-base md:text-sm text-gray-500 ${
                        router.locale === "en" ? "pl-6" : "pr-6"
                    } py-6`}
                >
                    {t("blogPage.blog.tags")}:
                    {story.tags.map((tag, index) => (
                        <div className='flex' key={index}>
                            <p
                                href='#'
                                className={`${
                                    router.locale === "en" ? "pl-1" : "pr-1"
                                } text-base md:text-sm text-green-500 no-underline hover:underline`}
                            >
                                {tag}
                            </p>
                            {index < story.tags.length - 1 ? ", " : ". "}
                        </div>
                    ))}
                </div>

                {/* Author */}
                <div className='flex w-full dark:text-white items-center font-sans px-4 py-12'>
                    <img
                        className='w-10 h-10 rounded-full mr-4'
                        src='http://i.pravatar.cc/300'
                        alt='Avatar of Author'
                    />
                    <div className='flex-1 px-2 pt-1'>
                        <p className='text-base font-bold text-base md:text-xl leading-none mb-2'>
                            {story.author}
                        </p>
                    </div>
                    {/* Container */}
                </div>
            </div>
            <hr className='mx-auto w-5/6 sm:max-w-xl md:max-w-full lg:max-w-screen-xl' />
            <div className='max-w-3xl mx-auto text-center mt-12'>
                <h1 className='text-3l font-bold text-gray-900 leading-tight mb-2 dark:text-white'>
                    Explore These Stories Too
                </h1>
            </div>
            <div>
                <BlogCardList blogs={similarStories} numToShow={3} />
            </div>
        </Layout>
    );
}
export async function getStaticPaths() {
    const paths = [];
    const q = query(collection(db, "blogs"), where("type", "==", "story"));
    const queryStory = await getDocs(q);
    queryStory.forEach((doc) => {
        paths.push({ params: { story: doc.id } });
    });
    return {
        paths,
        fallback: false, // Enable ISR for unspecified paths
    };
}

export async function getStaticProps({ locale, params }) {
    const dataStories = [];
    const docRef = doc(db, "blogs", params.story);
    const docSnap = await getDoc(docRef);
    const story = docSnap.data();
    const q = query(
        collection(db, "blogs"),
        where("tags", "array-contains-any", story.tags)
    );
    const queryStory = await getDocs(q);
    queryStory.forEach((doc) => {
        if (params.story != doc.id)
            dataStories.push({ id: doc.id, data: doc.data() });
    });
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            story: story,
            similarStories: dataStories,
        },
    };
}
