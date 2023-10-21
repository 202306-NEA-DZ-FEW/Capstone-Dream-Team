import react from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignIn from "@/components/Auth/signIn";
import SignUp from "@/components/Auth/signUp";
import ResetPassword from "@/components/Auth/resetPassword";
import { useState } from "react";
import Layout from "@/layout/Layout";

function Enter() {
    const [component, setComponent] = useState("SignIn");

    function componentToRender(element) {
        setComponent(element);
    }

    return (
        <Layout>
            <main className='relative'>
                <img
                    className='h-screen w-full object-cover absolute z-0'
                    src='https://images.unsplash.com/photo-1526168637801-e9f490d6bc04?auto=format&fit=crop&q=80&w=1373&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='image'
                ></img>
                <div className='relative z-10'>
                    {component === "SignIn" && (
                        <SignIn updateComponent={componentToRender} />
                    )}
                    {component === "SignUp" && (
                        <SignUp updateComponent={componentToRender} />
                    )}
                    {component === "ResetPassword" && (
                        <ResetPassword updateComponent={componentToRender} />
                    )}
                </div>
            </main>
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

export default Enter;
