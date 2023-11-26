import { onAuthStateChanged } from "firebase/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

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
                            <div className='flex justify-center items-center '>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 200 200'
                                    className='w-12 h-12'
                                >
                                    <radialGradient
                                        id='a12'
                                        cx='.66'
                                        fx='.66'
                                        cy='.3125'
                                        fy='.3125'
                                        gradientTransform='scale(1.5)'
                                    >
                                        <stop
                                            offset='0'
                                            stop-color='#0C0355'
                                        ></stop>
                                        <stop
                                            offset='.3'
                                            stop-color='#0C0355'
                                            stop-opacity='.9'
                                        ></stop>
                                        <stop
                                            offset='.6'
                                            stop-color='#0C0355'
                                            stop-opacity='.6'
                                        ></stop>
                                        <stop
                                            offset='.8'
                                            stop-color='#0C0355'
                                            stop-opacity='.3'
                                        ></stop>
                                        <stop
                                            offset='1'
                                            stop-color='#0C0355'
                                            stop-opacity='0'
                                        ></stop>
                                    </radialGradient>
                                    <circle
                                        transform-origin='center'
                                        fill='none'
                                        stroke='url(#a12)'
                                        stroke-width='15'
                                        stroke-linecap='round'
                                        stroke-dasharray='200 1000'
                                        stroke-dashoffset='0'
                                        cx='100'
                                        cy='100'
                                        r='70'
                                    >
                                        <animateTransform
                                            type='rotate'
                                            attributeName='transform'
                                            calcMode='spline'
                                            dur='2'
                                            values='360;0'
                                            keyTimes='0;1'
                                            keySplines='0 0 1 1'
                                            repeatCount='indefinite'
                                        ></animateTransform>
                                    </circle>
                                    <circle
                                        transform-origin='center'
                                        fill='none'
                                        opacity='.2'
                                        stroke='#0C0355'
                                        stroke-width='15'
                                        stroke-linecap='round'
                                        cx='100'
                                        cy='100'
                                        r='70'
                                    ></circle>
                                </svg>

                                <span className='text-4xl ml-2'>loading</span>
                                <span className='animate-pulse duration-300 text-4xl ml-2'>
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
