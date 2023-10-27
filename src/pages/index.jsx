import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Layout from "@/layout/Layout";

import Process from "../components/Home/Process";
import Slider from "../components/Home/Slider";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <>
            <Layout>
                <Slider></Slider>
                <Process></Process>
            </Layout>
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
