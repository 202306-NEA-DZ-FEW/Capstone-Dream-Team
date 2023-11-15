import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

import Overview from "@/components/Overview/overview";

import Layout from "@/layout/Layout";
import { auth } from "@/util/firebase";

// Import the AddMeals component
import Sidemenu from "../../components/Sidemenu";

export default function AdminDashboard() {
    const [component, setComponent] = useState(<Overview />);

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
        <>
            {/* to check whether the user is signed in    */}
            {authUser ? (
                // we show the page of the admin dashboard
                <div className='flex flex-row'>
                    <Sidemenu handleClick={handleClick}></Sidemenu>

                    {/* we pass a function to the Sidemenu so it shows the component based on what the user clicked */}
                    <div className='order-1 md:mr-2 md:w-64 w-20'></div>

                    <div className=' w-full h-screen justify-items-left  p-8 text-2xl font-bold overflow-scroll order-2 z-40'>
                        {component}
                    </div>
                </div>
            ) : (
                // we show a message so the user sign in first
                <Layout>
                    <div className='flex flex-col w-full justify-center items-center py-48 space-y-16 '>
                        {" "}
                        <div className='flex text-2xl font-semibold'>
                            You need to have an acount to enter the dashboard
                            page !
                        </div>
                        <Link href='/signup'>
                            <button className='bg-orange-400 hover:bg-orange-600 mt-8 py-3 px-8 text-lg rounded-full font-bold uppercase text-white tracking-widest hover:shadow-lg transform hover:scale-105 '>
                                Create account
                            </button>
                        </Link>
                    </div>
                </Layout>
            )}
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
