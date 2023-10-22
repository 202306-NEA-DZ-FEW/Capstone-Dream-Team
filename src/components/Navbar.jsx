import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { HiOutlineMoon } from "react-icons/hi";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? "light" : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <nav className='w-full h-16 top-0 shadow bg-white dark:bg-gradient-to-r dark:from-[#101d31]  dark:via-[#0000e6]  dark:to-[#3e3e3e]'>
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
                                        src='/images/darkmodeLogo.svg'
                                        alt='logo'
                                        width={67}
                                        height={65}
                                    ></Image>
                                </Link>
                                <Link href='/'>
                                    <Image
                                        src='/images/darkmodeName.svg'
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
                    </div>
                </div>
            </nav>
        </>
    );
}
