import React from "react";

export default function Mealbar({ name }) {
    return (
        <div className='bg-cyan-50 rounded-lg p-4 relative'>
            <div className='bg-rose-100 rounded-lg p-4 space-y-3 flex justify-between'>
                <span className='text-3xl font-bold font-Roboto leading-relaxed'>
                    {name}
                </span>

                <span className='text-xl font-Roboto leading-relaxed '>
                    <button>Show All Meals</button>
                </span>
            </div>
        </div>
    );
}
