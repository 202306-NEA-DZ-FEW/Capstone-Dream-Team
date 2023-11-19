import React from "react";
import Modal from "./modal";

export default function Mealbar({ name, current_restaurant_Id, image }) {
    return (
        <div className='rounded-2xl p-4 border-2 flex items-center space-x-3'>
            <img className='w-14 h-14 rounded-full' src={image} />

            <div className='flex flex-row items-center justify-between w-full'>
                <span className='text-3xl font-[Changa] leading-relaxed'>
                    {name}
                </span>

                <span className='text-blue-950 text-xl font-bold leading-relaxed ml-auto'>
                    <Modal currentRestaurantId={current_restaurant_Id} />
                </span>
            </div>
        </div>
    );
}

// <div className='flex-col pl-50'>
//     {blogData.map((Donors, index) => (
//         <div className='mb-4' key={index}>
//             <div className='bg-neutral-100 rounded-full p-4 flex items-center space-x-3'>
//                 <img
//                     className='w-14 h-14 rounded-full'
//                     src='https://via.placeholder.com/56x56'
//                 />
//                 <div className='flex flex-row items-center space-x-60'>
//                     <div className='text-2xl font-normal font-Poppins leading-tight'>
//                         {Donors.Name}
//                     </div>
//                     <div className='text-2xl font-normal font-Poppins leading-tight'>
//                         {Donors.meal}
//                     </div>
//                     <div className='text-2xl font-normal font-Poppins leading-tight'>
//                         {Donors.numb_meal}
//                     </div>
//                     <div className='text-2xl font-normal font-Poppins leading-tight'>
//                         {Donors.price}
//                     </div>
//                     <div className='text-2xl font-normal font-Poppins leading-tight'>
//                         {Donors.DATE}
//                     </div>
//                     <button
//                         className={`rounded-xl text-white font-bold text-xl px-4 py-2 ${ Donors.numbmeal === 0 ? "bg-red-500" : "bg-green-500" }`}
//                         onClick={() => handleDecrement(index)}
//                     > {Donors.numbmeal}  </button>
//                 </div>
//             </div>{" "}
//         </div>
//     ))}
// </div>
