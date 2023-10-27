import Link from "next/link";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Zoom } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

export default function Slider() {
    const images = [
        "images/home/slider/image1.jpg",
        "images/home/slider/image2.jpg",
        "images/home/slider/image3.jpg",
    ];

    const zoomInProperties = {
        scale: 1,
        duration: 5000,
        transitionDuration: 300,
        infinite: true,
        prevArrow: (
            <div className='text-white md:p-6 '>
                {" "}
                <IoIosArrowBack size={40}></IoIosArrowBack>
            </div>
        ),
        nextArrow: (
            <div className='text-white md:p-6 '>
                {" "}
                <IoIosArrowForward size={40}></IoIosArrowForward>
            </div>
        ),
    };

    return (
        <div>
            <Zoom {...zoomInProperties}>
                {images.map((image, index) => (
                    <div key={index} className='top-0 each-fade'>
                        <div
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                            className='w-full h-screen flex items-center p-2 justify-center gap-2 md:gap-6 lg:gap-10'
                        >
                            <div className='p-4 px-32 relative w-full h-full flex-col justify-center text-center text-white mt-10 md:text-left lg:mt-40'>
                                <h1 className='text-2xl font-bold p-6'>
                                    You can help too!
                                </h1>
                                <p className='text-base lg:text-lg md:w-1/2 lg:w-1/3'>
                                    Please support our cause with a small
                                    donation today! People are dying from hanger
                                    and every dollar counts and brings us closer
                                    to our fundraising goal. Thank you for your
                                    generosity!
                                </p>
                                <div className='p-6 md:mx-4'>
                                    <button className='ml-2 text-[10px] px-[2px] py-[3px] w-[60px] bg-teal-500 dark:bg-purple-600 text-white md:py-[6px] md:px-[2px] md:text-[14px]  md:w-[100px] rounded hover:shadow-lg transform hover:scale-105'>
                                        <Link href='/meals'>Donate now</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Zoom>
        </div>
    );
}
