import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";


import AboutUs from "@/components/Home/AboutUs";
import Blogs from "@/components/Home/Blogs";
import Donation from "@/components/Home/Donation";
import Goals from "@/components/Home/Goals";
import Joinus from "@/components/Home/Joinus";
import Sponsors from "@/components/Home/Sponsors";
import Footer from "@/components/Footer";


import Layout from "@/layout/Layout";

import Restaurant from "../components/Home/Restaurant";
import Slider from "../components/Home/Slider";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <>
            <Layout>
                <div className='bg-white dark:bg-gray-900'>
                    <Slider></Slider>
                    <Donation></Donation>
                    <Goals></Goals>
                    <Restaurant></Restaurant>
                    <Joinus></Joinus>
                    <Sponsors></Sponsors>
                    <Blogs></Blogs>
                    <AboutUs></AboutUs>
                </div>
            </Layout>
            <Footer />
        </>
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
