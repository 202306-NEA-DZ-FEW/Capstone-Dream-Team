import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
export default function HeroSection() {
    const { t } = useTranslation("common");
    return (
        <main className='bg-white  font-open-sans'>
            <div className='container mx-auto px-8 py-8 lg:py-10 relative flex flex-col lg:flex-row items-center'>
                <div className='lg:w-1/2 bg-white p-6 rounded-xl flex flex-col items-center lg:items-start'>
                    <h1 className='text-center p-2 text-3xl sm:text-3xl font-light text-black leading-tight mb-4'>
                        {t("home.HeroSection.mission")}
                        <strong className='mt-4 font-black text-3xl text-blue-700 sm:text-4xl block'>
                            {t("home.HeroSection.help")}
                        </strong>
                    </h1>
                    <p className='text-center  sm:text-lg text-gray-500 leading-relaxed'>
                        {t("home.HeroSection.text")}
                    </p>
                    <div className='self-center mt-8'>
                        <Link
                            href='/meals'
                            className='bg-orange-400 text-center hover:bg-orange-600 mt-8 py-3 px-8 text-lg rounded-full font-bold uppercase text-white tracking-widest'
                        >
                            {t("home.HeroSection.donate")}
                        </Link>
                    </div>
                </div>
                <div>
                    <img src='images/home/slider/slider3.png' alt='helping' />
                </div>
            </div>
        </main>
    );
}
