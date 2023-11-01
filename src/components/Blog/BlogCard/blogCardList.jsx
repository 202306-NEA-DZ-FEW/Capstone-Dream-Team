import React from "react";

import BlogCard from "./blogCard";

export default function BlogCardList({ blogs, numToShow, language }) {
    const displayedBlogs = blogs.slice(0, numToShow);
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8 lg:py-20'>
            <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm lg:max-w-full'>
                {displayedBlogs.map((blog, index) => (
                    <div key={index}>
                        <BlogCard language={language} blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
}
