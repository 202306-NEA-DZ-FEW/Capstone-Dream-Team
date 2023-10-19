import React, { useState, useEffect } from "react";
import { db } from "../util/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Historycard() {
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const response = collection(db, "blogs");
        const data = await getDocs(response);
        data.docs.forEach((item) => {
            setBlogs([...blogs, item.data()]);
        });
    };
    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <div className='App'>
            {blogs &&
                blogs.map((blog, index) => {
                    return (
                        <div key={index}>
                            <div className='bg-neutral-100 rounded-full p-4 flex items-center space-x-3'>
                                <img
                                    className='w-14 h-14 rounded-full'
                                    src='https://via.placeholder.com/56x56'
                                />

                                <div className='flex flex-row items-center space-x-60'>
                                    <div className='text-2xl font-normal font-Poppins leading-tight'>
                                        {" "}
                                        {blog.title}
                                    </div>
                                    <div className='text-2xl font-normal font-Poppins leading-tight'>
                                        {" "}
                                        {blog.body}
                                    </div>
                                    <div className='text-2xl font-normal font-Poppins leading-tight'>
                                        Qty
                                    </div>
                                    <div className='text-2xl font-normal font-Poppins leading-tight'>
                                        ($$$$$$$)
                                    </div>
                                    <div className='text-2xl font-normal font-Poppins leading-tight'>
                                        JJ/MM/YYYY
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );

    // return (
    //   <div >
    //     <div className="bg-neutral-100 rounded-full p-4 flex items-center space-x-3">
    //       <img className="w-14 h-14 rounded-full" src="https://via.placeholder.com/56x56" />

    //       <div className="flex flex-row items-center space-x-60">
    //         <div className="text-2xl font-normal font-Poppins leading-tight"> name </div>
    //         <div className="text-2xl font-normal font-Poppins leading-tight"> meal</div>
    //         <div className="text-2xl font-normal font-Poppins leading-tight">Qty</div>
    //         <div className="text-2xl font-normal font-Poppins leading-tight">($$$$$$$)</div>
    //         <div className="text-2xl font-normal font-Poppins leading-tight">JJ/MM/YYYY</div>
    //       </div>
    //     </div>

    //   </div>

    // );
}
