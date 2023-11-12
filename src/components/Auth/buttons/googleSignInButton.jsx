import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "next-i18next";

const SignInWithGoogleButton = ({ signInWithGoogle }) => {
    const { t } = useTranslation("common");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='inline-block w-full p-2 border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-indigo-500 cursor-pointer relative bg-white text-center '
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className='flex items-center space-x-2 justify-center  '
                onClick={signInWithGoogle}
            >
                <div className='w-6 h-6  '>
                    <FcGoogle size={24} />
                </div>
                <span
                    className={`text-md font-semibold rounded ${
                        isHovered && "text-white"
                    }`}
                >
                    {t("signupPage.buttons.first")}
                </span>
            </div>
        </div>
    );
};

export default SignInWithGoogleButton;
