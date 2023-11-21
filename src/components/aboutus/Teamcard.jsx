import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function Teamcard({ name, profile, img, linkedin, github }) {
    return (
        <div className='mb-8 mx-auto text-center'>
            <div className='inline-block mb-3 overflow-hidden text-xs text-white bg-blue-500 rounded-full w-44 h-44 sm:w-64 sm:h-64'>
                <img
                    className='object-cover w-full h-full transition-all hover:scale-110'
                    src={img}
                    alt='image'
                />
            </div>
            <h2 className='mb-2 text-xl font-semibold text-gray-800 dark:text-gray-300'>
                {name}
            </h2>
            <span className='inline-block mb-6 text-base font-medium text-blue-500 dark:text-gray-400'>
                {profile}
            </span>
            <div className='flex items-center justify-center'>
                <a
                    className='inline-block mr-5 text-coolGray-300 hover:text-coolGray-400'
                    href={linkedin}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='w-6 h-6 text-blue-800 bi bi-linkedin'
                        viewBox='0 0 16 16'
                    >
                        <AiFillLinkedin></AiFillLinkedin>
                    </svg>
                </a>
                <a
                    className='inline-block mr-5 text-coolGray-300 hover:text-coolGray-400'
                    href={github}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='w-6 h-6 bi bi-github'
                        viewBox='0 0 16 16'
                    >
                        <AiFillGithub></AiFillGithub>
                    </svg>
                </a>

                {/**portfolio */}
                {/* <a className="inline-block mr-5 text-coolGray-300 hover:text-coolGray-400" href={github}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 bi bi-github" viewBox="0 0 16 16">
                        
                    
                    </svg>
                </a> */}
            </div>
        </div>
    );
}
