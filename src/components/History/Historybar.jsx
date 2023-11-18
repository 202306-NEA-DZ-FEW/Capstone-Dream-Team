import React from "react";
import { useTranslation } from "next-i18next";
export default function Historybar() {
    const { t } = useTranslation("common");
    return (
        <div className='bg-cyan-50 rounded-lg  p-4 relative'>
            <div className='bg-rose-100 rounded-tr-full p-4 z-10 space-y-3'>
                <div className='text-3xl font-bold font-Roboto leading-relaxed'>
                    {t("history.History")}
                </div>
            </div>
        </div>
    );
}
