import React from "react";

import BlogCard from "./blogCard";

export default function BlogCardList({ blogs, numToShow }) {
    const displayedBlogs = blogs.slice(0, numToShow);

    return (
        <div className='px-4 py-6 flex justify-center mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-16'>
            <div className='grid gap-6 lg:grid-cols-3 sm:max-w-sm lg:max-w-full md:max-w-md mx-auto justify-center'>
                {displayedBlogs.map((blog, index) => (
                    <div key={index}>
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
}
