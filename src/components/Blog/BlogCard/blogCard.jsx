import React from "react";

export default function BlogCard({ blog, index, language }) {
    return (
        <div className='dark:text-white lg:py-5 md:py-5 overflow-hidden transition-shadow duration-300 bg-white rounded'>
            <img
                src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
                className='object-cover w-full h-64 rounded'
                alt=''
            />
            <div className='py-2'>
                <p className='mb-2 text-xs font-semibold text-gray-600'>
                    {blog.publish_date}
                </p>

                <p className='text-2xl font-bold '>{blog.title}</p>
                <p className='mb-2 text-gray-700 line-clamp-3'>
                    {blog.content}
                </p>
            </div>
            <div className='flex items-center justify-between'>
                <a className='text-teal-500 inline-flex items-center md:mb-2 lg:mb-0 py-2'>
                    Learn More
                    <svg
                        class='w-4 h-4 ml-1'
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
                </a>
                <span className='text-gray-600  mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-1 py-2 md:mb-2 lg:mb-0'>
                    <svg
                        className='w-4 h-4 mr-1'
                        stroke='currentColor'
                        stroke-width='2'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        viewBox='0 0 24 24'
                    >
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                        <circle cx='12' cy='12' r='3'></circle>
                    </svg>
                    {blog.views}
                </span>
            </div>
        </div>
    );
}
