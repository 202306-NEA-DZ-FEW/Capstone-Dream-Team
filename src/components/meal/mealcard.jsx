import React from "react";

export default function Mealcard({ mealId, price, maxQuantity, description }) {
    return (
        <div className='w-80 h-96 relative'>
            <div className='w-80 h-96 left-0 top-0 absolute bg-red-700 shadow' />
            <div className='w-80 h-96 left-0 top-[92px] absolute bg-white rounded-3xl shadow' />
            <div className="left-[14px] top-[393px] absolute text-black text-base font-medium font-['Roboto']">
                {maxQuantity}{" "}
            </div>
            <div className="left-[238px] top-[393px] absolute text-black text-base font-medium font-['Roboto']">
                {description}
            </div>
            <div className="left-[76px] top-[256px] absolute text-black text-2xl font-bold font-['Roboto']">
                {mealId}
            </div>
            <div className="left-[108px] top-[291px] absolute text-neutral-400 text-lg font-semibold font-['Roboto']">
                {price}
            </div>
            <div className='w-72 h-px left-[7px] top-[339px] absolute border-2 border-neutral-400 border-opacity-20'></div>
            <div className="left-[14px] top-[355px] absolute text-neutral-400 text-base font-medium font-['Roboto']">
                max Quantity
            </div>
            <div className="left-[251px] top-[355px] absolute text-neutral-400 text-base font-medium font-['Roboto']">
                description
            </div>
            <img
                className='w-60 h-60 left-[40px] top-0 absolute'
                src='https://via.placeholder.com/235x235'
            />
        </div>
    );
}
