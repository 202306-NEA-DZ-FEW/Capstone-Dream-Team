import React from "react";

export default function StoryCard() {
    return (
        <div className='container mx-auto p-4'>
            {/* Story Card */}
            <div className='relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2'>
                {/* Left Side (Image) */}
                <div className='z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg'>
                    {/* Background Image */}
                    <div
                        className='absolute left-0 top-0 inset-0 w-full h-full object-center bg-opacity-30 bg-cover'
                        style={{
                            backgroundImage:
                                "url(./images/fatoom_in_yemen.png)",
                            backgroundBlendMode: "multiply",
                        }}
                    ></div>

                    {/* Hidden Content on Mobile */}
                    <div className='md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900'>
                        <h3 className='w-full font-bold text-2xl text-teal-500 leading-tight mb-2'>
                            Fatoom in Yemen
                        </h3>
                    </div>

                    {/* Diagonal Polygon Shape (Visible on Desktop) */}
                    <svg
                        className='hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12'
                        viewBox='0 0 100 100'
                        preserveAspectRatio='none'
                    >
                        <polygon points='50,0 100,0 50,100 0,100' />
                    </svg>
                </div>

                {/* Right Side (Text Content) */}
                <div className='z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0'>
                    <div className='p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none'>
                        {/* Title (Visible on Desktop) */}
                        <h3 className='hidden md:block font-bold text-2xl text-teal-500 mb-2'>
                            Fatoom in Yemen
                        </h3>

                        {/* Main Text Content */}
                        <p className='text-gray-600 text-justify text-base line-clamp-4'>
                            Baby Fatoom and her family were driven from their
                            home in Yemen by conflict: the number one cause of
                            hunger. She was diagnosed with Severe Acute
                            Malnutrition (SAM) at just nine months old. As we do
                            with so many mothers across the world – we made sure
                            Fatoom’s mother Zainab got the nutrition she needed
                            to breastfeed. In places like Yemen and around the
                            world, nearly 50% of deaths among children under
                            five are caused by hunger.
                        </p>

                        {/* Read More Link */}
                        <div className='flex justify-between mt-3'>
                            <a
                                className='flex items-baseline  text-teal-500 hover:text-teal-900 focus:text-teal-900'
                                href=''
                            >
                                <span>Read More</span>
                                <span className='text-xs ml-1'>&#x279c;</span>
                            </a>
                            <div className='flex items-baseline text-sm ml-1 text-gray-500'>
                                <span>26/10/2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
