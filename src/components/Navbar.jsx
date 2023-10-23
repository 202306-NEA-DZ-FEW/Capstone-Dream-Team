import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { auth } from "../util/firebase";
export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownopen] = useState(false);
    const currentTheme = theme === "system" ? "light" : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const handleDropdown = () => {
        setDropdownopen(!dropdownOpen);
    };
    const handleLogout = async () => {
        // Sign out the authenticated user using Firebase's 'signOut' function.
        await signOut(auth);
        setDropdownopen(!dropdownOpen);
    };

    return (
        <>
            <nav className='w-full h-16 top-0 shadow bg-white dark:bg-gradient-to-r dark:from-[#101d31]  dark:via-[#730073]  dark:to-[#3e3e3e]'>
                <div className='flex  h-full justify-between items-center text-sm'>
                    <div className='flex w-full h-full px-6'>
                        {currentTheme === "light" ? (
                            <div className='flex w-full  items-center   cursor-pointer'>
                                <Link href='/'>
                                    <Image
                                        src='/images/logo.svg'
                                        alt='logo'
                                        width={60}
                                        height={70}
                                    ></Image>
                                </Link>
                                <Link href='/'>
                                    <Image
                                        src='/images/logoName.svg'
                                        alt='logo'
                                        width={120}
                                        height={80}
                                    ></Image>
                                </Link>
                            </div>
                        ) : (
                            <div className='flex w-full items-center cursor-pointer'>
                                <Link href='/'>
                                    <Image
                                        src='/images/darklogo.svg'
                                        alt='logo'
                                        width={67}
                                        height={65}
                                    ></Image>
                                </Link>
                                <Link href='/'>
                                    <Image
                                        src='/images/darklogoName.svg'
                                        alt='logo'
                                        width={120}
                                        height={80}
                                    ></Image>
                                </Link>
                            </div>
                        )}

                        <div className='flex w-full h-full items-center px-8 space-x-8 '>
                            <Link
                                className='py-2 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Home
                            </Link>
                            <Link
                                className='py-2 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Blogs
                            </Link>
                            <Link
                                className='py-2 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Meals
                            </Link>
                        </div>
                    </div>

                    <div className='flex  items-center px-6 space-x-4'>
                        <button className='  w-[120px] bg-teal-500 dark:bg-purple-600 text-white py-1 px-1 rounded hover:shadow-lg transform hover:scale-105'>
                            Donate now
                        </button>
                        <Link href='/'>
                            {" "}
                            <AiOutlineShoppingCart className='w-6 h-6 relative' />{" "}
                        </Link>

                        {currentTheme === "light" ? (
                            <div className='w-6 h-6 relative cursor-pointer'>
                                <HiOutlineMoon
                                    style={{ display: "inline" }}
                                    onClick={() => setTheme("dark")}
                                ></HiOutlineMoon>
                            </div>
                        ) : (
                            <div className='w-6 h-6 relative cursor-pointer'>
                                <BsSun
                                    style={{ display: "inline" }}
                                    onClick={() => setTheme("light")}
                                ></BsSun>
                            </div>
                        )}
                        <div>
                            <button
                                onClick={handleDropdown}
                                class='relative z-10 block rounded-md p-1
             text-gray-600 dark:text-white
            overflow-hidden focus:outline-none focus:border-green'
                            >
                                <div className='flex gap-0'>
                                    <HiOutlineUserCircle
                                        size={20}
                                    ></HiOutlineUserCircle>
                                    {dropdownOpen === false ? (
                                        <IoIosArrowDropdownCircle className='pt-1 self-end'></IoIosArrowDropdownCircle>
                                    ) : (
                                        <BiSolidUpArrowCircle></BiSolidUpArrowCircle>
                                    )}
                                </div>
                            </button>

                            {dropdownOpen === true && auth.currentUser && (
                                <div
                                    className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md
        shadow-xl z-20'
                                >
                                    <div>
                                        <Link
                                            href='/admin-dashoard'
                                            className='  block  px-4 py-2 text-sm capitalize text-gray-800 hover:bg-indigo-500
            hover:text-white'
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className='block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-indigo-500
            hover:text-white'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                            {dropdownOpen === true && !auth.currentUser && (
                                <div
                                    className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md border-t-[1px] border-gray-200
        shadow-xl z-20'
                                >
                                    <Link
                                        href='/signup'
                                        className='block px-4 py-2 text-sm capitalize text-gray-800 hover:bg-indigo-500
        hover:text-white'
                                    >
                                        signIn
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
