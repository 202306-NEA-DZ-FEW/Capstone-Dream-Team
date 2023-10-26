import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../util/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";
import SignUpWithGoogleButton from "./buttons/googleSignUpButton";
import { useTranslation } from "next-i18next";

const provider = new GoogleAuthProvider();

const SignUp = ({ updateComponent }) => {
    const { t } = useTranslation("common");
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
            //console.log(userCredential);
            router.push("/admin-dashboard");

            const userDocRef = collection(db, "restaurant");
            await setDoc(doc(userDocRef, userId), {
                restaurantName: name,
                email: email,
                restaurantId: userId,
                // Add other user-related data as needed
            });
            // Update profile name
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
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

    // Sign up with google
    const signUpWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);

            const userId = userCredential?.user?.uid;

            router.push("/admin-dashboard");

            const userDocRef = collection(db, "restaurant");
            await setDoc(doc(userDocRef, userId), {
                restaurantName: userCredential.user.displayName,
                email: userCredential.user.email,
                restaurantId: userId,
                // Add other user-related data as needed
            });
        } catch {
            (error) => {
                alert("Error, please try again");
            };
        }
    };

    return (
        <div className='flex items-center  '>
            <div className=' p-8 rounded shadow-md w-96 ml-20 mr-20 mt-10 bg-black bg-opacity-40 hover:bg-opacity-60 '>
                <h1 className='text-2xl font-semibold mb-4 text-white'>
                    {t("signupPage.signUp.title")}
                </h1>
                <div className='mb-6 flex text-sm text-white'>
                    <p>{t("signupPage.signUp.subtitle.first")}</p>
                    <span
                        className='ml-1 underline cursor-pointer'
                        onClick={() => updateComponent("SignIn")}
                    >
                        {" "}
                        {t("signupPage.signUp.subtitle.second")}
                    </span>
                </div>
                <form onSubmit={handleSignUp}>
                    <div className='mb-4 relative'>
                        <FaUtensils className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                        <input
                            type='text'
                            id='name'
                            name='username'
                            placeholder={t("signupPage.signUp.name")}
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
                            placeholder={t("signupPage.email")}
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
                            placeholder={t("signupPage.password")}
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
                            placeholder={t(
                                "signupPage.signUp.confirm-password"
                            )}
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
                            {t("signupPage.signUp.title2")}
                        </button>
                    </div>
                </form>
                <div className='mb-6 block text-gray-600 mt-2'>
                    <SignUpWithGoogleButton
                        signUpWithGoogle={signUpWithGoogle}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
