import { useTranslation } from "next-i18next";
import React from "react";

import ChartGraph from "./chartGraph";
import StatCardList from "./statCardList";

export default function Overview() {
    const { t } = useTranslation("common");

    return (
        <div>
            <div className='mx-4 md:mx-6'>
                <div className='mt-4 pb-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700'>
                    <div className='mb-2 sm:mb-0 tracking-wider font-light font-roboto'>
                        {t("history.History")}
                    </div>
                </div>
            </div>
            <StatCardList />
            <ChartGraph />
        </div>
    );
}
