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
                alert("Wrong Email Or Password Please Enter Valid Information");
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
                alert("Error, please try again");
            };
        }
    };

    return (
        <div className='h-full flex items-center '>
            <div className='p-8 rounded shadow-md w-96 ml-20 mr-20 mt-10 bg-black bg-opacity-40 hover:bg-opacity-60 '>
                <h1 className='text-2xl font-semibold mb-4 text-white'>
                    {t("signupPage.signIn.title")}
                </h1>
                <div className='mb-6 flex text-sm text-white'>
                    <p>{t("signupPage.signIn.subtitle.first")} </p>
                    <span
                        className='ml-1 cursor-pointer underline'
                        onClick={() => updateComponent("SignUp")}
                    >
                        {" "}
                        {t("signupPage.signIn.subtitle.second")}{" "}
                    </span>
                </div>
                <form onSubmit={handleSignIn}>
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
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-teal-500 text-white py-2 px-4 rounded hover:shadow-lg transform hover:scale-105'
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

                <div className='mb-6 block text-gray-600 mt-2'>
                    <SignInWithGoogleButton
                        signInWithGoogle={signInWithGoogle}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
