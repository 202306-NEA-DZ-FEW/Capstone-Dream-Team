import Link from "next/link";

import BlogCard from "@/components/Blog/Blog Card/BlogCard";
export default function Blogs() {
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8 lg:py-20'>
            <h1 className='text-center max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-[#192655] sm:text-4xl md:mx-auto'>
                blogs
            </h1>
            <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
            <div className='flex w-full '>
                <Link className=' text-blue-400 self-end' href='/blogs'>
                    see more --{">"}
                </Link>
            </div>
        </div>
    );
}
