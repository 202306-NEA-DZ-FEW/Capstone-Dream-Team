import React from "react";

export default function StatCard(props) {
    const { icon, title, number } = props;
    return (
        <div className='flex flex-col px-5 py-6 shadow-sm rounded-md border border-orange-100 bg-orange-50'>
            <div className='flex'>
                <div className='flex items-center h-11 w-11 justify-center p-3 rounded-full bg-orange-400 bg-opacity-80'>
                    <div className='text-2xl text-white'>{icon}</div>
                </div>

                <div className='mx-2'>
                    <h4 className='text-2xl font-bold text-gray-700 p-1'>
                        {number}
                    </h4>
                </div>
            </div>
            <div className='text-gray-500 overflow-hidden whitespace-nowrap text-base break-words pt-2'>
                {title}
            </div>
        </div>
    );
}
