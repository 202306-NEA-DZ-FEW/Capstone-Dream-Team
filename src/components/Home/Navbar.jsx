import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { IoEarthOutline } from "react-icons/io5";
import { PiMoonLight } from "react-icons/pi";

import { auth } from "../../util/firebase";

export default function Navbar({ locale }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownopen] = useState(false);
    const currentTheme = theme === "system" ? "light" : theme;
    const [clicked, setClicked] = useState(false);

    const router = useRouter();
    const { t } = useTranslation("common");

    // Function to change the language
    const changeLanguage = (newLanguage) => {
        const { pathname, query, asPath } = router;

        // Use the router to change the locale in the URL
        router.push({ pathname, query }, asPath, { locale: newLanguage });
    };

    function handleClick() {
        setClicked(!clicked);
    }

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <>
            <nav className='sticky z-20 top-0 font-sans uppercase  shadow bg-white border-gray-200 py-2.5 dark:bg-gray-900 backdrop-filter backdrop-blur-lg backdrop-opacity-25 opacity-80 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-gray-700 '>
                <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-2 mx-auto'>
                    {currentTheme === "light" ? (
                        <div className='flex  h-12 mr-3 sm:h-12 sm:mb-2'>
                            <div className='flex h-full w-full ml-6 pt-3 justify-center items-center'>
                                <Link href='/'>
                                    <Image
                                        src='/images/home/Navbar/logo.png'
                                        alt='logo'
                                        width={100}
                                        height={40}
                                    ></Image>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className='flex  h-9 mr-3 sm:h-8 sm:mb-2'>
                            <div className='flex h-full w-full pt-3 justify-center items-center'>
                                <Link href='/'>
                                    <Image
                                        src='/images/home/Navbar/logo.png'
                                        alt='logo'
                                        width={100}
                                        height={40}
                                    ></Image>
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className='flex items-center text-[#192655] px-2 lg:order-2 '>
                        <Link href='/'>
                            {" "}
                            <AiOutlineShoppingCart className='pt-1 w-6 h-6 relative ' />{" "}
                        </Link>
                        {currentTheme === "light" ? (
                            <div className='hidden lg:inline-block text-[#192655] w-4 h-6 mx-4 relative cursor-pointer'>
                                <PiMoonLight
                                    style={{ display: "inline" }}
                                    size={18}
                                    onClick={() => setTheme("dark")}
                                ></PiMoonLight>
                            </div>
                        ) : (
                            <div className='hidden lg:inline-block w-4 h-6 mx-4 relative cursor-pointer'>
                                <BsSun
                                    style={{ display: "inline" }}
                                    onClick={() => setTheme("light")}
                                ></BsSun>
                            </div>
                        )}

                        <button
                            className='hidden text-[#192655] lg:inline-block z-20'
                            onClick={handleClick}
                        >
                            <IoEarthOutline size={20}></IoEarthOutline>{" "}
                        </button>
                        {clicked && isMobileMenuOpen === false && (
                            <div
                                className={`${
                                    locale === "en"
                                        ? "absolute right-0 mt-32 py-2 w-38 bg-white rounded-sm shadow-xl z-20"
                                        : "absolute left-0 mt-32 py-2 w-38 bg-white rounded-sm shadow-xl z-20"
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
                                        <button
                                            onClick={() => changeLanguage("en")}
                                        >
                                            English
                                        </button>
                                    </li>
                                    <li
                                        className={`${
                                            locale === "en"
                                                ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                        }`}
                                    >
                                        {" "}
                                        <button
                                            onClick={() => changeLanguage("ar")}
                                        >
                                            العربية
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button
                            type='button'
                            onClick={toggleMobileMenu}
                            className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                            aria-controls='mobile-menu-2'
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className={`w-6 h-6  ${
                                    isMobileMenuOpen ? "hidden" : ""
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                            <svg
                                className={`w-6 h-6  ${
                                    isMobileMenuOpen ? "" : "hidden"
                                }`}
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`items-center justify-between w-full lg:flex lg:w-auto lg-order-1 ${
                            isMobileMenuOpen ? "block" : "hidden"
                        }`}
                    >
                        <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0'>
                            <li>
                                <Link
                                    className='block py-2 pl-3 pr-4 text-[#192655] font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700  dark:text-gray-100 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 active:text-white active:border-2 active:bg-purple-700  active:rounded'
                                    href='/'
                                >
                                    {t("Navbar.home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className='block py-2 pl-3 pr-4 text-[#192655] font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700   dark:text-gray-100 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 active:text-white active:border-2 active:bg-purple-700  active:rounded'
                                    href='/meals'
                                >
                                    {t("Navbar.meals")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/blogs'
                                    className='block py-2 pl-3 pr-4 text-[#192655] font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700   dark:text-gray-100 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 active:text-white active:border-2 active:bg-purple-700  active:rounded'
                                >
                                    {t("Navbar.blogs")}
                                </Link>
                            </li>
                            <li>
                                <div className='relative group'>
                                    <span
                                        onClick={handleDropdown}
                                        className='block py-2 pl-2 pr-4 text-[#192655] font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700   dark:text-gray-100 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 active:text-white active:border-2 active:bg-purple-700  active:rounded'
                                    >
                                        {!auth.currentUser
                                            ? t("Navbar.joinUs")
                                            : t("Navbar.restaurant")}
                                    </span>

                                    {dropdownOpen === true && auth.currentUser && (
                                        <div
                                            className={`${
                                                locale === "en"
                                                    ? "absolute py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                                    : " absolute py-2 w-46 bg-white rounded-sm shadow-xl z-20"
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
                                                    {t("Navbar.dashboard")}
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${
                                                        locale === "en"
                                                            ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                            : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                    }`}
                                                >
                                                    {t("Navbar.signOut")}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {dropdownOpen === true &&
                                        !auth.currentUser && (
                                            <div
                                                className={`${
                                                    locale === "en"
                                                        ? "absolute py-2 w-46 bg-white rounded-sm shadow-xl z-20"
                                                        : " absolute py-2 w-46 bg-white rounded-sm shadow-xl z-20"
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
                                                    {t("Navbar.signIn")}
                                                </Link>
                                            </div>
                                        )}
                                </div>
                            </li>
                            <li className='lg:hidden'>
                                {currentTheme === "light" ? (
                                    <div
                                        className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50  lg:border-0 lg:hover:text-purple-700  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer'
                                        onClick={() => setTheme("dark")}
                                    >
                                        <PiMoonLight
                                            style={{ display: "inline" }}
                                            size={18}
                                        ></PiMoonLight>
                                        <span className='px-2'>
                                            {t("Navbar.light mode")}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700  cursor-pointer'
                                        onClick={() => setTheme("light")}
                                    >
                                        <BsSun
                                            style={{ display: "inline" }}
                                        ></BsSun>
                                        <span className='px-2'>
                                            {t("Navbar.dark mode")}
                                        </span>
                                    </div>
                                )}
                            </li>
                            <li className='lg:hidden'>
                                <button
                                    className='flex py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 '
                                    onClick={handleClick}
                                >
                                    <IoEarthOutline size={20}></IoEarthOutline>{" "}
                                    <span className='px-2'>
                                        {t("Navbar.language")}
                                    </span>
                                </button>
                                {isMobileMenuOpen === true && clicked && (
                                    <div
                                        className={`${
                                            locale === "en"
                                                ? " py-2 w-38 bg-white rounded-sm shadow-xl z-20"
                                                : "  py-2 w-38 bg-white rounded-sm shadow-xl z-20"
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
                                                <button
                                                    onClick={() =>
                                                        changeLanguage("en")
                                                    }
                                                >
                                                    English
                                                </button>
                                            </li>
                                            <li
                                                className={`${
                                                    locale === "en"
                                                        ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                        : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-teal-500 hover:text-white"
                                                }`}
                                            >
                                                {" "}
                                                <button
                                                    onClick={() =>
                                                        changeLanguage("ar")
                                                    }
                                                >
                                                    العربية
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
