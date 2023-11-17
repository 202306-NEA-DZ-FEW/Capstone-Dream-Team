import Meals from "../../components/meal/meals";
import React from "react";
import Layout from "@/layout/Layout";
import Adminhistory from "../../components/History/Adminhistory";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mealcard from "@/components/meal/mealcard";

export default function Mealspage() {
    return (
        <>
            <Layout>
                {/* <Mealcard /> */}
                <Meals />
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
