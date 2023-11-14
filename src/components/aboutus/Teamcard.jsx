import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function Teamcard({ name, profile, img }) {
    return (
        <>
            {" "}
            <div className='flex flex-wrap justify-center '>
                <div className='w-full px-4 mb-4'>
                    <div className='p-6 shadow-sm rounded-md border border-orange-100 bg-orange-50  dark:bg-gray-700 group'>
                        <a className='block mb-2' href='#'>
                            <div className='relative overflow-hidden'>
                                <div className='mb-5 overflow-hidden'>
                                    <img
                                        className='object-cover w-full mx-auto transition-all rounded h-72 group-hover:scale-110'
                                        src={img}
                                        alt=''
                                    />
                                </div>
                                <div className='absolute flex flex-col top-4 right-4'>
                                    <div className='flex items-center'>
                                        <div className='relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded group-hover:translate-x-0 wishlist hover:bg-blue-200 group'>
                                            <svg
                                                xmlns='https://react-icons.github.io/ react-icons/search?q=git'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-6 h-6 text-blue-800 bi bi-linkedin dark:text-gray-400'
                                                viewBox='0 0 16 16'
                                            >
                                                <AiFillLinkedin></AiFillLinkedin>{" "}
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded group-hover:translate-x-0 wishlist hover:bg-blue-200 group'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-6 h-6 text-blue-800 bi bi-github dark:text-gray-400'
                                                viewBox='0 0 16 16'
                                            >
                                                {" "}
                                                <AiFillGithub></AiFillGithub>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className='mb-2 text-xl font-bold dark:text-white'>
                                {name}
                            </h2>
                            <p className='text-lg font-bold text-blue-500 dark:text-blue-300 '>
                                {profile}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
