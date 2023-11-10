import React from "react";
export default function Goals() {
    const images = [
        {
            url: "images/home/Goals/noPoverty.png",
            title: "Eradicate Poverty",
            text: "We aim to reduce poverty by ensuring that individuals and families in need have access to nutritious meals, regardless of their financial circumstances. Through your generous contributions, we strive to improve the lives of those facing economic hardship",
        },
        {
            url: "images/home/Goals/zeroHunger.png",
            title: "Zero Hunger",
            text: "Our mission is to eliminate hunger by providing regular access to wholesome and nourishing meals for those who are food-insecure. We encourage community participation and volunteering to create a lasting impact on food accessibility.",
        },
        {
            url: "images/home/Goals/health.png",
            title: "Promote Good Health",
            text: "At Buy Me a Meal, we are on a mission to provide nutrition to prevent bad health and combat diseases caused by malnutrition",
        },
    ];

    return (
        <div className='w-full h-full flex-col mt-6 p-6 justify-center  text-center'>
            <h1 className='font-bold mr-6 text-2xl sm:text-3xl lg:text-4xl text-[#192655] '>
                Our Goals{" "}
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 w-full h-full   '>
                {images.map((image, index) => (
                    <div
                        key={index}
                        class=' w-full h-2/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20'
                    >
                        <div class='flex justify-center md:justify-end -mt-16'>
                            <img
                                class='w-20 h-20 object-cover rounded-full border-2 border-indigo-500'
                                src={image.url}
                                alt='step'
                            />
                        </div>
                        <div>
                            <h2 class='text-gray-800 text-3xl font-semibold'>
                                {image.title}
                            </h2>
                            <p class='mt-2 text-gray-600 h-full'>
                                {image.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
