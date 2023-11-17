import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import toast from "react-hot-toast";

import {
    addDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
} from "firebase/firestore";

import { db } from "../../util/firebase";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

{
    /* this compo must be imported in the card component so it popup once the Donate button is clicked */
}

const Checkout = ({ Total, cart }) => {
    const { t } = useTranslation("common");

    const [isModalVisible, setModalVisible] = useState(false);
    const hideModal = () => {
        setModalVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    console.log(cart);

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    //functuion to set the Date
    function getCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        // Ensure day and month have two digits (e.g., 05 instead of 5)
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const formattedDate = getCurrentDate();
    //console.log(formattedDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPaymentLoading(true);

        try {
            const amountInCents = Total * 100;
            const response = await axios.post("/api/create-payment-intent", {
                amount: amountInCents,
            });

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                response.data.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );
            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                // new array called info that add the name of the donor to it
                const info = cart.map((obj) => ({
                    ...obj,
                    donor_name: name,
                    donor_email: email,
                    active_meal: obj.quantity,
                    date: formattedDate,
                }));

                // add the info array to the firestore donors collection
                const donorscollection = collection(db, "donors"); // Reference to the 'donors' collection
                // Use a forEach loop to add each object to the 'donors' collection
                info.forEach(async (obj) => {
                    try {
                        const doc = await addDoc(donorscollection, obj);
                        console.log(
                            "Document written with ID: ",
                            cart[0].donorId
                        );
                    } catch (error) {
                        console.error("Error adding document: ", error);
                    }
                });

                // delete the documents of the donors from the cart collection
                const cartcollection = collection(db, "cart");
                // Create a query to select documents in "cartcollection" where "Qty" is 33
                const q = query(
                    cartcollection,
                    where("donorId", "==", cart[0].donorId)
                );
                // Get the documents that match the query
                const querySnapshot = await getDocs(q);
                // Iterate over the matching documents and delete them
                querySnapshot.forEach(async (doc) => {
                    try {
                        await deleteDoc(doc.ref);
                        console.log("Document deleted with ID: ", doc.id);
                    } catch (error) {
                        console.error("Error deleting document: ", error);
                    }
                });

                // Send email to donor

                const data = [name, email, Total, cart];
                //console.log(data);
                const response = await fetch("/api/route", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (response.status === 200) {
                    toast.success(
                        "Checkout successfull, check your E-mail inbox"
                    );
                }
                if (response.status === 400) {
                    toast.error("Error sending E-mail");
                }

                setPaymentSuccess(true);
            }
        } catch (err) {
            setError("An error occurred while processing your payment.");
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <div>
            <button
                className='transition-colors rounded-full text-sm bg-orange-400  hover:bg-opacity-50 p-2 rounded-sm w-full text-white text-hover shadow-md'
                onClick={toggleModal}
            >
                {t("cartPage.checkout.DONATE NOW")}
            </button>

            {/* Main modal */}
            {isModalVisible && (
                <div
                    id='default-modal'
                    tabIndex='-1'
                    aria-hidden='true'
                    className='fixed flex justify-center items-center w-full z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100% - 1rem)] max-h-full'
                >
                    <div className='relative w-full max-w-full max-h-full sm:max-w-2xl'>
                        {/* Modal content */}
                        <div className='relative bg-white border-4 border-blue-500 rounded-lg shadow dark:bg-gray-700'>
                            {/* TITLE & HIDE X */}
                            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    {t("cartPage.checkout.Checkout")}
                                </h3>
                                <button
                                    type='button'
                                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white'
                                    data-modal-hide='default-modal'
                                    onClick={hideModal}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 14 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className='p-6 space-y-6'>
                                <div className='pb-10 pt-5 flex justify-center items-center'>
                                    <div className='leading-loose'>
                                        <form
                                            className='max-w-xl m-4 p-10 bg-white rounded shadow-xl'
                                            onSubmit={handleSubmit}
                                        >
                                            <p className='text-gray-800 font-medium'>
                                                {t(
                                                    "cartPage.checkout.Donor informations"
                                                )}
                                            </p>
                                            <div className=''>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_name'
                                                >
                                                    {t(
                                                        "cartPage.checkout.Name"
                                                    )}
                                                </label>
                                                <input
                                                    className='w-full px-5 py-1 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_name'
                                                    name='cus_name'
                                                    type='text'
                                                    required=''
                                                    placeholder={t(
                                                        "cartPage.checkout.Name"
                                                    )}
                                                    aria-label='Name'
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    {t(
                                                        "cartPage.checkout.Email"
                                                    )}
                                                </label>
                                                <input
                                                    className='w-full px-5 py-4 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder={t(
                                                        "cartPage.checkout.Email"
                                                    )}
                                                    aria-label='Email'
                                                    onChange={(event) =>
                                                        setEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    {t(
                                                        "cartPage.checkout.Address"
                                                    )}
                                                </label>
                                            </div>
                                            <div className='mt-2'>
                                                <label
                                                    className='hidden text-sm block text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    {t(
                                                        "cartPage.checkout.City"
                                                    )}
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder={t(
                                                        "cartPage.checkout.City"
                                                    )}
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='inline-block mt-2 w-1/2 pr-1'>
                                                <label
                                                    className='hidden block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    {t(
                                                        "cartPage.checkout.Country"
                                                    )}
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder={t(
                                                        "cartPage.checkout.Country"
                                                    )}
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <div className='inline-block mt-2 -mx-1 pl-1 w-1/2'>
                                                <label
                                                    className='hidden block text-sm text-gray-600'
                                                    htmlFor='cus_email'
                                                >
                                                    {t("cartPage.checkout.Zip")}
                                                </label>
                                                <input
                                                    className='w-full px-2 py-2 text-gray-700 bg-gray-200 rounded'
                                                    id='cus_email'
                                                    name='cus_email'
                                                    type='text'
                                                    required=''
                                                    placeholder={t(
                                                        "cartPage.checkout.Zip"
                                                    )}
                                                    aria-label='Email'
                                                />
                                            </div>
                                            <p className='mt-4 text-gray-800 font-medium'>
                                                {t(
                                                    "cartPage.checkout.Payment informations"
                                                )}
                                            </p>
                                            <div className=''>
                                                <label>
                                                    <div className='p-4 bg-gray-200 rounded'>
                                                        <CardElement
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize:
                                                                            "16px",
                                                                        color: "#424770",
                                                                        "::placeholder":
                                                                            {
                                                                                color: "#aab7c4",
                                                                            },
                                                                    },
                                                                    invalid: {
                                                                        color: "#9e2146",
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </label>
                                            </div>

                                            <div className='mt-4'>
                                                <button
                                                    className='px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded'
                                                    type='submit'
                                                    disabled={paymentLoading}
                                                >
                                                    {paymentLoading
                                                        ? t(
                                                              "cartPage.checkout.Processing"
                                                          )
                                                        : t(
                                                              "cartPage.checkout.Pay"
                                                          )}
                                                    ${Total}
                                                </button>
                                            </div>
                                        </form>
                                        {paymentSuccess && (
                                            <p style={{ color: "green" }}>
                                                {t(
                                                    "cartPage.checkout.Payment was successful"
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
