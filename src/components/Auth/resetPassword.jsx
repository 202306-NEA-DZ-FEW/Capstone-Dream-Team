import React, { useState } from "react";
import { auth } from "@/util/firebase";
import { FaEnvelope } from "react-icons/fa";
import { useTranslation } from "next-i18next";

function ResetPassword({ updateComponent }) {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const success = "Password reset email sent. Check your inbox.";
    const failure = "Error sending password reset email. Please try again.";
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await auth.sendPasswordResetEmail(email);

            setMessage(success);
        } catch (error) {
            setMessage(failure);
        }
    };

    return (
        <div
            className='flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10'
        >
            <h1 className='w-full text-4xl  text-center leading-snug  mb-4'>
                {t("signupPage.reset-password.title")}
            </h1>
            <div className='w-full h-[49.21px] justify-center items-center inline-flex border rounded border-gray-300 ring-indigo-200 mb-4 shadow'>
                <div className='text-black text-m leading-tight '>
                    {t("signupPage.reset-password.subtitle")}
                </div>
            </div>
            <form
                onSubmit={handleResetPassword}
                className='w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8'
            >
                <div className='relative'>
                    <p
                        class='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute'
                    >
                        {t("signupPage.email")}
                    </p>
                    <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />

                    <input
                        type='email'
                        placeholder='123@ex.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border placeholder-gray-400 focus:outline-none
                            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                            border-gray-300 rounded-md pl-8'
                    />
                </div>

                <div>
                    <button
                        type='submit'
                        className='w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                            rounded-lg transition duration-200 hover:bg-indigo-600 ease'
                    >
                        {t("signupPage.reset-password.title")}
                    </button>
                </div>
            </form>
            <div className='mb-6 flex text-m text-black mt-2'>
                <p>{t("signupPage.signUp.subtitle.first")} </p>
                <span
                    className='ml-1 underline cursor-pointer'
                    onClick={() => updateComponent("SignIn")}
                >
                    {" "}
                    {t("signupPage.signUp.subtitle.second")}
                </span>
            </div>
            <div
                className={
                    message === "Password reset email sent. Check your inbox."
                        ? "text-teal-500 text-center justify-center"
                        : "text-red-500 text-center justify-center"
                }
            >
                {message && (
                    <p>
                        {message === success
                            ? t("signupPage.reset-password.successMessage")
                            : t("signupPage.reset-password.failureMessage")}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
