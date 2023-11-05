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

import Restaurant from "../components/Home/Restaurant";
import Slider from "../components/Home/Slider";

export default function HomePage({ blogs, locale }) {
    const { t } = useTranslation("common");

    return (
        <>
            <Layout>
                <div className='h-full w-full flex flex-col p-2  gap-12 bg-white dark:bg-gray-900'>
                    <Slider></Slider>
                    <Donation></Donation>
                    <Goals></Goals>
                    <Restaurant></Restaurant>
                    <Joinus></Joinus>
                    <div className=' pt-12 py-6'>
                        <h1 className='text-center max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-[#192655] sm:text-4xl md:mx-auto'>
                            blogs
                        </h1>
                        <div className='sm:max-w-sm sm:mx-auto lg:max-w-full'>
                            <BlogCardList
                                blogs={blogs}
                                numToShow={6}
                                language={locale}
                            ></BlogCardList>
                        </div>
                        <div className='flex w-full '>
                            <Link
                                className=' text-blue-400 self-end'
                                href='/blogs'
                            >
                                see more --{">"}
                            </Link>
                        </div>
                    </div>
                    <Sponsors></Sponsors>
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
