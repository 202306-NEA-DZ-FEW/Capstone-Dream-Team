import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "@/util/firebase";

const StatCard = () => {
    const [totalDonors, setTotalDonors] = useState(0);
    const fetchData = async () => {
        const q = query(
            collection(db, "donor"),
            where("restaurant_id", "==", 3)
        );
        const querySnapshot = await getDocs(q);
        const totalDonorsCount = querySnapshot.size;
        setTotalDonors(totalDonorsCount);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='m-6'>
            <div className='flex flex-wrap -mx-6'>
                <div className='w-full px-6 sm:w-1/2 xl:w-1/3'>
                    <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100'>
                        <div className='flex items-center justify-center p-3 rounded-full bg-green-600 bg-opacity-75'>
                            <svg
                                className='h-10 w-10 text-white'
                                viewBox='0 0 23 25'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                            >
                                <path
                                    d='M11.415 12.393l1.868-2.289c.425-.544.224-.988-.055-2.165-.205-.871-.044-1.854.572-2.5 1.761-1.844 5.343-5.439 5.343-5.439l.472.37-3.693 4.728.79.617 3.87-4.59.479.373-3.558 4.835.79.618 3.885-4.58.443.347-3.538 4.85.791.617 3.693-4.728.433.338s-2.55 4.36-3.898 6.535c-.479.771-1.425 1.161-2.334 1.167-1.211.007-1.685-.089-2.117.464l-2.281 2.795c2.445 2.962 4.559 5.531 5.573 6.829.771.987.065 2.421-1.198 2.421-.420 0-.853-.171-1.167-.573l-8.36-10.072s-.926.719-1.944 1.518c-3.172-5.184-6.267-11.661-6.267-13.955 0-.128-.034-.924.732-.924.245 0 .493.116.674.344.509.642 5.415 6.513 10.002 12.049m-2.952 3.617l1.953 2.365-4.115 5.055c-.295.378-.736.576-1.182.576-1.198 0-1.991-1.402-1.189-2.428l4.533-5.568z'
                                    fill='currentColor'
                                />
                            </svg>
                        </div>

                        <div className='mx-5'>
                            <h4 className='text-2xl font-semibold text-gray-700'>
                                4644
                            </h4>
                            <div className='text-gray-500'>Donated Meals</div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                    <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100'>
                        <div className='p-3 rounded-full bg-green-600 bg-opacity-75'>
                            <svg
                                className='h-10 w-10 text-white'
                                viewBox='0 0 25 25'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z'
                                    fill='currentColor'
                                />
                            </svg>
                        </div>

                        <div className='mx-5'>
                            <h4 className='text-2xl font-semibold text-gray-700'>
                                {totalDonors}
                            </h4>
                            <div className='text-gray-500'>Total Donors</div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0'>
                    <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100'>
                        <div className='p-3 rounded-full bg-green-600 bg-opacity-75'>
                            <svg
                                className='h-10 w-10 text-white'
                                viewBox='0 0 23 25'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fill='currentColor'
                                    d='M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z'
                                />
                            </svg>
                        </div>

                        <div className='mx-5'>
                            <h4 className='text-2xl font-semibold text-gray-700'>
                                678
                            </h4>
                            <div className='text-gray-500'>Active Meals</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
