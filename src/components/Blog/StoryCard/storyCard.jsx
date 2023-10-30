import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

export default function StoryCard({ story, index, language }) {
    const { t } = useTranslation("common");
    const [isPair, setIsPair] = useState(true);
    useEffect(() => {
        if (index % 2 == 0) setIsPair(true);
        else setIsPair(false);
    }, [index]);
    return (
        <div className=' px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-24 lg:py-12'>
            <div className='flex flex-col items-center justify-between lg:flex-row-reverse'>
                {/**className={`flex flex-col items-center justify-between ${
                    isPair ? "lg:flex-row" : "lg:flex-row-reverse"
                }`} */}
                <div className='mb-10 lg:max-w-lg lg:pr-5 lg:mb-0'>
                    <div className='max-w-xl mb-6'>
                        <h2 className='dark:text-white max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none'>
                            {story.title}
                        </h2>
                        <p className='text-base dark:text-white  sm:text-xl text-gray-700 md:text-lg line-clamp-4'>
                            {story.content}
                        </p>
                        <div>
                            <Link href='/article' className='flex '>
                                <p className='text-base flex text-teal-500 font-bold no-underline hover:underline py-4'>
                                    <span>{t("readMore")}</span>
                                    <svg
                                        class='w-4 h-4 ml-1 mt-1'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        fill='none'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    >
                                        <path d='M5 12h14'></path>
                                        <path d='M12 5l7 7-7 7'></path>
                                    </svg>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='relative lg:w-1/2'>
                    <img
                        className='object-cover w-full h-full rounded shadow-lg sm:h-96'
                        src='/images/fatoom_in_yemen.png'
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
}
