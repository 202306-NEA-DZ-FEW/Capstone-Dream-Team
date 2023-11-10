import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import BlogCardList from "@/components/Blog/BlogCard/blogCardList";
import Footer from "@/components/Footer";
import Donation from "@/components/Home/Donation";
import Goals from "@/components/Home/Goals";
import Joinus from "@/components/Home/Joinus";
import Sponsors from "@/components/Home/Sponsors";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";
import { useRef } from "react";
import Restaurant from "../components/Home/Restaurant";
import Slider from "../components/Home/Slider";
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
                        <Slider></Slider>
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
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible3 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Goals></Goals>
                    </div>
                    <div
                        ref={ref4}
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible4 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Restaurant></Restaurant>
                    </div>
                    <div
                        ref={ref5}
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible5 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {" "}
                        <Joinus></Joinus>
                    </div>

                    <div
                        ref={ref6}
                        className={`my-12 pt-12 py-6  mx-6 bg-cover transition-opacity ease-in duration-700 ${
                            isVisible6 ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            backgroundImage:
                                "url(/images/home/blogs/background.png)",
                        }}
                    >
                        <div className='m-6 p-12  '>
                            <h1 className=' text-lg text-center  md:text-4xl uppercase font-extrabold text- mx-auto'>
                                Blogs
                            </h1>
                            <h2 className=' mb-6 text-center font-sans text-2xl  leading-none tracking-tight  sm:text-2xl mx-12'>
                                Explore here articles about hunger and poverty
                                in our world
                            </h2>
                            <div className='sm:max-w-sm sm:mx-auto bg-[#F0FFFF] rounded-xl lg:max-w-full'>
                                <BlogCardList
                                    blogs={blogs}
                                    numToShow={3}
                                    language={locale}
                                ></BlogCardList>
                            </div>
                            <div className='mt-20 mx-auto'>
                                <Link
                                    href='/signIn'
                                    className='bg-white hover:bg-orange-600 hover:text-white  py-3 px-8 text-lg rounded-full font-bold uppercase text-orange-400 border border-orange-400 tracking-widest'
                                >
                                    see more
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={ref7}
                        className={`transition-opacity ease-in duration-700 ${
                            isVisible7 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Sponsors></Sponsors>
                    </div>
                </div>
            </Layout>
            <Footer />
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
