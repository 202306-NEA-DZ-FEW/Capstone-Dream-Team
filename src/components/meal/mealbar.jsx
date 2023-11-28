import React from "react";
import Modal from "./modal";

export default function Mealbar({ name, current_restaurant_Id, image }) {
    return (
        <div className='rounded-2xl p-4 border-2 flex justify-between items-center w-full '>
            <div className='flex items-center justify-between space-x-3'>
                <img className='w-14 h-14 rounded-full' src={image} />
                <div className='text-3xl font-[Changa] text-blue-700 leading-relaxed'>
                    {name}
                </div>
            </div>
            <div className='text-blue-950 text-xl font-bold leading-relaxed '>
                <Modal currentRestaurantId={current_restaurant_Id} />
            </div>
        </div>
    );
}
