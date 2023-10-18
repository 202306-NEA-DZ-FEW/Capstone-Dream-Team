import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../util/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        if (password != passConfirm) {
            alert("Please confirm your password");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userId = userCredential?.user?.uid;

            const userDocRef = collection(db, "users");
            await setDoc(doc(userDocRef, userId), {
                name: name,
                email: email,
                uid: userId,
                // Add other user-related data as needed
            });

            return userCredential;
        } catch {
            (error) => {
                alert("Error, please try again");
            };
        }
    };

    //Function to hundle name change
    const handleNameChange = (e) => {
        const inputValue = e.target.value;

        // Define a regular expression to allow only letters, spaces, and hyphens
        const regex = /^[a-zA-Z\s-]*$/;

        if (regex.test(inputValue)) {
            // Input is valid, update the name state
            setName(inputValue);
        }
        // If the input contains special characters, do nothing (prevent input)
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='bg-purple p-8 rounded shadow-md w-96'>
                <h1 className='text-2xl font-semibold mb-4'>Create Account</h1>
                <form onSubmit={handleSignUp}>
                    <div className='mb-4 relative'>
                        <FaUtensils className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                        <input
                            type='text'
                            id='name'
                            name='username'
                            placeholder='Name of Restaurent'
                            value={name}
                            onChange={handleNameChange}
                            className='w-full pl-8 pr-2 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300'
                            required
                        />
                    </div>
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
                            minLength='6' // Minimum length requirement
                            required
                        />
                    </div>
                    <div className='mb-6 relative'>
                        <FaLock className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />

                        <input
                            type='password'
                            id='confirmpass'
                            name='password'
                            placeholder=' Confirm Your Password'
                            value={passConfirm}
                            onChange={(e) => setPassConfirm(e.target.value)}
                            className='w-full pl-8 pr-2 py-2 rounded border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300'
                            minLength='6' // Minimum length requirement
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105 '
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
