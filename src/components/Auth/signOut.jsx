import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "@/util/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

const SignOut = () => {
    const router = useRouter();

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
    }, []);

    const userSignOut = () => {
        if (authUser) {
            signOut(auth)
                .then(() => {
                    console.log("Signed out succesfully");
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className='flex items-center space-x-2'>
            {authUser && (
                <Link
                    href={"/user"}
                    className='flex  hover:underline text-accent items-center '
                >
                    <FaUserAlt className='mr-2 w-5 h-5' />
                    <div className='hidden font-semibold md:block text-sm'>
                        {authUser.email}
                    </div>
                </Link>
            )}
            <button
                onClick={userSignOut}
                className={`${
                    authUser
                        ? "bg-red-500 font-semibold text-white p-1 px-2 border border-border rounded-md hover:bg-red-900"
                        : "font-bold border border-border p-1 px-2 rounded-md text-content hover:bg-teal-500"
                }`}
            >
                {authUser ? "Sign Out" : <Link href={"/signin"}>Sign In</Link>}
            </button>
        </div>
    );
};

export default SignOut;
