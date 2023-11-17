import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoEarthOutline } from "react-icons/io5";
import { LiaHistorySolid } from "react-icons/lia";

import AddMeals from "./Meals/addMeals";
import Adminhistory from "./History/Adminhistory";
import Overview from "./Overview/overview";
import Settings from "./Settings";
import { auth, db } from "../util/firebase";

export default function Sidemenu(props) {
    const { t } = useTranslation("common");
    const components = [
        {
            name: "sidemenu.overview",
            icon: <AiOutlineHome size={20}></AiOutlineHome>,
            element: <Overview />,
        },
        {
            name: "sidemenu.Meals",
            icon: <HiOutlineChartBarSquare size={20} />,
            element: <AddMeals />,
        },
        {
            name: "sidemenu.History",
            icon: <LiaHistorySolid size={20} />,
            element: <Adminhistory />,
        },
        {
            name: "sidemenu.Settings",
            icon: <AiOutlineSetting size={20} />,
            element: <Settings />,
        },
    ];
    // Import and destructure the 'useTheme' hook and React state management functions.

    // Initialize state variables for component mounting, current theme, user data, and authenticated user.

    const [userData, setUserData] = useState(null); // State to store user data.
    const [authUser, setAuthUser] = useState(null); // State to store the authenticated user.
    const [open, setOpen] = useState(false);
    // Use 'useEffect' to run code when 'authUser' changes.
    const [clicked, setClicked] = useState(false);
    const [mousenter, setMousenter] = useState(false);
    const router = useRouter();

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
    }, [authUser]); // Run the effect when 'authUser' changes.

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
            <nav
                style={
                    router.locale === "ar"
                        ? {
                              backgroundPositionX: "right",
                              backgroundImage:
                                  "url(/images/sidemenu/background.png)",
                          }
                        : {
                              backgroundImage:
                                  "url(images/sidemenu/background.png)",
                          }
                }
                className={`col-span-1 z-50 h-screen fixed duration-300 bg-cover ${
                    open ? " w-60" : "w-20 md:w-60"
                }`}
                onMouseLeave={() => setOpen(false)}
            >
                {router.locale === "ar" ? (
                    <IoIosArrowDropleft
                        onClick={handleShow}
                        className={`z-40 md:hidden absolute top-16 -left-6 cursor-pointer w-8 h-10 duration-300 ${
                            open && "rotate-180 "
                        } `}
                    ></IoIosArrowDropleft>
                ) : (
                    <IoIosArrowDropright
                        onClick={handleShow}
                        className={`z-40 md:hidden absolute top-16 -right-4 cursor-pointer w-8 h-10 duration-300 ${
                            open && "rotate-180 "
                        } `}
                    ></IoIosArrowDropright>
                )}
                <div className=' w-full h-full pl-3 shadow-xl border-r border-gray-200 flex flex-col justify-between items-start  gap-8'>
                    <div className='w-full flex-col justify-start items-start gap-2 flex '>
                        <div className=' mx-auto md:border-b md:border-gray-400 items-center gap-3 my-6 md:mx-auto justify-start md:justify-center '>
                            <div
                                className={`w-16 h-16 bg-white rounded-full border border-blue-200 md:w-20 mt-2 mb-4 md:mb-6  md:h-20 relative  ease-out duration-500  ${
                                    !open &&
                                    (router.locale === "ar"
                                        ? "ml-32 scale-50 p-0 mb-2 md:transform-none md:mx-auto md:mt-2 md:mb-6"
                                        : "mr-24 scale-50 p-0 mb-2 md:transform-none md:mx-auto md:mt-2 md:mb-6")
                                }$`}
                            >
                                <Link href='/' className=''>
                                    <img
                                        src='/images/home/Navbar/sidebarLogo.png'
                                        alt='logo'
                                    ></img>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:justify-center items-center gap-3  inline-flex justify-start lg:inline-flex'>
                            <Image
                                className={`w-12 h-12 relative rounded-2xl ease-out duration-700 ${
                                    open && "rotate-[360deg]"
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
                                    !open && "scale-0 md:transform-none"
                                }`}
                            >
                                <div className="w-[150px] break-words text-zinc-950 dark:text-white text-base font-bold font-['Open Sans']">
                                    {userData
                                        ? userData.restaurantName
                                        : "loading..."}
                                </div>
                                <div className="w-[150px] break-all text-neutral-800  dark:text-white text-[10px] lg:text-[14px] font-normal font-['Open Sans']">
                                    {userData ? userData.email : "loading..."}
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex-col pt-4 pb-2 justify-start items-start gap-4 flex'>
                            {components.map((component, index) => (
                                <div
                                    key={index}
                                    className=' flex-col justify-start items-start gap-1 flex '
                                >
                                    <div
                                        className={` h-4 p-4 rounded-lg justify-start items-center gap-2 inline-flex hover:text-white hover:bg-blue-400 active:bg-blue-700 focus:outline-none focus:bg-blue-600 ${
                                            clicked === true
                                                ? "focus:outline-none focus-within:text-orange-600 focus-current:border-b-2 "
                                                : ""
                                        }`}
                                        onClick={() => {
                                            props.handleClick(
                                                component.element
                                            );
                                            setClicked(true);
                                        }}
                                    >
                                        <div className='relative focus:outline-none'>
                                            {component.icon}
                                        </div>
                                        <button
                                            className={` focus:outline-none text-[10px] md:text-sm font-normal font-['Open Sans']  duration-300 ${
                                                !open &&
                                                "scale-0 md:transform-none"
                                            }`}
                                        >
                                            {t(`${component.name}`)}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=' w-full self-stretch h-full flex-col justify-start pt-1 items-start  flex'>
                        <div className='w-full flex-col justify-start items-start gap-1 flex'>
                            <div
                                className='h-4 p-4 rounded-lg justify-start items-center gap-2 inline-flex cursor-pointer  hover:text-white hover:bg-blue-400 active:bg-blue-700 focus:outline-none focus:bg-blue-600'
                                onMouseEnter={() => setMousenter(true)}
                                onMouseLeave={() => setMousenter(false)}
                            >
                                <div className='focus:outline-none relative'>
                                    <IoEarthOutline size={20}></IoEarthOutline>{" "}
                                </div>
                                <button
                                    className={`text-[#333333] hover:text-black  dark:text-white text-[10px] md:text-sm font-normal font-['Open Sans'] leading-snug focus:outline-none duration-300 ${
                                        !open && "scale-0 md:transform-none"
                                    }`}
                                >
                                    {t("sidemenu.language")}
                                </button>
                                <div className='relative'>
                                    {mousenter === true && (
                                        <div
                                            className={` relative  ${
                                                props.locale === "en"
                                                    ? "absolute py-1 w-24 h-16 bg-blue-200 border rounded-xl shadow-xl "
                                                    : "relative  py-1 w-24 h-16 bg-blue-200 border rounded-xl shadow-xl "
                                            }`}
                                        >
                                            <ul>
                                                <li
                                                    className={`${
                                                        props.locale === "en"
                                                            ? "block w-full text-center mx-auto py-1 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                                            : "block w-full text-center mx-auto py-1 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
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
                                                        props.locale === "en"
                                                            ? "block w-full text-center mx-auto py-1 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
                                                            : "block w-full text-center mx-auto py-1 text-sm capitalize text-gray-800 hover:bg-orange-600 hover:text-white"
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
                            </div>
                            <Link href='/'>
                                <div
                                    className='p-4 rounded-lg justify-start items-center gap-1 inline-flex hover:text-white hover:bg-blue-400 active:bg-blue-700 focus:bg-blue-600'
                                    onClick={handleLogout}
                                >
                                    <div className=' w-6 h-4 relative'>
                                        <IoLogOutOutline size={20} />
                                    </div>
                                    <button className="text-[#333333]  dark:text-white text-[10px] md:text-sm font-normal font-['Open Sans'] leading-snug">
                                        <div
                                            className={`duration-300 ${
                                                !open &&
                                                "scale-0  md:transform-none"
                                            }`}
                                        >
                                            {t("sidemenu.Logout")}
                                        </div>
                                    </button>
                                </div>{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
