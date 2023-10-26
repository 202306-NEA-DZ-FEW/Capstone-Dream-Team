import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoEarthOutline } from "react-icons/io5";

import { auth } from "../util/firebase";

export default function Navbar({ locale }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownopen] = useState(false);
    const currentTheme = theme === "system" ? "light" : theme;
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

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
            <nav className='sticky z-10 w-full h-10 lg:h-16 top-0 shadow bg-white backdrop-filter backdrop-blur-lg opacity-80 dark:bg-gradient-to-r dark:from-[#101d31]  dark:via-[#730073]  dark:to-[#3e3e3e]'>
                <div className='flex  h-full justify-between items-center text-sm'>
                    <div className='flex justify-center md:justify-between w-full h-full px-2'>
                        {currentTheme === "light" ? (
                            <div className='flex w-1/2 mr-4 items-center cursor-pointer'>
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
                            <div className='flex w-1/2 items-center cursor-pointer'>
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

                        <div className='flex w-full h-full items-center text-[10px] md:text-[14px] px-2 ml-12 space-x-4 md:px-8 md:space-x-8 '>
                            <Link
                                className='py-2 px-1 ml-4 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Home
                            </Link>
                            <Link
                                className='py-2 px-1 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Blogs
                            </Link>
                            <Link
                                className='py-2 px-1 hover:border-b-2 hover:border-[#67b99a] hover:text-[#67b99a] active:border-b-2 active:border-[#036666] active:text-[#036666]'
                                href='/'
                            >
                                Meals
                            </Link>
                        </div>
                    </div>

                    <div className='flex  items-center px-6 space-x-4'>
                        <button className='ml-2 text-[10px] px-[2px] py-[3px] w-[60px] bg-teal-500 dark:bg-purple-600 text-white md:py-[6px] md:px-[2px] md:text-[14px]  md:w-[100px] rounded hover:shadow-lg transform hover:scale-105'>
                            Donate now
                        </button>
                        <Link href='/'>
                            {" "}
                            <AiOutlineShoppingCart className=' w-[12px] pt-1 h-[16px]  md:w-6 md:h-6 relative' />{" "}
                        </Link>

                        {currentTheme === "light" ? (
                            <div className='w-[6px] h-[20px]  md:w-4 md:h-6 relative cursor-pointer'>
                                <HiOutlineMoon
                                    style={{ display: "inline" }}
                                    size={16}
                                    onClick={() => setTheme("dark")}
                                ></HiOutlineMoon>
                            </div>
                        ) : (
                            <div className='w-2 h-4 md:w-6 md:h-6 relative cursor-pointer'>
                                <BsSun
                                    style={{ display: "inline" }}
                                    onClick={() => setTheme("light")}
                                ></BsSun>
                            </div>
                        )}
                        <div>
                            <button
                                onClick={handleDropdown}
                                className='relative z-10 block rounded-md p-1
             text-gray-900 dark:text-white
            overflow-hidden focus:outline-none focus:border-green'
                            >
                                <div className=' w-6 h-4 md:w-8 md:h-6 flex gap-0'>
                                    <HiOutlineUserCircle
                                        size={30}
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
                                    className={`${
                                        locale === "en"
                                            ? "absolute right-[80px] mt-2 py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                            : "absolute left-[80px] mt-2 py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                    }`}
                                >
                                    <div>
                                        <Link
                                            href='/admin-dashboard'
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                            }`}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                            }`}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                            {dropdownOpen === true && !auth.currentUser && (
                                <div
                                    className={`${
                                        locale === "en"
                                            ? "absolute right-[80px] mt-2 py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                            : "absolute left-[80px] mt-2 py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                    }`}
                                >
                                    <Link
                                        href='/signup'
                                        className={`${
                                            locale === "en"
                                                ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                        }`}
                                    >
                                        signIn
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className='z-20 flex' onClick={handleClick}>
                                <IoEarthOutline size={20}></IoEarthOutline>{" "}
                                <AiFillCaretDown className='pt-1 self-end'></AiFillCaretDown>
                            </button>
                            {clicked && (
                                <div
                                    className={`${
                                        locale === "en"
                                            ? "absolute right-0 mt-2 py-2 w-38 bg-white rounded-sm shadow-xl z-20"
                                            : "absolute left-0 mt-2 py-2 w-38 bg-white rounded-sm shadow-xl z-20"
                                    }`}
                                >
                                    <ul>
                                        <li
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                            }`}
                                        >
                                            {" "}
                                            <Link href='/' locale='en'>
                                                English
                                            </Link>
                                        </li>
                                        <li
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                            }`}
                                        >
                                            {" "}
                                            <Link href='/' locale='ar'>
                                                العربية
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
