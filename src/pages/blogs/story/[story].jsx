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
    console.log("story.author_image", story.author_image);
    return (
        <Layout>
            <main>
                <div className='mt-10 max-w-screen-lg mx-auto'>
                    <div className='mb-4 md:mb-0 w-full relative h-96'>
                        <div className='absolute left-0 bottom-0 w-full h-full rounded-xl z-10 bg-gradient-to-b from-transparent to-black opacity-80'></div>
                        <img
                            src={story.featured_image}
                            className='w-full h-full z-0 rounded-xl object-cover hover:object-scale-down'
                        />
                        <div className='p-4 absolute bottom-0 left-0 z-20'>
                            <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>
                                {story.title}
                            </h2>
                            <div className='flex mt-3'>
                                <img
                                    src={story.author_image}
                                    className='h-10 w-10 rounded-full mr-2 object-cover'
                                />
                                <div>
                                    <p className='font-semibold text-gray-200 text-sm'>
                                        {story.author}
                                    </p>
                                    <p className='font-semibold text-gray-400 text-xs'>
                                        {story.publish_date
                                            .split("/")
                                            .map((part, index) =>
                                                index === 1
                                                    ? [
                                                          "Jan",
                                                          "Feb",
                                                          "Mar",
                                                          "Apr",
                                                          "May",
                                                          "Jun",
                                                          "Jul",
                                                          "Aug",
                                                          "Sep",
                                                          "Oct",
                                                          "Nov",
                                                          "Dec",
                                                      ][part - 1]
                                                    : part
                                            )
                                            .join(" ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:space-x-12'>
                        <div className='px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4'>
                            {story.content
                                .split("/n/n")
                                .map((paragraph, index) => (
                                    <p className='pb-6' key={index}>
                                        {paragraph
                                            .split("/n")
                                            .map((line, index) => (
                                                <span key={index}>
                                                    {line
                                                        .split("**")
                                                        .map((part, index) =>
                                                            index % 2 === 0 ? (
                                                                part
                                                            ) : (
                                                                <strong
                                                                    key={index}
                                                                >
                                                                    {part}
                                                                </strong>
                                                            )
                                                        )}
                                                    <br />
                                                </span>
                                            ))}
                                    </p>
                                ))}
                        </div>

                        <div className='w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm pt-2'>
                            <div className='p-4 border-t border-b md:border md:rounded'>
                                <div className='flex flex-col items-center py-2'>
                                    <img
                                        src={story.author_image}
                                        className='h-20 w-20 rounded-full mr-2 object-cover'
                                        alt={story.author}
                                    />
                                    <div className='py-4'>
                                        <p className='font-semibold text-gray-700 text-base text-center'>
                                            {story.author}
                                        </p>
                                        <p className='font-semibold text-gray-600 text-sm text-center'>
                                            Frontend Web Developer
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-center space-x-5'>
                                    <Link
                                        href={story.author_github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-block text-gray-400'
                                    >
                                        <span className='sr-only'>GitHub</span>
                                        <svg
                                            stroke='currentColor'
                                            fill='currentColor'
                                            stroke-width='0'
                                            viewBox='0 0 496 512'
                                            className='w-6 h-6 text-gray-800 hover:text-black'
                                            height='1em'
                                            width='1em'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href={story.author_linkedin}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-block text-gray-400'
                                    >
                                        <span className='sr-only'>
                                            Linkedin
                                        </span>
                                        <svg
                                            stroke='currentColor'
                                            fill='currentColor'
                                            stroke-width='0'
                                            viewBox='0 0 448 512'
                                            className='w-6 h-6 text-blue-800 hover:text-blue-900'
                                            height='1em'
                                            width='1em'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z'></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-2 pb-4 mt-10 max-w-screen-lg mx-auto'>
                        <h2 className='text-4xl font-medium font-Outfit text-blue-500  leading-tight mb-2 '>
                            {t("blogPage.blog.moreStories")}
                        </h2>
                        <p className='text-base text-gray-800 leading-tight'>
                            {t("blogPage.blog.subMoreStories")}
                        </p>
                    </div>
                </div>
                <BlogCardList blogs={similarStories} numToShow={3} />
            </main>
        </Layout>
    );
}
export async function getStaticPaths() {
    const paths = [];
    const q = query(collection(db, "blogs"), where("type", "==", "story"));
    const queryStory = await getDocs(q);
    queryStory.forEach((doc) => {
        paths.push({ params: { story: doc.id }, locale: "en" });
        paths.push({ params: { story: doc.id }, locale: "ar" });
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
        where("tags", "array-contains-any", story.tags),
        where("type", "==", "story")
    );
    const queryStory = await getDocs(q);
    queryStory.forEach((doc) => {
        if (params.story != doc.id)
            dataStories.push({ id: doc.id, data: doc.data() });
    });
    const shuffledDataStories = dataStories
        .slice()
        .sort(() => Math.random() - 0.5);

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            story: story,
            similarStories: shuffledDataStories,
        },
    };
}
