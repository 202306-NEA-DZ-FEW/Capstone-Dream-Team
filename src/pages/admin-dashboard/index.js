import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

import Dashboard from "@/components/Overview/Dashboard";

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
        <ThemeProvider enableSystem={true} attribute='class'>
            {/* Check whether the user is signed in */}
            {authUser ? (
                // Show the page of the admin dashboard
                <div className='flex'>
                    <Sidemenu handleClick={handleClick}></Sidemenu>
                    <div className='w-4/5 p-8 text-2xl font-bold'>
                        {component}
                    </div>
                </div>
            ) : (
                // Show a message for the user to sign in first
                <Layout>
                    <div className='flex flex-col w-full justify-center items-center py-48 space-y-16'>
                        <div className='flex text-2xl font-semibold'>
                            You need to have an account to enter the dashboard
                            page!
                        </div>
                        <Link href='/'>
                            <button className='w-[160px] text-lg bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105'>
                                Create account
                            </button>
                        </Link>
                    </div>
                </Layout>
            )}
        </ThemeProvider>
    );
}
