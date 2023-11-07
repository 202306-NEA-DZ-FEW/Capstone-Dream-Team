import Link from "next/link";
import React from "react";

export default function Slider() {
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
                <div class=''>
                    <img src='images/home/slider/slider3.png' alt='helping' />
                </div>
            </div>
        </main>
    );
}
