import React, { useState } from "react";
import Modal from "./modal";
import { Fragment } from "react";

export default function Mealbar({ name, current_restaurant_Id }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Fragment>
            <div className='bg-cyan-50 rounded-lg p-4 relative'>
                <div className='bg-rose-100 rounded-lg p-4 space-y-3 flex justify-between'>
                    <span className='text-3xl font-bold font-Roboto leading-relaxed'>
                        {name}
                    </span>

                    <span className='text-xl font-Roboto leading-relaxed '>
                        <button
                            className='bg-blue-600 text-white active:bg-black hover:bg-black flex justify-center items-center gap-2
          font-bold px-6 h-12 rounded-md shadow hover:shadow-lg outline-none focus:outline-none'
                            type='button'
                            onClick={() => setShowModal(true)}
                        >
                            Show All Meals
                        </button>
                    </span>
                </div>
            </div>
            <Modal
                currentRestaurantId={current_restaurant_Id}
                isvisible={showModal}
                close={() => setShowModal(false)}
            />
        </Fragment>
    );
}
