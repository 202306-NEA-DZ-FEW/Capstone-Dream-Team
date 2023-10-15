import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../util/firebase";
import { useRouter } from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='bg-purple p-8 rounded shadow-md w-96'>
                <h1 className='text-2xl font-semibold text-accent mb-4'>
                    Create Account
                </h1>
                <form onSubmit={handleSignUp}>
                    <div className='mb-4'>
                        <label
                            htmlFor='username'
                            className='block text-gray-600'
                        >
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='password'
                            className='block text-gray-600'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            minLength='6' // Minimum length requirement
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-purple-300 text-accent py-2 px-4 rounded hover:bg-purple-400'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
