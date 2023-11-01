import React from "react";
import { useTranslation } from "next-i18next";
export default function Historybar() {
    const { t } = useTranslation("common");
    return (
        <div className='bg-cyan-50 rounded-lg p-4 relative'>
            <div className='bg-rose-100 rounded-lg p-4 space-y-3'>
                <div className='text-3xl font-bold font-Roboto leading-relaxed'>
                    {t("history.History")}
                </div>
            </div>
        </div>
    );
}

// import { render } from "@testing-library/react";
// import Historybar from "./Historybar"; // Import your component

// describe("Historybar", () => {
//   it("renders the Historybar component", () => {
//     const { getByText } = render(<Historybar />);

//     // You can use queries to find elements in the rendered component
//     const historyText = getByText("History");

//     // Assert that the "History" text is present in the component
//     expect(historyText).toBeInTheDocument();
//   });
// });
