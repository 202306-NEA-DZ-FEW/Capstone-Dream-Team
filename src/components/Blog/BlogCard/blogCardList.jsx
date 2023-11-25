import React from "react";

import BlogCard from "./blogCard";

export default function BlogCardList({ blogs, numToShow }) {
    const displayedBlogs = blogs.slice(0, numToShow);

    return (
        <div className='px-2 py-6 flex justify-center sm:max-w-xl md:max-w-full lg:max-w-full md:px-12 lg:px-2'>
            <div className='grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:max-w-sm lg:max-w-full md:max-w-full mx-auto justify-center'>
                {displayedBlogs.map((blog, index) => (
                    <div key={index}>
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
}
