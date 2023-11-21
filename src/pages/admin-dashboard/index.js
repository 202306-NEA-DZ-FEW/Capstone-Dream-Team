import { onAuthStateChanged } from "firebase/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { FaTruckLoading } from "react-icons/fa";

import Overview from "@/components/Overview/overview";

import Layout from "@/layout/Layout";
import { auth } from "@/util/firebase";

// Import the AddMeals component
import Sidemenu from "../../components/Sidemenu";

export default function AdminDashboard({ locale }) {
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
                <div className='flex flex-row '>
                    <Sidemenu
                        locale={locale}
                        handleClick={handleClick}
                    ></Sidemenu>

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
                        {locale === "ar" ? (
                            <div className='flex text-4xl font-semibold'>
                                تحميل ...
                            </div>
                        ) : (
                            <div className='flex text-4xl font-bold '>
                                <span className='animate-spin duration-300'>
                                    <FaTruckLoading size={20} />
                                </span>
                                <span className=''>loading</span>
                                <span className='animate-pulse duration-300'>
                                    ...
                                </span>
                            </div>
                        )}
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
