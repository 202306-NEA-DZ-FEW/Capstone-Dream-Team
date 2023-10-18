import React, { useState } from "react";
import { auth } from "@/util/firebase";
import { FaEnvelope } from "react-icons/fa";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await auth.sendPasswordResetEmail(email);
            setMessage("Password reset email sent. Check your inbox.");
        } catch (error) {
            setMessage("Error sending password reset email. Please try again.");
        }
    };

    return (
        <div className='h-full flex items-center justify-center '>
            <div className='p-8 rounded shadow-md w-96'>
                <h1 className='text-2xl font-semibold mb-4'>
                    Reset Your Password
                </h1>
                <div className='w-full h-[49.21px] justify-center items-center inline-flex border rounded border-gray-300 ring-indigo-200 mb-4 shadow'>
                    <div className='text-gray-800 text-sm leading-tight'>
                        Write your e-mail to request password reset
                    </div>
                </div>
                <form onSubmit={handleResetPassword}>
                    <div className='mb-4 relative'>
                        <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />

                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-8 pr-2 py-2 border rounded border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300'
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='w-full bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105'
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div>{message && <p>{message}</p>}</div>
            </div>
        </div>
    );
}

export default ResetPassword;
