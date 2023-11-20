import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../util/firebase";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import SignInWithGoogleButton from "./buttons/googleSignInButton";
import { useTranslation } from "next-i18next";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();

const SignIn = ({ updateComponent }) => {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.push("/admin-dashboard");
            })
            .catch((error) => {
                toast.error(`${t("signupPage.signIn.wronginfos")}`);
            });
    };

    // Sign up with google
    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);

            const userId = userCredential?.user?.uid;
            router.push("/admin-dashboard");
        } catch {
            (error) => {
                toast.error(`${t("signupPage.signUp.try-again")}`);
            };
        }
    };

    return (
        <div
            className='flex flex-col h-1/2 items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10'
        >
            <h1 className='w-full text-4xl  text-center leading-snug '>
                {t("signupPage.signIn.title")}
            </h1>
            <div className='mb-2 flex text-m text-black  '>
                <p>{t("signupPage.signIn.subtitle.first")} </p>
                <span
                    className='ml-1 cursor-pointer underline'
                    onClick={() => updateComponent("SignUp")}
                >
                    {" "}
                    {t("signupPage.signIn.subtitle.second")}{" "}
                </span>
            </div>
            <form
                onSubmit={handleSignIn}
                className='w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8'
            >
                <div className='relative'>
                    <p
                        className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute'
                    >
                        {t("signupPage.email")}
                    </p>
                    <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        placeholder={t("signupPage.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border placeholder-gray-400 focus:outline-none
                            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                            border-gray-300 rounded-md pl-8'
                        required
                    />
                </div>
                <div className='relative'>
                    <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>
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
                        required
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                            rounded-lg transition duration-200 hover:bg-indigo-600 ease'
                    >
                        {t("signupPage.signIn.title")}
                    </button>
                </div>
            </form>
            <div className='mb-6 block text-gray-600 mt-2'>
                <label
                    className='block text-orange-600 text-sm underline cursor-pointer'
                    onClick={() => updateComponent("ResetPassword")}
                >
                    {t("signupPage.signIn.subtitle2")}
                </label>
            </div>

            <div className='mb-6 block text-gray-600 mt-2 w-full'>
                <SignInWithGoogleButton signInWithGoogle={signInWithGoogle} />
            </div>
        </div>
    );
};

export default SignIn;
