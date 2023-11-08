import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { IoIosArrowDropright } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaHistorySolid } from "react-icons/lia";
import { PiMoonStarsLight } from "react-icons/pi";

import AddMeals from "./Add-meals";
import Adminhistory from "./History/Adminhistory";
import Overview from "./Overview/Overview";
import Settings from "./Settings";
import { auth, db } from "../util/firebase";

export default function Sidemenu(props) {
    const components = [
        {
            name: "Overview",
            icon: <AiOutlineHome size={20}></AiOutlineHome>,
            element: <Overview />,
        },
        {
            name: "Meals/Coupons",
            icon: <HiOutlineChartBarSquare size={20} />,
            element: <AddMeals />,
        },
        {
            name: "History",
            icon: <LiaHistorySolid size={20} />,
            element: <Adminhistory />,
        },
        {
            name: "Settings",
            icon: <AiOutlineSetting size={20} />,
            element: <Settings />,
        },
    ];
    // Import and destructure the 'useTheme' hook and React state management functions.
    const { theme, setTheme } = useTheme();

    // Initialize state variables for component mounting, current theme, user data, and authenticated user.
    const [mounted, setMounted] = useState(false); // Indicates if the component is mounted.
    const currentTheme = theme === "system" ? "light" : theme; // State for the current theme.
    const [userData, setUserData] = useState(null); // State to store user data.
    const [authUser, setAuthUser] = useState(null); // State to store the authenticated user.
    const [open, setOpen] = useState(true);
    // Use 'useEffect' to run code when 'authUser' changes.
    useEffect(() => {
        // Use Firebase's 'onAuthStateChanged' to listen for changes in user authentication state.
        onAuthStateChanged(auth, (user) => {
            // If a user is authenticated, set 'authUser' to the user; otherwise, set it to null.
            user ? setAuthUser(user) : setAuthUser(null);
        });

        // Define a function to fetch user information from Firestore.
        const fetchInformation = async () => {
            if (authUser) {
                // Check if an authenticated user exists.
                const userId = authUser.uid; // Get the user's unique identifier (UID).
                const docRef = doc(db, "restaurant", userId); // Create a reference to the user's Firestore document.
                const docSnap = await getDoc(docRef); // Fetch the user's document.

                if (docSnap.exists()) {
                    // Check if the document exists.
                    // Extract and store user data, including the user's ID.
                    const userData = { ...docSnap.data(), id: userId };
                    setUserData(userData);
                }
            }
        };

        // Call the 'fetchInformation' function to initiate data fetching.
        fetchInformation();

        // Mark the component as mounted by setting 'mounted' to true.
        setMounted(true);
    }, [authUser]); // Run the effect when 'authUser' changes.

    // If the component is not yet mounted, return null to prevent rendering.
    if (!mounted) return null;

    // Define a function to handle user logout.
    const handleLogout = async () => {
        // Sign out the authenticated user using Firebase's 'signOut' function.
        await signOut(auth);
    };
    const handleShow = () => {
        setOpen(!open);
    };

    return (
        <>
            <div
                className={`col-span-1  h-screen z-30 fixed duration-300  ${
                    !open ? "w-60" : "w-20 md:w-60"
                }`}
            >
                <IoIosArrowDropright
                    onClick={handleShow}
                    className={`z-40 md:hidden absolute top-9 -right-4 cursor-pointer w-8 h-10 duration-300 ${
                        !open && "rotate-180 "
                    } `}
                ></IoIosArrowDropright>

                <div className='w-full h-full pl-3 pt-6  bg-white  dark:border-gray-200  shadow-xl border-r border-gray-200 flex-col justify-between items-start inline-flex gap-8  dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-700  '>
                    <div className='  flex-col justify-start items-start gap-4 flex'>
                        <div className='justify-center md:justify-start items-center gap-3  md:inline-flex lg:inline-flex'>
                            <Image
                                className={`w-12 h-12 relative rounded-2xl ease-out duration-700 ${
                                    !open && "rotate-[360deg]"
                                }`}
                                src={
                                    userData && userData.image
                                        ? userData.image
                                        : "/images/placeholderImage.png"
                                }
                                width={40}
                                height={40}
                                alt='admin photo'
                            />

                            <div
                                className={`flex-col justify-center items-start inline-flex ${
                                    open && "scale-0 md:transform-none"
                                }`}
                            >
                                <div className="w-[150px] text-zinc-950 dark:text-white text-base font-bold font-['Open Sans']">
                                    {userData
                                        ? userData.restaurantName
                                        : "loading..."}
                                </div>
                                <div className="w-[150px] text-neutral-800  dark:text-white text-[10px] lg:text-[14px] font-normal font-['Open Sans']">
                                    {userData ? userData.email : "loading..."}
                                </div>
                            </div>
                        </div>

                        <div className='flex-col pt-2 pb-2 justify-start items-start gap-4 flex'>
                            {components.map((component, index) => (
                                <div
                                    key={index}
                                    className='p-2 rounded-lg flex-col justify-start items-start gap-1 flex'
                                >
                                    <div
                                        className='h-4 justify-start items-center gap-2 inline-flex'
                                        onClick={() =>
                                            props.handleClick(component.element)
                                        }
                                    >
                                        <div className='   relative'>
                                            {component.icon}
                                        </div>
                                        <button
                                            className={`text-[#333333] hover:text-black  dark:text-white text-[10px] md:text-sm font-normal font-['Open Sans'] leading-snug duration-300 ${
                                                open &&
                                                "scale-0 md:transform-none"
                                            }`}
                                        >
                                            {component.name}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='self-stretch h-full w-full flex-col justify-start pt-8 items-start gap-2 flex'>
                        <div className='px-2 rounded-lg flex-col justify-start items-start gap-1 flex'>
                            <Link href='/'>
                                <div
                                    className='justify-start items-center gap-1 inline-flex'
                                    onClick={handleLogout}
                                >
                                    <div className='pt-1 w-6 h-6 relative'>
                                        <IoLogOutOutline size={20} />
                                    </div>
                                    <button className="text-[#333333]  dark:text-white text-sm font-normal font-['Open Sans'] leading-snug">
                                        <div
                                            className={`duration-300 ${
                                                open &&
                                                "scale-0 md:transform-none"
                                            }`}
                                        >
                                            Logout
                                        </div>
                                    </button>
                                </div>{" "}
                            </Link>
                        </div>
                        <div className='self-stretch pl-3 pr-6 py-3 rounded-lg justify-between items-center inline-flex'>
                            <div className=' justify-start items-center gap-1 flex'>
                                <div className='w-6 h-6 relative'>
                                    <div>
                                        {" "}
                                        {currentTheme === "dark" ? (
                                            <BsSun
                                                size={20}
                                                style={{ display: "inline" }}
                                                onClick={() =>
                                                    setTheme("light")
                                                }
                                            ></BsSun>
                                        ) : (
                                            <PiMoonStarsLight
                                                size={20}
                                                style={{ display: "inline" }}
                                                onClick={() => setTheme("dark")}
                                            ></PiMoonStarsLight>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`text-[#333333] dark:text-white text-sm font-normal font-['Open Sans'] leading-snug duration-300 ${
                                        open && "scale-0 md:transform-none"
                                    }`}
                                >
                                    {currentTheme === "dark" ? "light" : "dark"}{" "}
                                    mode
                                </div>
                            </div>
                            {currentTheme === "light" ? (
                                <label
                                    htmlFor='check'
                                    className='w-12 h-5 rounded-full relative bg-white  cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        id='check'
                                        className='sr-only '
                                        onClick={() => setTheme("dark")}
                                    />
                                    <span className='w-2/5 h-3/5 top-1 left-1 rounded-full bg-[#E9B824] absolute flex justify-center items-center'></span>
                                </label>
                            ) : (
                                <label
                                    htmlFor='check'
                                    className='w-12 h-5 rounded-full relative bg-white  cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        id='check'
                                        className='sr-only peer'
                                        onClick={() => setTheme("light")}
                                    />
                                    <span className='w-2/5 h-3/5 top-1 left-6 rounded-full bg-black absolute flex justify-center items-center'></span>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
