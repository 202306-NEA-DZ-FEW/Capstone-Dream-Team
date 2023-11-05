//import Mealcard from "./mealcard";
//import { collection, query, getDocs, where } from "firebase/firestore";
//import { db } from "../../util/firebase"; // Replace with your Firebase config import
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

{
    /* this compo must be imported in the card component so it popup once the Donate button is clicked */
}

const Checkout = ({ Total }) => {
    const { t } = useTranslation("common");

    const [isModalVisible, setModalVisible] = useState(false);
    const hideModal = () => {
        setModalVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <div>
            {/* Modal toggle : must be donate button from the mouloud component !!!! */}
            <button
                className='transition-colors text-sm bg-teal-500 hover:bg-purple-700 p-2 rounded-sm w-full text-white text-hover shadow-md'
                onClick={toggleModal}
            >
                DONATE NOW
            </button>

            {/* Main modal */}
            {isModalVisible && (
                <div
                    id='default-modal'
                    tabIndex='-1'
                    aria-hidden='true'
                    className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
                >
                    <div className='relative w-full max-h-full'>
                        {/* Modal content */}
                        <div className='relative bg-white border-4 border-blue-500 rounded-lg shadow dark:bg-gray-700'>
                            {/* TITLE & HIDE X */}
                            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    Checkout
                                </h3>
                                <button
                                    type='button'
                                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white'
                                    data-modal-hide='default-modal'
                                    onClick={hideModal}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 14 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className='p-6 space-y-6'>
                                <div className='pb-10 pt-5 flex justify-center items-center'>
                                    <div className='leading-loose'>
                                        <form className='max-w-xl m-4 p-10 bg-white rounded shadow-xl'>
                                            <p className='text-gray-800 font-medium'>
                                                Customer information
                                            </p>
                                            <div className=''>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_name'
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    className='w-full px-5 py-1 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_name'
                                                    name='cus_name'
                                                    type='text'
                                                    required=''
                                                    placeholder='Your Name'
                                                    aria-label='Name'
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className='w-full px-5 py-4 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder='Your Email'
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder='Street'
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='hidden text-sm block text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    City
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder='City'
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='inline-block mt-2 w-1/2 pr-1'>
                                                <label
                                                    className='hidden block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    Country
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder='Country'
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='inline-block mt-2 -mx-1 pl-1 w-1/2'>
                                                <label
                                                    className='hidden block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    Zip
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder='Zip'
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <p className='mt-4 text-gray-800 font-medium'>
                                                Payment information
                                            </p>
                                            <div className=''>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_name'
                                                >
                                                    Card
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_name'
                                                    name='cus_name'
                                                    type='text'
                                                    required=''
                                                    placeholder='Card Number MM/YY CVC'
                                                    aria-label='Name'
                                                />
                                            </div>
                                            <div className='mt-4'>
                                                <button
                                                    className='px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded'
                                                    type='submit'
                                                >
                                                    ${Total}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
