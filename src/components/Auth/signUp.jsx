import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUtensils } from "react-icons/fa";

import SignUpWithGoogleButton from "./buttons/googleSignUpButton";
import { auth, db } from "../../util/firebase";

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
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (password !== passConfirm) {
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
        } catch (error) {
            alert("Error, please try again");
            console.log(error);
        }
    };

    //Function to handle name change
    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);
    };

    // Sign up with Google
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
        } catch (error) {
            alert("Error, please try again");
        }
    };

    return (
        <div
            className='flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10 '
        >
            <p className='w-full text-4xl  text-center leading-snug '>
                {t("signupPage.signUp.title")}
            </p>
            <div className='mb-2 flex text-m text-black  '>
                <p>{t("signupPage.signUp.subtitle.first")}</p>
                <span
                    className='ml-1 underline cursor-pointer'
                    onClick={() => updateComponent("SignIn")}
                >
                    {" "}
                    {t("signupPage.signUp.subtitle.second")}
                </span>
            </div>
            <form
                onSubmit={handleSignUp}
                className='w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8'
            >
                <div className='relative'>
                    <p
                        class='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute'
                    >
                        {t("signupPage.signUp.name")}
                    </p>
                    <FaUtensils className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                    <input
                        type='text'
                        id='name'
                        name='username'
                        placeholder={t("signupPage.signUp.name")}
                        value={name}
                        onChange={handleNameChange}
                        className='border placeholder-gray-400 focus:outline-none
                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                        border-gray-300 rounded-md pl-8'
                        required
                    />
                </div>
                <div className='relative'>
                    <p class='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>
                        {t("signupPage.email")}
                    </p>
                    <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        placeholder='123@ex.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border placeholder-gray-400 focus:outline-none
                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                        border-gray-300 rounded-md pl-8'
                        required
                    />
                </div>
                <div className='relative'>
                    <p
                        class='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute'
                    >
                        {t("signupPage.password")}
                    </p>
                    <FaLock className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder={t("signupPage.password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border placeholder-gray-400 focus:outline-none
                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                        border-gray-300 rounded-md pl-8'
                        minLength='6' // Minimum length requirement
                        required
                    />
                </div>
                <div className='relative'>
                    <p
                        class='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute'
                    >
                        {t("signupPage.signUp.confirm-password")}
                    </p>
                    <FaLock className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                    <input
                        type='password'
                        id='confirmpass'
                        name='password'
                        placeholder={t("signupPage.signUp.confirm-password")}
                        value={passConfirm}
                        onChange={(e) => setPassConfirm(e.target.value)}
                        className='border placeholder-gray-400 focus:outline-none
                        focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                        border-gray-300 rounded-md pl-8'
                        minLength='6' // Minimum length requirement
                        required
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                        rounded-lg transition duration-200 hover:bg-indigo-600 ease'
                    >
                        {t("signupPage.signUp.title2")}
                    </button>
                </div>
            </form>
            <div className='mb-6 block text-gray-600 mt-2 w-full'>
                <SignUpWithGoogleButton signUpWithGoogle={signUpWithGoogle} />
            </div>
        </div>
    );
};

export default SignUp;
