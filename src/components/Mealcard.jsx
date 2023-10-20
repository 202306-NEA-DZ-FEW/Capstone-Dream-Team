import React from "react";

export default function Mealcard() {
    return (
        <div className='w-80 h-96 relative'>
            <div className='w-80 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl' />
            <div className='w-72 h-80 left-[16.02px] top-[40.94px] absolute'>
                <div className='w-60 h-11 left-[40.78px] top-[124.90px] absolute'>
                    <div className='w-60 h-11 left-0 top-0 absolute bg-rose-100 rounded-2xl' />
                    <div className="w-40 h-3.5 left-[17.20px] top-[9.17px] absolute text-center text-black text-base font-normal font-['Roboto'] leading-relaxed">
                        Your name (optional)
                    </div>
                </div>
                <div className='w-60 h-11 left-[40.78px] top-[302.65px] absolute'>
                    <div className='w-60 h-11 left-0 top-0 absolute bg-rose-400 rounded-full' />
                    <div className="w-32 h-3.5 left-[57.88px] top-[10.42px] absolute text-center text-black text-xl font-bold font-['Roboto'] leading-relaxed">
                        Donate (12$)
                    </div>
                </div>
                <div className='w-60 h-20 left-[40.78px] top-[190.17px] absolute'>
                    <div className='w-60 h-20 left-0 top-0 absolute bg-rose-100 rounded-2xl shadow' />
                    <img
                        className='w-5 h-5 left-[208.19px] top-[59.37px] absolute rounded-2xl'
                        src='https://via.placeholder.com/19x20'
                    />
                    <div className="w-48 h-3 left-[17.20px] top-[10.89px] absolute text-center text-black text-base font-normal font-['Roboto'] leading-relaxed">
                        Say something nice (optional)
                    </div>
                </div>
                <div className='w-60 h-20 left-[40.78px] top-[32.08px] absolute'>
                    <div className='w-60 h-20 left-0 top-0 absolute bg-rose-100 rounded-2xl' />
                    <div className='w-48 h-10 left-[19.13px] top-[17.70px] absolute'>
                        <div className='w-7 h-8 left-[123.53px] top-[5.60px] absolute'>
                            <div className='w-7 h-8 left-0 top-0 absolute bg-red-200 rounded-full' />
                            <div className="w-4 h-3 left-[5.54px] top-[3.68px] absolute text-center text-black text-base font-bold font-['Roboto'] leading-relaxed">
                                2
                            </div>
                        </div>
                        <div className='w-7 h-8 left-[169.47px] top-[5.60px] absolute'>
                            <div className='w-7 h-8 left-0 top-0 absolute bg-red-200 rounded-full' />
                            <div className="w-4 h-3 left-[5.44px] top-[4.82px] absolute text-center text-black text-base font-bold font-['Roboto'] leading-relaxed">
                                5
                            </div>
                        </div>
                        <div className='w-7 h-8 left-[79.83px] top-[5.60px] absolute'>
                            <div className='w-7 h-8 left-0 top-0 absolute bg-rose-400 rounded-full' />
                            <div className="w-4 h-3 left-[5.44px] top-[3.82px] absolute text-center text-black text-base font-bold font-['Roboto'] leading-relaxed">
                                1
                            </div>
                        </div>
                        <div className="w-4 h-3 left-[52.97px] top-[8.42px] absolute text-center text-black text-xl font-bold font-['Roboto'] leading-relaxed">
                            X
                        </div>
                        <img
                            className='w-9 h-10 left-0 top-0 absolute rounded-2xl'
                            src='https://via.placeholder.com/37x39'
                        />
                    </div>
                </div>
                <div className="w-48 h-3.5 left-0 top-0 absolute text-center text-black text-xl font-bold font-['Roboto'] leading-relaxed">
                    BUY A MEAL{" "}
                </div>
            </div>
        </div>
    );
}
