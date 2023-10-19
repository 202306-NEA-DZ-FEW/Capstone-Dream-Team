import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsSun } from "react-icons/bs";
import { HiOutlineChartBarSquare, HiOutlineMoon } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaHistorySolid } from "react-icons/lia";
import { TbDeviceAnalytics } from "react-icons/tb";

import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import History from "./History";
import Meals from "./Meals";
import Settings from "./Settings";
import placeholderImage from "../images/placeholderImage.png";
import { auth, db } from "../util/firebase";

export default function Sidemenu(props) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const currentTheme = theme === "system" ? "light" : theme; // State for the current theme
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchInformation = async () => {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = { ...docSnap.data(), id: userId };
                    setUserData(userData);
                }

                setMounted(true);
            }
        };

        fetchInformation();
    }, []);

    if (!mounted) return null;

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <>
            <div className='w-[280px] h-[1033px] relative'>
                <div className='w-[260px] h-[1033px] px-6 pt-6 pb-8 left-0 top-0 absolute bg-[#BEEBDD]  dark:bg-black border-r border-green-200 flex-col justify-between items-start inline-flex'>
                    <div className='self-stretch h-[576px] flex-col justify-start items-start gap-11 flex'>
                        <div className='justify-start items-center gap-3 inline-flex'>
                            <Image
                                className='w-14 h-14 relative rounded-2xl'
                                src={placeholderImage}
                                width={56}
                                height={56}
                                alt='admin photo'
                            />
                            <div className='flex-col justify-center items-start inline-flex'>
                                <div className="w-[150px] text-zinc-950 dark:text-white text-base font-bold font-['Open Sans']">
                                    {userData ? userData.name : null}
                                </div>
                                <div className="w-[150px] text-neutral-800  dark:text-white text-sm font-normal font-['Open Sans']">
                                    {userData ? userData.email : null}
                                </div>
                            </div>
                        </div>
                        <div className='h-14 p-4 bg-neutral-100 rounded-2xl flex-col justify-center items-start gap-2.5 flex'>
                            <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                <div className='w-6 h-6 relative'>
                                    <div className='w-3.5 h-3.5 left-[4px] top-[4px] absolute rounded-full border border-zinc-800' />
                                </div>
                                <div className="w-[146px] text-zinc-800 text-base font-normal font-['Open Sans'] leading-snug">
                                    Search...
                                </div>
                            </div>
                        </div>
                        <div className='flex-col justify-start items-start gap-6 flex'>
                            <div className='p-4  active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                                <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                    <div className='w-6 h-6 relative'>
                                        <AiOutlineHome
                                            style={{ display: "inline" }}
                                        />
                                    </div>
                                    <button
                                        className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                        onClick={() =>
                                            props.handleClick(<Dashboard />)
                                        }
                                    >
                                        Dashboard
                                    </button>
                                </div>
                            </div>
                            <div className='p-4  active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                                <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                    <div className='w-6 h-6 relative'>
                                        <div className='w-[18px] h-[18px] left-[3px] top-[3px] absolute ' />
                                        <HiOutlineChartBarSquare
                                            style={{ display: "inline" }}
                                        />
                                    </div>
                                    <button
                                        className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                        onClick={() =>
                                            props.handleClick(<Meals />)
                                        }
                                    >
                                        Meals/Coupons
                                    </button>
                                </div>
                            </div>
                            <div className='p-4  active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                                <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                    <div className='w-6 h-6 relative'>
                                        <LiaHistorySolid
                                            style={{ display: "inline" }}
                                        />
                                    </div>
                                    <button
                                        className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                        onClick={() =>
                                            props.handleClick(<History />)
                                        }
                                    >
                                        History
                                    </button>
                                </div>
                            </div>
                            <div className='p-4   active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                                <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                    <div className='w-6 h-6 relative'>
                                        <TbDeviceAnalytics
                                            className=' dark:stroke-white'
                                            style={{ display: "inline" }}
                                        />
                                    </div>
                                    <button
                                        className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                        onClick={() =>
                                            props.handleClick(<Analytics />)
                                        }
                                    >
                                        Analytics
                                    </button>
                                </div>
                            </div>
                            <div className='p-4  active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                                <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                    <div className='w-6 h-6 relative'>
                                        <AiOutlineSetting
                                            style={{ display: "inline" }}
                                        />
                                    </div>
                                    <button
                                        className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                        onClick={() =>
                                            props.handleClick(<Settings />)
                                        }
                                    >
                                        Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='self-stretch h-[120px] flex-col justify-start items-start gap-2 flex'>
                        <div className='p-4  active:bg-[#97E5EF] rounded-lg flex-col justify-start items-start gap-2.5 flex'>
                            <div className='w-[186px] h-6 justify-start items-center gap-4 inline-flex'>
                                <div className='w-6 h-6 relative'>
                                    <IoLogOutOutline />
                                </div>
                                <button
                                    className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug"
                                    onClick={handleLogout}
                                >
                                    <Link href='/'>Logout</Link>
                                </button>
                            </div>
                        </div>
                        <div className='self-stretch pl-4 py-3 rounded-lg justify-between items-center inline-flex'>
                            <div className='w-[124px] justify-start items-center gap-4 flex'>
                                <div className='w-6 h-6 relative'>
                                    <div>
                                        {" "}
                                        {currentTheme === "dark" ? (
                                            <HiOutlineMoon
                                                style={{ display: "inline" }}
                                            ></HiOutlineMoon>
                                        ) : (
                                            <BsSun
                                                style={{ display: "inline" }}
                                            ></BsSun>
                                        )}
                                    </div>
                                    <div className='w-[0px] h-5 left-[12px] top-[2px] absolute'></div>
                                    <div className='origin-top-left rotate-90 w-[0px] h-5 left-[22px] top-[12px] absolute'></div>
                                    <div className='origin-top-left rotate-[-135deg] w-[0px] h-5 left-[4.93px] top-[19.07px] absolute'></div>
                                    <div className='origin-top-left -rotate-45 w-[0px] h-5 left-[4.93px] top-[4.93px] absolute'></div>
                                </div>
                                <div className="text-zinc-950  dark:text-white text-base font-normal font-['Open Sans'] leading-snug">
                                    {currentTheme === "dark" ? "dark" : "light"}{" "}
                                    mode
                                </div>
                            </div>
                            {currentTheme === "light" ? (
                                <label
                                    htmlFor='check'
                                    className='w-12 h-7 rounded-full relative bg-white  cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        id='check'
                                        className='sr-only '
                                        onClick={() => setTheme("dark")}
                                    />
                                    <span className='w-2/5 h-4/5 top-1 left-1 rounded-full bg-[#E9B824] absolute flex justify-center items-center'></span>
                                </label>
                            ) : (
                                <label
                                    htmlFor='check'
                                    className='w-12 h-7 rounded-full relative bg-white  cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        id='check'
                                        className='sr-only peer'
                                        onClick={() => setTheme("light")}
                                    />
                                    <span className='w-2/5 h-4/5 top-1 left-6 rounded-full bg-black absolute flex justify-center items-center'></span>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
