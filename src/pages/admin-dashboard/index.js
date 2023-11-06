import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

import Dashboard from "@/components/Dashboard";

import Layout from "@/layout/Layout";
import { auth } from "@/util/firebase";

// Import the AddMeals component
import Sidemenu from "../../components/Sidemenu";

export default function AdminDashboard() {
    const [component, setComponent] = useState(<Dashboard />);

    function handleClick(selectedComponent) {
        setComponent(selectedComponent);
    }
    const [authUser, setAuthUser] = useState(null); // State to store the authenticated user.

    // Use 'useEffect' to run code when 'authUser' changes.
    useEffect(() => {
        // Use Firebase's 'onAuthStateChanged' to listen for changes in user authentication state.
        onAuthStateChanged(auth, (user) => {
            // If a user is authenticated, set 'authUser' to the user; otherwise, set it to null.
            user ? setAuthUser(user) : setAuthUser(null);
        });
    }, []); // Pass an empty dependency array to run this effect only once.

    return (
        <Layout>
            {/* to check whether the user is signed in    */}
            {authUser ? (
                // we show the page of the admin dashboard
                <div className='flex w-full h-screen overflow-hidden'>
                    {/* we pass a function to the Sidemenu so it shows the component based on what the user clicked */}
                    <Sidemenu handleClick={handleClick}></Sidemenu>
                    <div className='flex w-4/5 justify-items-center  p-8 text-2xl font-bold overflow-scroll'>
                        {component}
                    </div>
                </div>
            ) : (
                // we show a message so the user sign in first

                <div className='flex flex-col w-full justify-center items-center py-48 space-y-16 '>
                    {" "}
                    <div className='flex text-2xl font-semibold'>
                        You need to have an acount to enter the dashboard page !
                    </div>
                    <Link href='/'>
                        <button className='w-[160px] text-lg bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105 '>
                            Create account
                        </button>
                    </Link>
                </div>
            )}
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
