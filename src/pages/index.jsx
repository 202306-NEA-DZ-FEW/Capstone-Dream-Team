import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import { useEffect } from "react";

import Layout from "@/layout/Layout";
import SignIn from "@/components/Auth/signIn";
import SignUp from "@/components/Auth/signUp";
import SignOut from "@/components/Auth/signOut";
import ResetPassword from "@/components/Auth/resetPassword";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <p>{t("test")}</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Link href='/' locale='en'>
                    English
                </Link>
                <Link href='/' locale='ar'>
                    العربية
                </Link>
                <p>Hello Team</p>
            </div>
            <SignIn />
            <SignUp />
            <SignOut />
            <ResetPassword />
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
