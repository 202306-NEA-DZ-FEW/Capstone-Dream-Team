import React from "react";
import BlogCard from "./BlogCard";

export default function BlogCardList() {
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8 lg:py-20'>
            <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
                <BlogCard />
            </div>
        </div>
    );
}
