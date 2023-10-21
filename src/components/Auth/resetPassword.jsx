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
        <div className='h-full flex items-center  '>
            <div className='p-8 rounded shadow-md w-96 ml-20 mr-20 mt-10 bg-black bg-opacity-40 hover:bg-opacity-60 '>
                <h1 className='text-2xl font-semibold mb-4 text-white'>
                    {t("signupPage.reset-password.title")}
                </h1>
                <div className='w-full h-[49.21px] justify-center items-center inline-flex border rounded border-gray-300 ring-indigo-200 mb-4 shadow'>
                    <div className='text-white text-sm leading-tight '>
                        {t("signupPage.reset-password.subtitle")}
                    </div>
                </div>
                <form onSubmit={handleResetPassword}>
                    <div className='mb-4 relative'>
                        <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400' />

                        <input
                            type='email'
                            placeholder={t("signupPage.email")}
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
                            {t("signupPage.reset-password.title")}
                        </button>
                    </div>
                </form>
                <div className='mb-6 flex text-sm text-white mt-2'>
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
                        message ===
                        "Password reset email sent. Check your inbox."
                            ? "text-teal-500"
                            : "text-red-500"
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
        </div>
    );
}

export default ResetPassword;
