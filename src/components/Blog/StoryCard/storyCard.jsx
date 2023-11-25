import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

export default function StoryCard({ story, index }) {
    const { t } = useTranslation("common");
    const [isPair, setIsPair] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (index % 2 == 0) setIsPair(true);
        else setIsPair(false);
    }, [index]);
    return (
        <div className='px-4 md:py-6 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-6 lg:px-12 lg:py-12'>
            <div className='max-w-6xl mx-auto p-4 sm:px-6 h-full antialiased'>
                <Link href={`blogs/story/${story.id}`}>
                    <article className='group max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
                        <div
                            className={`relative block  ${
                                isPair ? "" : "lg:order-1"
                            }`}
                        >
                            <div
                                className='absolute inset-0 rounded-xl bg-blue-300 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none'
                                aria-hidden='true'
                            ></div>
                            <figure className='relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out'>
                                <img
                                    className='absolute rounded-xl inset-0 w-full h-full object-cover transform transition duration-700 ease-out'
                                    src={story.data.featured_image}
                                    width='540'
                                    height='303'
                                    alt={story.data.title}
                                />
                            </figure>
                        </div>
                        <div>
                            <div className={`${isPair ? "lg:order-1" : ""}`}>
                                <h3 className='text-2xl lg:text-3xl font-bold leading-tight mb-2 group-hover:text-blue-600 transition duration-150 ease-in-out text-blue-500'>
                                    {story.data.title}
                                </h3>
                                <p className='text-lg text-gray-400 flex-grow line-clamp-3'>
                                    {story.data.content
                                        .replace(/\*/g, "")
                                        .replace(/\/n/g, "")}
                                </p>
                            </div>
                        </div>
                    </article>
                </Link>
            </div>
        </div>
    );
}
