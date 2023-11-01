import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

export default function BlogCard({ blog, language }) {
    const { t } = useTranslation("common");
    return (
        <div className='dark:text-white lg:py-5 md:py-5 overflow-hidden transition-shadow duration-300 rounded'>
            <img
                src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
                className='object-cover w-full h-64 rounded'
                alt=''
            />
            <div className='py-2'>
                <p className='mb-2 text-xs font-semibold text-gray-600 dark:text-white '>
                    {blog.data.publish_date}
                </p>

                <p className='text-2xl font-bold dark:text-white line-clamp-1'>
                    {blog.data.title}
                </p>
                <p className='mb-2 text-gray-700 line-clamp-3 dark:text-white '>
                    {blog.data.content}
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <Link
                    href={`/blogs/${blog.id}`}
                    className='text-teal-500 inline-flex items-center md:mb-2 lg:mb-0'
                >
                    <span className='no-underline hover:underline'>
                        {t("blogPage.storyCard.readMore")}
                    </span>
                    {language === "en" ? (
                        <svg
                            className='w-4 h-4 ml-1 mt-1'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <path d='M5 12h14'></path>
                            <path d='M12 5l7 7-7 7'></path>
                        </svg>
                    ) : (
                        <svg
                            className='w-4 h-4 ml-1 mt-1'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <path d='M19 12H5'></path>
                            <path d='M12 5l-7 7 7 7'></path>
                        </svg>
                    )}
                </Link>
                <div className='flex'>
                    <span
                        className={`text-gray-600 dark:text-white inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm ${
                            language === "en"
                                ? "flex mr-3 pr-1 md:mb-2 lg:mb-0"
                                : "flex-row-reverse md:mb-2 lg:mb-0 pt-1"
                        }`}
                    >
                        <svg
                            className='w-4 h-4 mr-1'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            viewBox='0 0 24 24'
                        >
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                            <circle cx='12' cy='12' r='3'></circle>
                        </svg>
                        {blog.data.views}
                    </span>
                </div>
            </div>
        </div>
    );
}
