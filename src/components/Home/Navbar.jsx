import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";

import CartIcon from "../Cart/cartIcon";
import { auth } from "../../util/firebase";

export default function Navbar({ locale }) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const router = useRouter();
    const { t } = useTranslation("common");

    const { pathname } = router;

    // Function to change the language
    const changeLanguage = (newLanguage) => {
        const { pathname, query, asPath } = router;

        // Use the router to change the locale in the URL
        router.push({ pathname, query }, asPath, { locale: newLanguage });
    };

    function handleClick() {
        setClicked(!clicked);
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <>
            <nav className='sticky z-20 mt-0 top-0  bg-white  py-2.5  lg:backdrop-filter lg:backdrop-blur-lg lg:backdrop-opacity-25 lg:opacity-80 '>
                <div className='flex flex-wrap items-center justify-between max-w-screen-2xl px-2 mx-auto'>
                    <div className='flex  h-8 mr-3  sm:mb-2'>
                        <div className='flex h-full w-full ml-6 pt-3 justify-center items-center'>
                            <Link href='/'>
                                <Image
                                    src='/images/home/Navbar/logo.png'
                                    alt='logo'
                                    width={80}
                                    height={30}
                                ></Image>
                            </Link>
                        </div>
                    </div>

                    <div className='flex items-center text-blue-800 hover:text-[#192655] px-2 lg:order-2 '>
                        <Link href='/cart'>
                            <CartIcon></CartIcon>
                        </Link>
                        <div className='hidden relative lg:inline-block z-20 '>
                            <button
                                className='p-2 text-blue-800 hover:text-[#192655]'
                                onMouseEnter={() => setClicked(true)}
                                onClick={() => setClicked(!clicked)}
                            >
                                <IoEarthOutline size={20}></IoEarthOutline>{" "}
                            </button>
                            {clicked && isMobileMenuOpen === false && (
                                <div
                                    onMouseLeave={() => setClicked(false)}
                                    className={`${
                                        locale === "ar"
                                            ? "absolute left-1 top-14 py-2 w-28 bg-white border rounded-xl shadow-xl z-20"
                                            : "absolute right-1 top-14 py-2 w-28 bg-white border rounded-xl shadow-xl z-20"
                                    }`}
                                >
                                    <ul>
                                        <li
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
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
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                            }`}
                                        >
                                            {" "}
                                            <button
                                                onClick={() =>
                                                    changeLanguage("fr")
                                                }
                                            >
                                                Français
                                            </button>
                                        </li>
                                        <li
                                            className={`${
                                                locale === "en"
                                                    ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                                    : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
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
                        </div>
                        <button
                            type='button'
                            onClick={toggleMobileMenu}
                            className={`inline-flex items-center p-2 ml-1 text-sm text-blue-900 rounded-lg lg:hidden hover:bg-blue-100 focus:outline-none focus-visible:ring-1 focus:ring-blue-800  duration-300 ease-in-out'
                           ${
                               isMobileMenuOpen
                                   ? "rotate-180"
                                   : "transform-none"
                           }`}
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className={`w-6 h-6 ${
                                    isMobileMenuOpen ? " hidden" : ""
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
                                className={`w-6 h-6 duration-500 ${
                                    isMobileMenuOpen
                                        ? "hover:text-red-700"
                                        : "hidden"
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
                        onMouseLeave={() => {
                            setMobileMenuOpen(false), setClicked(false);
                        }}
                        className={`items-center justify-between lg:flex lg:w-auto lg-order-1  ${
                            isMobileMenuOpen
                                ? " duration-700 absolute z-30 bg-white  w-60 border rounded-l-xl shadow-xl lg:border-0 lg:relative  h-screen lg:h-8 top-14 lg:top-0 overflow-scroll"
                                : "hidden"
                        } ${locale === "en" ? "right-0" : " left-0"}`}
                    >
                        <ul className='flex flex-col text-lg normal-case space-y-12 lg:space-y-0 items-center mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0'>
                            <li>
                                <Link
                                    className={`block py-2 pl-3 pr-4 lg:text-blue-900  lg:font-bold border-b border-gray-100 hover:border-b hover:text-blue-800 hover:border-blue-950  lg:hover:bg-transparent lg:border-0 lg:hover:text-[#192655] lg:hover:border-0 cursor-pointer  ${
                                        pathname === "/"
                                            ? "focus:outline-non lg:text-orange-600  "
                                            : ""
                                    }`}
                                    href='/'
                                >
                                    {t("Navbar.home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`block py-2 pl-3 pr-4 lg:text-blue-900 lg:font-bold border-b border-gray-100 hover:text-blue-800 hover:border-b hover:border-blue-950  lg:hover:bg-transparent lg:border-0 lg:hover:text-[#192655] lg:hover:border-0 cursor-pointer ${
                                        pathname === "/meals"
                                            ? "focus:outline-non lg:text-orange-600  "
                                            : ""
                                    }`}
                                    href='/meals'
                                >
                                    {t("Navbar.meals")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/blogs'
                                    className={`block py-2 pl-3 pr-4 lg:text-blue-900 lg:font-bold border-b border-gray-100 hover:text-blue-800 hover:border-b hover:border-blue-950  lg:hover:bg-transparent lg:border-0 lg:hover:text-[#192655] lg:hover:border-0 cursor-pointer ${
                                        pathname === "/blogs"
                                            ? "focus:outline-non lg:text-orange-600  "
                                            : ""
                                    }`}
                                >
                                    {t("Navbar.blogs")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/aboutus'
                                    className={`block py-2 pl-3 pr-4 lg:text-blue-900 lg:font-bold border-b border-gray-100 hover:text-blue-800 hover:border-b hover:border-blue-950  lg:hover:bg-transparent lg:border-0 lg:hover:text-[#192655] lg:hover:border-0 cursor-pointer ${
                                        pathname === "/aboutus"
                                            ? "focus:outline-non lg:text-orange-600  "
                                            : ""
                                    }`}
                                >
                                    {t("Navbar.aboutus")}
                                </Link>
                            </li>
                            <li>
                                <div className='relative group'>
                                    <span
                                        className={`block py-2 pl-3 pr-4 lg:text-blue-900 lg:font-bold border-b border-gray-100 hover:text-blue-800 hover:border-b hover:border-blue-950  lg:hover:bg-transparent lg:border-0 lg:hover:text-[#192655] lg:hover:border-0 cursor-pointer ${
                                            pathname === "/signup" ||
                                            pathname === "/admin-dashboard"
                                                ? "focus:outline-non lg:text-orange-600  "
                                                : ""
                                        }`}
                                    >
                                        {!auth.currentUser ? (
                                            <Link href='/signup'>
                                                {t("Navbar.signIn")}{" "}
                                            </Link>
                                        ) : (
                                            <Link href='/admin-dashboard'>
                                                {" "}
                                                {t("Navbar.dashboard")}
                                            </Link>
                                        )}
                                    </span>
                                </div>
                            </li>

                            <li className='lg:hidden'>
                                <button
                                    className='flex py-2 pl-3 pr-4 lg:text-blue-950 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700'
                                    onClick={handleClick}
                                >
                                    <IoEarthOutline size={30}></IoEarthOutline>{" "}
                                    <span className='px-2'>
                                        {t("Navbar.language")}
                                    </span>
                                </button>
                                {isMobileMenuOpen === true && clicked && (
                                    <div
                                        onMouseLeave={() => setClicked(false)}
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
                                                        ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
                                                        : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
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
                                                        ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
                                                        : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
                                                }`}
                                            >
                                                {" "}
                                                <button
                                                    onClick={() =>
                                                        changeLanguage("fr")
                                                    }
                                                >
                                                    Français
                                                </button>
                                            </li>

                                            <li
                                                className={`${
                                                    locale === "en"
                                                        ? "block w-full text-left px-4 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
                                                        : "block w-full text-left px-6 py-2 text-sm capitalize text-gray-800 hover:bg-orange-500 hover:text-white"
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
