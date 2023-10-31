import React from "react";
import Modal from "./modal";

export default function Mealbar({ name, current_restaurant_Id }) {
    return (
        <div className='bg-cyan-50 rounded-lg p-4 relative'>
            <div className='bg-rose-100 rounded-lg p-4 space-y-3 flex justify-between'>
                <span className='text-3xl font-bold font-Roboto leading-relaxed'>
                    {name}
                </span>

                <span className='text-xl font-Roboto leading-relaxed '>
                    <Modal currentRestaurantId={current_restaurant_Id} />
                </span>
            </div>
        </div>
    );
}
