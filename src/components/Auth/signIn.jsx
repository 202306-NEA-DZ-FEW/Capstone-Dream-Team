import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../util/firebase";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
                alert("Wrong Email Or Password Please Enter Valid Information");
            });
    };

    return (
        <div className='h-full flex items-center justify-center '>
            <div className='p-8 rounded shadow-md w-96'>
                <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className='mb-4 relative'>
                        <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-8 pr-2 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300'
                            required
                        />
                    </div>
                    <div className='mb-6 relative'>
                        <FaLock className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-8 pr-2 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300'
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105'
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className='mb-6 block text-gray-600 mt-2'>
                    <label className='block text-orange-600 text-sm'>
                        I forgot my password
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
