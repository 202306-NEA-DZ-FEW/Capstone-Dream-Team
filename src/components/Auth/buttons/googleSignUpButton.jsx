import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "next-i18next";

const SignUpWithGoogleButton = ({ signUpWithGoogle }) => {
    const { t } = useTranslation("common");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='inline-block p-2 border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-indigo-500 cursor-pointer relative bg-white w-full mt-5'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className='flex items-center justify-center space-x-2'
                onClick={signUpWithGoogle}
            >
                <div className='w-6 h-6'>
                    <FcGoogle size={24} />
                </div>
                <span
                    className={`text-md font-semibold rounded ${
                        isHovered && "text-white"
                    }`}
                >
                    {t("signupPage.buttons.second")}
                </span>
            </div>
        </div>
    );
};

export default SignUpWithGoogleButton;
