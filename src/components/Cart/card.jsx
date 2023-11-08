import React, { useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "@/util/firebase";
import { useTranslation } from "next-i18next";

function Card({ mealObject, onRemoveFromCart, onUpdateQuantity }) {
    const { t } = useTranslation("common");
    const [quantity, setQuantity] = useState(mealObject.quantity);
    const cartCollection = collection(db, "cart");

    console.log(mealObject);

    // Function to handle click on remove button (remove the meal from the cart)

    const removeFromCollection = async () => {
        const querySnapshot = await getDocs(cartCollection);
        querySnapshot.forEach((docSnapshot) => {
            const docData = docSnapshot.data();
            if (
                docData.name === mealObject.name &&
                docData.price === mealObject.price &&
                docData.description === mealObject.description &&
                docData.id === mealObject.id &&
                docData.donorId === mealObject.donorId &&
                docData.restaurantId === mealObject.restaurantId
            ) {
                deleteDoc(doc(db, "cart", docSnapshot.id))
                    .then(() => {
                        console.log("Product removed successfully!");
                    })
                    .catch((error) => {
                        console.error("Error removing product:", error);
                    });
            }
        });

        onRemoveFromCart(mealObject);
    };

    // Function to handle quantity change

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (
            !isNaN(newQuantity) &&
            newQuantity >= 1 &&
            newQuantity <= mealObject.maxMeals
        ) {
            setQuantity(newQuantity);

            onUpdateQuantity(mealObject, newQuantity); // Notify parent of quantity change
        }
    };

    const totalMealPrice = mealObject.price * quantity;

    function increament() {
        if (quantity < mealObject.maxMeals) {
            const newQuantity = quantity + 1;

            setQuantity(newQuantity);
            onUpdateQuantity(mealObject, newQuantity);
        }
    }

    function decreament() {
        if (quantity > 1) {
            const newQuantity = quantity - 1;

            setQuantity(newQuantity);
            onUpdateQuantity(mealObject, newQuantity);
        }
    }

    return (
        /* <div>
       <p>{mealObject.name}</p>
       <p>{mealObject.price}</p>
       <p>{mealObject.description}</p>
       <AddToCartButton mealObject={mealObject} />
 
 
     </div>*/

        <div class='flex flex-col p-4 text-lg font-semibold border-b-2 rounded-sm'>
            <div class='flex flex-col md:flex-row gap-3 justify-between '>
                <div class='flex flex-row gap-6 items-center'>
                    <div class='w-28 h-28'>
                        <img
                            class='w-full h-full'
                            src={mealObject.imageUrl}
                            alt='image'
                        />
                    </div>
                    <div class='flex flex-col gap-1 w-60'>
                        <p class='text-lg text-gray-800 font-semibold'>
                            {mealObject.description}
                        </p>
                        {/* <p class='text-xs text-gray-600 font-semibold'>
                            {t("cartPage.card.restaurant")}:{" "}
                            <span class='font-normal'>{mealObject.name}</span>
                        </p>*/}
                        <p class='text-xs text-gray-600 font-semibold'>
                            {t("cartPage.card.quantityLeft")}:{" "}
                            <span class='font-normal'>
                                {mealObject.maxMeals}
                            </span>
                        </p>
                    </div>
                </div>

                <div class='self-center text-center w-[100px]'>
                    {/* Price */}
                    <p class='text-gray-800 font-normal text-xl'>
                        ${mealObject.price.toFixed(2)}
                    </p>
                </div>

                <div class='flex flex-row self-center gap-1 w-[100px] justify-center'>
                    <button
                        class='w-5 h-5 self-center rounded-full border border-gray-300'
                        onClick={decreament}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#d1d5db'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        >
                            <path d='M5 12h14' />
                        </svg>
                    </button>
                    <input
                        type='text'
                        id={`${mealObject.id}`}
                        value={quantity}
                        class='w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm'
                        onChange={handleQuantityChange}
                    />
                    <button
                        class='w-5 h-5 self-center rounded-full border border-gray-300'
                        onClick={increament}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill=''
                            stroke='#9ca3af'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        >
                            <path d='M12 5v14M5 12h14' />
                        </svg>
                    </button>
                </div>

                <div class='self-center text-center w-[100px]'>
                    {/* subtotal*/}
                    <p class='text-gray-800 font-normal text-xl'>
                        ${totalMealPrice.toFixed(2)}
                    </p>
                </div>

                <div class='self-center w-[100px] text-center '>
                    <button class=' ' onClick={removeFromCollection}>
                        <svg
                            class=''
                            height='24px'
                            width='24px'
                            id='Layer_1'
                            version='1.1'
                            viewBox='0 0 512 512'
                        >
                            <g>
                                <path d='M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z' />
                                <g>
                                    <rect
                                        height='241'
                                        width='14'
                                        x='249'
                                        y='160'
                                    />
                                    <polygon points='320,160 305.4,160 294.7,401 309.3,401' />
                                    <polygon points='206.5,160 192,160 202.7,401 217.3,401' />
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
