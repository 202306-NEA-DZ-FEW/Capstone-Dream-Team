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
                                                xmlns='https://react-icons.github.io/react-icons/search?q=git'
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

        // <div className="w-full px-4 mb-32 lg:w-1/3 md:w-1/2 lg:mb-0">
        //   <div className="relative">
        //     <div className="w-full h-80">
        //       <img
        //         src={img}
        //         alt=""
        //         className="object-cover w-full h-full lg:rounded-2xl"
        //       />
        //     </div>
        //     <div className="absolute w-full p-6 text-center bg-blue-900 lg:rounded-tl-full lg:right-0 lg:-mt-16 lg:w-72">
        //       <h2 className="mb-1 text-xl font-bold text-gray-200 ">{name}</h2>
        //       <p className="text-sm text-gray-300">{profile} </p>
        //     </div>
        //   </div>
        // </div>

        // <a
        //   className="flex flex-col flex-wrap mb-0 overflow-hidden rounded lg:flex-row dark:bg-gray-800"
        //   href="#"
        // >
        //   <div className="w-full overflow-hidden lg:w-2/4 h-80">
        //     <img
        //       className="object-cover w-full h-full transition-all hover:scale-110"
        //       src={img}
        //       alt="image"
        //     />
        //   </div>
        //   <div className="relative flex self-center flex-1 p-8 ml-0 bg-white border rounded shadow dark:border-gray-700 dark:bg-gray-700 lg:items-center lg:-ml-12">
        //     <div>
        //       <h2 className="mb-2 text-xl font-bold dark:text-gray-300">{name}</h2>
        //       <p className="mb-4 text-sm text-blue-500 dark:text-blue-400">{profile}</p>
        //       <p className="mb-4 text-sm text-gray-400 dark:text-gray-400">
        //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        //         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        //       </p>
        //       <div className="flex">
        //         <span className="inline-block mr-5 text-gray-700 dark:text-gray-400 hover:text-blue-500">
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="16"
        //             height="16"
        //             fill="currentColor"
        //             className="w-6 h-6 bi bi-facebook "
        //             viewBox="0 0 16 16"
        //           >
        //             <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
        //           </svg>
        //         </span>
        //         <span className="inline-block mr-5 text-gray-700 dark:text-gray-400 hover:text-blue-500">
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="16"
        //             height="16"
        //             fill="currentColor"
        //             className="w-6 h-6 bi bi-twitter"
        //             viewBox="0 0 16 16"
        //           >
        //             <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        //           </svg>
        //         </span>
        //         <span className="inline-block mr-5 text-gray-700 dark:text-gray-400 hover:text-blue-500">
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="16"
        //             height="16"
        //             fill="currentColor"
        //             className="w-6 h-6 bi bi-linkedin"
        //             viewBox="0 0 16 16"
        //           >
        //             <path d="M.438 0C.676 0 .86.172.944.406v14.362c0 .234-.184.406-.376.406h-.014c-.194 0-.374-.177-.374-.406V.406C.556.18.732 0 .948 0h.014zM2 1.563C2 1.05 2.45.5 2.986.5h.028C3.55.5 4 1.05 4 1.563v12.874C4 14.55 3.55 15 3.014 15h-.028C2.45 15 2 14.45 2 13.937V1.563zM5 1.563C5 1.05 5.45.5 5.986.5h.028C6.55.5 7 1.05 7 1.563v12.874C7 14.55 6.55 15 6.014 15h-.028C5.45 15 5 14.45 5 13.937V1.563zM14.703 1h-1.926c-.325 0-.653.078-.94.25-.23.144-.464.384-.464.75v11.5c0 .366.233.606.464.75.287.172.615.25.94.25h1.926c.325 0 .653-.078.94-.25.23-.144.464-.384.464-.75V2.75c0-.366-.233-.606-.464-.75a1.92 1.92 0 0 0-.94-.25zm-.692 1.573c.277 0 .5.225.5.5s-.223.5-.5.5-.5-.225-.5-.5.223-.5.5-.5zM9 1.563C9 1.05 9.45.5 9.986.5h.028C10.55.5 11 1.05 11 1.563v12.874C11 14.55 10.55 15 10.014 15h-.028C9.45 15 9 14.45 9 13.937V1.563z" />
        //           </svg>
        //         </span>
        //       </div>
        //     </div>
        //   </div>
        // </a>
    );
}
