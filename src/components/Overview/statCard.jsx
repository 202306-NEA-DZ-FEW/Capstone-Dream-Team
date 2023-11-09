import React from "react";

export default function StatCard(props) {
    const { icon, title, number } = props;
    return (
        <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100'>
            <div className='flex items-center justify-center p-3 rounded-full bg-blue-600 bg-opacity-75'>
                <div className='text-2xl text-white'>{icon}</div>
            </div>

            <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700'>
                    {number}
                </h4>
                <div className='text-gray-500 overflow-hidden whitespace-nowrap text-base break-words'>
                    {title}
                </div>
            </div>
        </div>
    );
}
