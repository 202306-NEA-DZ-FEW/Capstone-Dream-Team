import React from "react";
import { useTranslation } from "next-i18next";
export default function Goals() {
    const { t } = useTranslation("common");
    const images = [
        {
            url: "images/home/Goals/noPoverty.png",
            title: "home.ourGoals.goal1",
            text: "home.ourGoals.goal1text",
        },
        {
            url: "images/home/Goals/zeroHunger.png",
            title: "home.ourGoals.goal2",
            text: "home.ourGoals.goal2text",
        },
        {
            url: "images/home/Goals/health.png",
            title: "home.ourGoals.goal3",
            text: "home.ourGoals.goal3text",
        },
    ];

    return (
        <div className='w-full h-full flex-col mt-6 p-6 justify-center  text-center'>
            <h1 className='font-bold mr-6 text-2xl sm:text-3xl lg:text-4xl text-[#192655] '>
                {t("home.ourGoals.title")}
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 w-full h-full   '>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className=' w-full h-2/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20'
                    >
                        <div className='flex justify-center md:justify-end -mt-16'>
                            <img
                                className='w-20 h-20 object-cover rounded-full border-2 border-indigo-500'
                                src={image.url}
                                alt='step'
                            />
                        </div>
                        <div>
                            <h2 className='text-gray-800 text-3xl font-semibold'>
                                {t(`${image.title}`)}
                            </h2>
                            <p className='mt-2 text-gray-600 h-full'>
                                {t(`${image.text}`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
