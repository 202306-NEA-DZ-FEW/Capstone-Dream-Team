import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

export default function StoryCard({ article, index, language }) {
    const { t } = useTranslation("common");
    const [isPair, setIsPair] = useState(true);
    useEffect(() => {
        if (index % 2 == 0) setIsPair(true);
        else setIsPair(false);
    }, []);
    return (
        <div className='container mx-auto md:py-5 md:px-18 p-4 lg:px-20 lg:py-5'>
            {/* Story Card */}
            <div
                className={`relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-80 mx-2 ${
                    isPair ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
                {/* Left Side (Image) */}
                <div
                    className={`z-0 relative w-full md:w-2/5 h-96 md:h-full overflow-hidden rounded-lg ${
                        !isPair
                            ? "md:rounded-none md:rounded-r-lg"
                            : "md:rounded-l-lg"
                    } md:rounded-none`}
                >
                    {/* Background Image */}
                    <div
                        className='absolute left-0 top-0 inset-0 w-full h-full object-center bg-opacity-30 bg-cover'
                        style={{
                            backgroundImage: "url(images/fatoom_in_yemen.png)",
                            backgroundBlendMode: "multiply",
                        }}
                    ></div>
                    {/* Hidden Content on Mobile */}
                    <div className='md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent to-gray-900'>
                        <h3 className='w-full font-bold text-2xl text-teal-500 leading-tight mb-2'>
                            {article.title}
                        </h3>
                    </div>
                    {/* Diagonal Polygon Shape (Visible on Desktop) */}
                    <svg
                        className={`hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white ${
                            !isPair ? "-ml-12 " : "-mr-12 right-0"
                        }`}
                        viewBox='0 0 100 100'
                        preserveAspectRatio='none'
                    >
                        <polygon points='50,0 100,0 50,100 0,100' />
                    </svg>
                </div>

                {/* Right Side (Text Content) */}
                <div className='z-0 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0'>
                    <div className='p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none shadow-xl md:shadow-none'>
                        {/* Title (Visible on Mobile) */}
                        <h3 className='hidden md:block font-bold text-2xl text-teal-500 mb-2 line-clamp-1 max-h-8'>
                            {article.title}
                        </h3>
                        {/* Main Text Content */}
                        <p className='text-gray-600 text-justify text-base md:line-clamp-6 line-clamp-3'>
                            {article.content}
                        </p>

                        {/* Read More Link */}
                        <div
                            className={`flex justify-between ${
                                language === "ar" ? "flex-row-reverse" : "flex"
                            } mt-3`}
                        >
                            <div className='flex items-baseline text-sm ml-1 text-gray-500'>
                                <span>{article.publish_date}</span>
                            </div>{" "}
                            <a
                                className='flex items-baseline text-teal-500 hover:text-teal-900 focus:text-teal-900'
                                href=''
                            >
                                <span>{t("readMore")}</span>
                                {language === "ar" ? (
                                    <span className='text-xs ml-1'>
                                        &#x2190;
                                    </span>
                                ) : (
                                    <span className='text-xs ml-1'>
                                        &#x279c;
                                    </span>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
