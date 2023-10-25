import { useTranslation } from "next-i18next";
import React from "react";

import { fetchData } from "@/util/newsApi";
export default function StoryCardList(props) {
    const { t } = useTranslation("common");
    console.log("props", props);
    return (
        <div>
            hey
            <p>{t("test")}</p>
        </div>
    );
}
