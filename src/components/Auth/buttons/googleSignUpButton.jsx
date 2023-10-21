import React from "react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useTranslation } from "next-i18next";

const SignUpWithGoogleButton = ({ signUpWithGoogle }) => {
    const { t } = useTranslation("common");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='inline-block p-2 border border-gray-300 rounded-lg shadow hover:shadow-md cursor-pointer relative bg-white '
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className='flex items-center space-x-2'
                onClick={signUpWithGoogle}
            >
                <div className='w-6 h-6'>
                    <FaGoogle size={24} />
                </div>
                <span
                    className={`text-md font-semibold ${
                        isHovered ? "w-full rounded " : "hidden"
                    }`}
                >
                    {t("signupPage.buttons.second")}
                </span>
            </div>
        </div>
    );
};

export default SignUpWithGoogleButton;
