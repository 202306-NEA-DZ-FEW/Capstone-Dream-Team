import React from "react";
import { useTranslation } from "next-i18next";
import AddToCartButton from "../Cart/addToCartButton";

export default function Mealcard({
    price,
    maxQuantity,
    name,
    image,
    mealObject,
}) {
    const { t } = useTranslation("common");

    return (
        <div className='mb-10 w-80 h-96 relative'>
            <div className='w-80 h-96 left-0 top-0 absolute bg-transparent' />
            <div className='w-80 h-96 left-0 top-[92px] absolute bg-rose-100 rounded-3xl shadow'>
                {/**meal name*/}
                <div className="left-1/2 -translate-x-1/2 top-[160px] absolute justify-center text-black text-xl font-bold font-['Roboto']">
                    {name}
                </div>

                {/**meal price*/}
                <div className="left-1/2 -translate-x-1/2 top-[205px] absolute text-neutral-400 text-lg font-semibold font-['Roboto']">
                    {price} £
                </div>

                {/**separation ine */}
                <div className='w-72 h-px left-1/2 -translate-x-1/2 top-[243px] absolute border-2 border-neutral-400 border-opacity-20'></div>

                {/* the donate button */}
                {/* <div className='w-60 h-11 left-1/2 -translate-x-1/2 top-[329px] absolute'>
                    <div className='w-60 h-11 left-0 top-0 absolute bg-rose-400 rounded-full' />
                    <div className="w-32 h-3.5 left-[57.88px] top-[10.42px] absolute text-center text-black text-xl font-bold font-['Roboto'] leading-relaxed">
                        {t("mealsPage.donate")} £
                        <AddToCartButton mealObject={{ name: { name }, price: { price }, description: ' .description.' }} /> 

                    </div>
                </div> */}
                <div className='w-60 h-11 left-1/2 -translate-x-1/2 top-[329px] absolute'>
                    <AddToCartButton mealObject={mealObject} />
                </div>

                {/* Qty */}
                <div className='mt-[267px] pl-5 pr-5 flex justify-between items-center'>
                    <div className="text-neutral-400 text-base font-medium font-['Roboto']">
                        {t("cartPage.card.quantityLeft")}: {maxQuantity}
                    </div>
                    <ul className='w-32 h-8 flex items-center'>
                        <li className='w-9 h-8 bg-zinc-100 border border-stone-300 justify-center items-center gap-2.5 flex'>
                            <div className='justify-center items-center gap-3.5 flex'>
                                <div className="text-neutral-700 text-lg font-medium font-['Poppins']">
                                    -
                                </div>
                            </div>
                        </li>
                        <li className='w-16 h-8 bg-zinc-100 border border-stone-300 justify-center items-center gap-2.5 flex'>
                            <div className='justify-center items-center gap-3.5 flex'>
                                <div className="text-neutral-700 text-lg font-medium font-['Poppins']">
                                    1
                                </div>
                            </div>
                        </li>
                        <li className='w-9 h-8 bg-zinc-100 border border-stone-300 justify-center items-center gap-2.5 flex'>
                            <div className='justify-center items-center gap-3.5 flex'>
                                <div className="text-neutral-700 text-lg font-medium font-['Poppins']">
                                    +
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/** meal image */}
            <img
                className='w-60 h-60 left-1/2 -translate-x-1/2 top-0 absolute rounded-full'
                src={image}
            />
        </div>
    );
}
