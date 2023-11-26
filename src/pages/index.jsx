import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import { useRef } from "react";

import BlogCardList from "@/components/Blog/BlogCard/blogCardList";
import Footer from "@/components/Footer/Footer";
import Donation from "@/components/Home/Donation";
import Goals from "@/components/Home/Goals";
import Joinus from "@/components/Home/Joinus";
import Sponsors from "@/components/Home/Sponsors";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

import HeroSection from "../components/Home/HeroSection";
import Restaurant from "../components/Home/Restaurant";
import useIsVisible from "../components/useIsVisible";

export default function HomePage({ blogs, locale }) {
    const { t } = useTranslation("common");
    const ref1 = useRef();
    const isVisible1 = useIsVisible(ref1);

    const ref2 = useRef();
    const isVisible2 = useIsVisible(ref2);

    const ref3 = useRef();
    const isVisible3 = useIsVisible(ref3);

    const ref4 = useRef();
    const isVisible4 = useIsVisible(ref4);

    const ref5 = useRef();
    const isVisible5 = useIsVisible(ref5);
    const ref6 = useRef();
    const isVisible6 = useIsVisible(ref6);
    const ref7 = useRef();
    const isVisible7 = useIsVisible(ref7);
    return (
        <>
            <Layout>
                <div className='h-full w-full flex flex-col p-2  gap-12 bg-white dark:bg-gray-900'>
                    <div
                        ref={ref1}
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible1 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <HeroSection></HeroSection>
                    </div>
                    <div
                        ref={ref2}
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible2 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Donation></Donation>
                    </div>
                    <div
                        ref={ref3}
                        className={`max-w-screen-xl mx-auto transition-opacity ease-in duration-700 ${
                            isVisible3 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Goals></Goals>
                    </div>
                    <div
                        ref={ref4}
                        className={`mx-auto transition-opacity ease-in duration-700 ${
                            isVisible4 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Restaurant></Restaurant>
                    </div>
                    <div
                        ref={ref5}
                        className={`mx-auto transition-opacity ease-in duration-700 ${
                            isVisible5 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {" "}
                        <Joinus></Joinus>
                    </div>

                    <div
                        ref={ref6}
                        className={`mx-auto max-w-screen-xl my-12 pt-12 py-6  from-white  transition-opacity ease-in duration-700 ${
                            isVisible6 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className='m-6 p-12  '>
                            <h1 className=' text-lg text-center  mb-6 md:text-4xl uppercase font-extrabold text- mx-auto'>
                                {t("home.blogs.title")}
                            </h1>
                            <h2 className=' mb-6 text-center font-sans text-2xl  leading-none tracking-tight  sm:text-2xl mx-12'>
                                {t("home.blogs.subtitle")}
                            </h2>
                            <div className='sm:max-w-sm text-white bg-blue-900 sm:mx-auto rounded-xl lg:max-w-full'>
                                <BlogCardList
                                    blogs={blogs}
                                    numToShow={3}
                                    language={locale}
                                ></BlogCardList>
                            </div>
                            <div className='mt-10 mx-auto'>
                                <Link
                                    href='/blogs'
                                    className='bg-orange-400 hover:bg-orange-600 hover:text-white  py-3 px-8 text-lg rounded-full font-bold uppercase text-white border border-orange-400 tracking-widest'
                                >
                                    {t("home.blogs.see more")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={ref7}
                        className={` transition-opacity ease-in duration-700 ${
                            isVisible7 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Sponsors></Sponsors>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps({ locale }) {
    const dataBlogs = [];

    const q = query(collection(db, "blogs"), where("type", "==", "article"));

    const queryBlog = await getDocs(q);

    queryBlog.forEach((doc) => {
        dataBlogs.push({ id: doc.id, data: doc.data() });
    });

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
            blogs: dataBlogs,
        },
    };
}
