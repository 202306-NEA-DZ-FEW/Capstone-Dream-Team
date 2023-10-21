import React from "react";
import Historycard from "./Historycard";
import Historybar from "./Historybar";

export default function Adminhistory() {
    return (
        <div className='flex-col pl-50 space-y-20'>
            <Historybar />
            <div className='flex-col pl-50'>
                <div className='mb-4'>
                    <Historycard />
                </div>
                <div className='mb-4'>
                    <Historycard />
                </div>
                <div className='mb-4'>
                    <Historycard />
                </div>
                <div className='mb-4'>
                    <Historycard />
                </div>
            </div>
        </div>
    );
}
