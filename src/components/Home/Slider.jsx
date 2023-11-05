import Link from "next/link";
import React from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { Zoom } from "react-slideshow-image";

// import "react-slideshow-image/dist/styles.css";

export default function Slider() {
    //     const images = [
    //         "images/home/slider/image3.jpg",
    //         "images/home/slider/image4.jpg"

    //     ];

    //     const zoomInProperties = {
    //         scale: 1,
    //         duration: 5000,
    //         transitionDuration: 300,
    //         infinite: true,
    //         prevArrow: (
    //             <div className='text-black md:p-6 '>
    //                 {" "}
    //                 <IoIosArrowBack size={40}></IoIosArrowBack>
    //             </div>
    //         ),
    //         nextArrow: (
    //             <div className='text-black md:p-6 '>
    //                 {" "}
    //                 <IoIosArrowForward size={40}></IoIosArrowForward>
    //             </div>
    //         ),
    //     };

    //     return (
    //         <div>
    //             <Zoom {...zoomInProperties}>
    //                 {images.map((image, index) => (
    //                     <div key={index} className='top-0 each-fade'>
    //                         <div
    //                             style={{
    //                                 backgroundImage: `url(${image})`,
    //                                 backgroundRepeat: "no-repeat",
    //                                 backgroundSize: "cover",
    //                             }}
    //                             className='w-full h-screen flex items-center p-2 justify-center gap-2 md:gap-6 lg:gap-10'
    //                         >
    //                             <div className='p-4 px-32 relative w-full h-full flex-col justify-center text-center text-black mt-10 md:text-left lg:mt-40'>
    //                                 <h1 className='text-2xl font-bold p-6'>
    //                                     You can help too!
    //                                 </h1>
    //                                 <p className='text-base lg:text-lg md:w-1/2 lg:w-1/3'>
    //                                     Please support our cause with a small
    //                                     donation today! People are dying from hanger
    //                                     and every dollar counts and brings us closer
    //                                     to our fundraising goal. Thank you for your
    //                                     generosity!
    //                                 </p>
    //                                 <div className='p-6 md:mx-4'>
    //                                     <button className='ml-2 text-[10px] px-[2px] py-[3px] w-[60px] bg-teal-500 dark:bg-[#32CD32] text-white md:py-[6px] md:px-[2px] md:text-[14px]  md:w-[100px] rounded hover:shadow-lg transform hover:scale-105'>
    //                                         <Link href='/meals'>Donate now</Link>
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </Zoom>
    //         </div>

    return (
        <main class='bg-white font-open-sans'>
            <div class='container mx-auto px-8 py-8 lg:py-10 relative flex flex-col lg:flex-row items-center'>
                <div class='lg:w-1/2  flex flex-col items-center lg:items-start'>
                    <h1 class='text-center lg:text-left text-3xl sm:text-5xl font-light text-blue-700 leading-tight mb-4'>
                        {" "}
                        We are on a mission to combat hunger
                        <strong class='mt-4 font-black text-3xl sm:text-4xl block'>
                            You can help too!
                        </strong>
                    </h1>
                    <p class='text-center lg:text-left sm:text-lg text-gray-500 lg:pr-40 leading-relaxed'>
                        Please support our cause with a small donation today!
                        People are dying from hanger and every dollar counts and
                        brings us closer to our fundraising goal. Thank you for
                        your generosity!.
                    </p>
                    <Link
                        href='/meals'
                        class='bg-orange-400 hover:bg-orange-600 mt-8 py-3 px-8 text-lg rounded-full font-bold uppercase text-white tracking-widest'
                    >
                        Donate Now
                    </Link>
                </div>
                <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                    <div class='w-1/2 sm:w-full  top-0 right-0 bottom-0 flex-col '>
                        <img
                            src='images/home/slider/Homeless man sitting on ground flat vector illustration.jpg'
                            alt='serve'
                            width='220px'
                        />
                        <img
                            src='images/home/slider/slider3.png'
                            alt='serve'
                            width='240px'
                        />
                    </div>
                    <div class='w-1/2 sm:w-full top-0 right-0 mt-16 '>
                        <img
                            src='images/home/slider/slider2.png'
                            alt='serve'
                            width='220px'
                        />
                        <img
                            src='images/home/slider/slider4.png'
                            alt='serve'
                            width='240px'
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
