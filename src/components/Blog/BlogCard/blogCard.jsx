import React from "react";

export default function BlogCard() {
    return (
        <div className='overflow-hidden transition-shadow duration-300 bg-white rounded'>
            <img
                src='https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260'
                className='object-cover w-full h-64 rounded'
                alt=''
            />
            <div className='py-5'>
                <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                    13 Jul 2020
                </p>

                <p className='text-2xl font-bold leading-5'>
                    Diving to the deep
                </p>
                <p className='mb-4 text-gray-700'>
                    Sed ut perspiciatis unde omnis iste natus error sit sed quia
                    consequuntur magni voluptatem doloremque.
                </p>
                <div className='flex'>
                    <div className='ml-2 mr-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            className='w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700'
                        >
                            <polyline
                                points='6 23 1 23 1 12 6 12'
                                fill='none'
                                strokeMiterlimit='10'
                            />
                            <path
                                d='M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z'
                                fill='none'
                                stroke='currentColor'
                                strokeMiterlimit='10'
                            />
                        </svg>
                    </div>
                    <p className='font-semibold'>7.4K</p>

                    <div className='ml-4 mr-1 pt-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 21 21'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            stroke='currentColor'
                            className='w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700'
                        >
                            <polygon
                                points='19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2'
                                fill='none'
                                stroke='currentColor'
                                strokeMiterlimit='10'
                            />
                        </svg>
                    </div>
                    <p className='font-semibold'>81</p>
                </div>
            </div>
        </div>
    );
}
