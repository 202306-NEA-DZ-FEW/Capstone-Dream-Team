import * as React from "react";

import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function NotFoundPage() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <div className='w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0'>
                <div className='w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center'>
                    <p className='text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300'>
                        404
                    </p>
                    <p className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2'>
                        {t("404Page.message1")}
                    </p>
                    <p className='text-lg md:text-xl lg:text-2xl text-gray-500 my-12'>
                        {t("404Page.message2")}
                    </p>
                    <Link
                        href='/'
                        className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150'
                        title='Return Home'
                    >
                        <span>{t("404Page.button")}</span>
                    </Link>
                </div>
                <div className='w-1/2 lg:h-full flex lg:items-end justify-center p-4'>
                    <img src='/images/home/slider/slider3.png' />
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
