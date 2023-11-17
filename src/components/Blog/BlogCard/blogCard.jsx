import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

export default function BlogCard({ blog }) {
    const { t } = useTranslation("common");

    return (
        <div className='dark:text-white flex flex-col justify-center lg:py-5 md:py-5 overflow-hidden w-80  transition-shadow duration-300 rounded'>
            <img
                src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
                className='object-cover object-center scale-110 transition-all duration-400 hover:scale-100 rounded-xl object-cover w-full h-56'
                alt={blog.data.title}
            />
            <div className='py-2'>
                <p className='w-80 text-stone-900 text-xl font-medium font-Outfit capitalize line-clamp-2'>
                    {blog.data.title}
                </p>
            </div>
            <div className='flex justify-between items-center my-1'>
                <Link
                    href={`/blogs/blog/${blog.id}`}
                    className='text-teal-500 inline-flex items-center md:mb-2 lg:mb-0'
                >
                    <button className='bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white font-medium font-Outfit'>
                        {t("blogPage.storyCard.readMore")}
                    </button>
                </Link>
                <div className='flex'>
                    <span className='text-gray-600 dark:text-white inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md'>
                        {blog.data.publish_date}
                    </span>
                </div>
            </div>
        </div>
    );
}
