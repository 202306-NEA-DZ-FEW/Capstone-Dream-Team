import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";

import Dashboard from "@/components/Overview/Dashboard";

import { auth } from "@/util/firebase";

import Sidemenu from "../../components/Sidemenu";
import Layout from "@/layout/Layout";

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
        [];
    });

    return (
        <ThemeProvider enableSystem={true} attribute='class'>
            {/* to check whether the user is signed in    */}
            {authUser ? (
                // we show the page of the admin dashboard
                <div className='flex'>
                    {/* we pass a function to the Sidemenu so it shows the component based on what the user clicked */}
                    <Sidemenu handleClick={handleClick}></Sidemenu>
                    <div className='flex justify-items-center items-center p-8 text-2xl font-bold'>
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
                        <Link href='/'>
                            <button className='w-[160px] text-lg bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105 '>
                                Create account
                            </button>
                        </Link>
                    </div>
                </Layout>
            )}
        </ThemeProvider>
    );
}
