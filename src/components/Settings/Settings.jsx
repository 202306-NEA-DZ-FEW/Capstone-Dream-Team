import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db, storage } from "@/util/firebase";

import {
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    deleteField,
    where,
    query,
    collection,
} from "firebase/firestore";
import {
    updateProfile,
    sendEmailVerification,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser,
    GoogleAuthProvider,
    reauthenticateWithPopup,
    verifyBeforeUpdateEmail,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { useTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Settings() {
    const { t } = useTranslation("common");
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        restaurantId: "",
        restaurantName: "",
        email: "",
        firstName: " ",
        lastName: " ",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
        about: "",
    });
    //states for passwords inputs
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    // states for logo preview
    const [isDragOver, setIsDragOver] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    // state for remove logo button
    const [showButton, setShowButton] = useState(false);
    //state for authentication provider
    const [googleProvider, setGoogleProvider] = useState(false);
    // state for the initial user profile information
    const [initFormData, setInitFormData] = useState("");
    // state for confirmation delete
    const [confirmationDelete, setConfirmationDelete] = useState(false);

    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Await the authentication state to be resolved
                await new Promise((resolve, reject) => {
                    const unsubscribe = auth.onAuthStateChanged((user) => {
                        if (user) {
                            resolve(user); // Resolve the promise when user is available
                        } else {
                            // Optional: Handle cases where user is not logged in
                            reject(new Error("User not logged in"));
                        }
                        unsubscribe(); // Clean up the listener
                    });
                });

                const user = auth.currentUser;
                // Retreive the authentication provider
                const signUpProvider = user.providerData[0].providerId;
                if (signUpProvider === "google.com") {
                    setGoogleProvider(true);
                }

                if (user) {
                    console.log(user);
                    const userId = user.uid;
                    const docRef = doc(db, "restaurant", userId);
                    const docSnap = await getDoc(docRef);
                    const data = docSnap.data();

                    setFormData({
                        restaurantId: userId,
                        restaurantName: user.displayName,
                        email: user.email,
                        firstName: data.firstName ? data.firstName : " ",
                        lastName: data.lastName ? data.lastName : " ",
                        address: data.address ? data.address : "",
                        city: data.city ? data.city : "",
                        country: data.country ? data.country : "",
                        postalCode: data.postalCode ? data.postalCode : "",
                        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
                        about: data.about ? data.about : "",
                    });

                    setInitFormData(data);

                    if (data.image) {
                        setPreviewSrc(data.image);
                    }
                } else {
                    // User is not logged in after resolving authentication
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error as needed
            }
        };

        fetchUser();
    }, []);

    const handleSettings = () => {
        setIsEditable(!isEditable);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regexName = /^[a-zA-Z\s]*$/;
        const regexPostalCode = /^[a-zA-Z0-9\s]*$/;
        const regexPhoneNumber = /^\+?\d*$/;
        if (
            name === "firstName" ||
            name === "lastName" ||
            name === "city" ||
            name === "country"
        ) {
            if (regexName.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "postalCode") {
            if (regexPostalCode.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "phoneNumber") {
            if (regexPhoneNumber.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Function to handle form submit
    const handleFormSubmit = async () => {
        if (initFormData !== formData) {
            const user = auth.currentUser;
            const userId = user.uid;
            const docRef = doc(db, "restaurant", userId);

            /* if (
                 user.email === formData.email ||
                 (user.email !== formData.email && user.emailVerified === true)
             ) {
     
                 if (user.email !== formData.email) {
                     const credential = EmailAuthProvider.credential(
                         user.email,
                         currentPassword
                     );
     
                     await reauthenticateWithCredential(user, credential)
                         .then(async () => {
                             // User re-authenticated.
                             // Update email
                             //await updateEmail(auth.currentUser, formData.email);
                             //await verifyBeforeUpdateEmail(auth.currentUser, formData.email, null)
                             await sendEmailVerification(auth.currentUser, formData.email)
                                 .then(async () => {
                                     await updateEmail(auth.currentUser, formData.email)
                                     //await auth.signOut();
                                     console.log('update email sent')
                                 })
                                 .catch((error) => {
                                     console.log(error);
                                 })
     
     
                             //window.location.reload();
     
                         })
                         .catch((error) => {
                             // An error ocurred
                             console.log(error);
                         });
     
                 }*/

            // Update displayName/restaurantName
            if (user.displayName !== formData.restaurantName) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.restaurantName,
                });
            }
            // Update restaurant object in firestore
            await updateDoc(docRef, formData);

            toast.success(`${t("settings.mes_updatedsuccessfully")}`);
            /*  } else if (
            user.email !== formData.email &&
            user.emailVerified === false
        ) {
            toast.error(`${t("settings.verify_email")}`);
        }*/
        }
        setIsEditable(false);
    };

    // Function to verify email
    const verifyEmail = async () => {
        auth.languageCode = router.locale;
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.success(`${t("settings.email_sent")}`);
            })
            .catch((error) => {
                toast.error(`${t("settings.try_again")}`);
            });
    };

    // Function to reset the password

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            await reauthenticateWithCredential(user, credential)
                .then(() => {
                    // User re-authenticated.
                    updatePassword(user, newPassword);
                    // Password updated successfully
                    toast.success(`${t("settings.pass_updated")}`);
                })
                .catch((error) => {
                    // An error ocurred
                    console.log(error);
                    toast.error(`${t("settings.wrong_pass")}`);
                });
        } catch (error) {
            // Handle error
            toast.error(`${t("settings.errorupdate_pass")}`);
            console.log(error);
        }
    };

    // Function to hundle delete account
    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        try {
            // Retreive the authentication provider
            const signUpProvider = user.providerData[0].providerId;

            if (signUpProvider === "google.com") {
                //setGoogleProvider(true);

                const provider = new GoogleAuthProvider();
                await reauthenticateWithPopup(user, provider)
                    .then(async () => {
                        // User re-authenticated.
                        await deleteDoc(doc(db, "restaurant", user.uid));
                        if (previewSrc) {
                            const desertRef = ref(storage, previewSrc);
                            // Delete the logo image from storage
                            await deleteObject(desertRef);
                        }

                        // Delete all the restaurant meals from meals and cart collection
                        const q = query(
                            collection(db, "meals"),
                            where("restaurantId", "==", user.uid)
                        );

                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach(async (doc) => {
                            try {
                                await deleteDoc(doc.ref);
                                console.log("document deleted from meals");
                            } catch (error) {
                                console.error(
                                    "Error deleting document: ",
                                    error
                                );
                            }
                        });

                        const d = query(
                            collection(db, "cart"),
                            where("restaurantId", "==", user.uid)
                        );

                        const querySnapshotCart = await getDocs(d);
                        querySnapshotCart.forEach(async (doc) => {
                            try {
                                console.log(doc.data());
                                await deleteDoc(doc.ref);
                            } catch (error) {
                                console.error(
                                    "Error deleting document: ",
                                    error
                                );
                            }
                        });

                        //await auth.signOut();
                        await deleteUser(user);
                        router.push("/");

                        // account deleted successfully
                        console.log("account deleted");
                        toast.success(`${t("settings.success_delete")}`);
                    })
                    .catch((error) => {
                        // An error ocurred
                        console.log(error);
                        toast.error(`${t("settings.error_delete")}`);
                    });
            } else {
                const credential = EmailAuthProvider.credential(
                    user.email,
                    password
                );

                await reauthenticateWithCredential(user, credential)
                    .then(async () => {
                        // User re-authenticated.

                        await deleteDoc(doc(db, "restaurant", user.uid));
                        if (previewSrc) {
                            const desertRef = ref(storage, previewSrc);
                            // Delete the logo image from storage
                            await deleteObject(desertRef);
                        }

                        // Delete all the restaurant meals from meals and cart collection
                        const d = query(
                            collection(db, "cart"),
                            where("restaurantId", "==", user.uid)
                        );

                        const querySnapshotCart = await getDocs(d);
                        querySnapshotCart.forEach(async (doc) => {
                            try {
                                console.log(doc.data());
                                await deleteDoc(doc.ref);
                            } catch (error) {
                                console.error(
                                    "Error deleting document: ",
                                    error
                                );
                            }
                        });

                        const q = query(
                            collection(db, "meals"),
                            where("restaurantId", "==", user.uid)
                        );

                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach(async (doc) => {
                            try {
                                await deleteDoc(doc.ref);
                            } catch (error) {
                                console.error(
                                    "Error deleting document: ",
                                    error
                                );
                            }
                        });

                        //await auth.signOut();
                        await deleteUser(user);
                        router.push("/");
                        // account deleted successfully
                        console.log("account deleted");
                        toast.success(`${t("settings.success_delete")}`);
                    })
                    .catch((error) => {
                        // An error ocurred
                        console.log(error);
                        toast.error(`${t("settings.wrong_pass")}`);
                    });
            }
        } catch (error) {
            // Handle error
            toast.error(`${t("settings.error_delete")}`);
            console.log(error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            // Check the file type
            if (validImageTypes.includes(file.type)) {
                uploadToFirebaseStorage(file);
            } else {
                toast.error(`${t("settings.valid_image")}`);
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            // Check the file type
            if (validImageTypes.includes(file.type)) {
                uploadToFirebaseStorage(file);
            } else {
                toast.error(`${t("settings.valid_image")}`);
            }
        }
    };

    const uploadToFirebaseStorage = async (file) => {
        const storageRef = ref(storage, `logo/${user.uid}.jpg`);

        await uploadBytes(storageRef, file)
            .then(() => {
                // Image uploaded successfully
                const downloadURL = getDownloadURL(storageRef).then(
                    async (url) => {
                        setPreviewSrc(url);
                        // update logo url in user profile
                        updateProfile(auth.currentUser, {
                            photoURL: url,
                        });
                        // update logo in firestore

                        const userId = user.uid;
                        const docRef = doc(db, "restaurant", userId);
                        updateDoc(docRef, { image: url });
                    }
                );
            })
            .catch((error) => {
                // Handle error
                console.error("Error uploading image to Firebase:", error);
            });
    };

    const handleDeleteLogo = (e) => {
        e.preventDefault();

        if (previewSrc) {
            const desertRef = ref(storage, previewSrc);
            // Delete the logo image from storage
            deleteObject(desertRef);
            // update logo url in user profile
            updateProfile(auth.currentUser, {
                photoURL: null,
            })
                .then(() => {
                    console.log("Profile image removed successfully");
                })
                .catch((error) => {
                    console.error("Error removing profile image:", error);
                });

            // update logo in firestore
            const userId = user.uid;
            const docRef = doc(db, "restaurant", userId);
            updateDoc(docRef, { image: deleteField() });
            setPreviewSrc(null);
        }
    };

    return (
        <>
            <Toaster
                position='buttom-right'
                toastOptions={{ duration: 7000, className: "text-lg" }}
            />
            <Head>
                <link
                    rel='stylesheet'
                    href='https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css'
                />
            </Head>

            <section className=' py-1'>
                <div className='w-full lg:w-8/12 px-4 mx-auto ' />
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0'>
                    <div className='rounded-t bg-white mb-0 px-6 py-6'>
                        <div className='text-center flex justify-between'>
                            <h6 className='text-blueGray-700  tracking-wider font-light font-roboto'>
                                {t("settings.my_account")}
                            </h6>
                            <div>
                                {isEditable ? (
                                    <button
                                        className='bg-pink-500 text-white active:bg-pink-600  uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                        type='submit'
                                        onClick={handleFormSubmit}
                                    >
                                        {t("settings.save")}
                                    </button>
                                ) : null}
                                <button
                                    className='bg-orange-400 text-white active:bg-teal-600  uppercase text-sm px-4 py-2 rounded shadow hover:bg-orange-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={handleSettings}
                                >
                                    {t("settings.edit")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                        <form>
                            <h6 className='text-blue-600 text-base mt-3 mb-6  '>
                                {t("settings.user_information")}
                            </h6>

                            <div className='flex flex-wrap sm:flex sm:flex-nowrap justify-center sm:justify-start'>
                                <div
                                    className={` relative h-60 w-70 p-6 ml-4 mr-4 mb-4 border ${
                                        isDragOver ? "border-indigo-600" : ""
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type='file'
                                        className='absolute inset-0 h-60 w-70 opacity-0 z-20 '
                                        onChange={handleFileChange}
                                        onMouseEnter={() => setShowButton(true)}
                                        onMouseLeave={() =>
                                            setShowButton(false)
                                        }
                                    />
                                    <div
                                        className={`text-center ${
                                            previewSrc && "opacity-0"
                                        }`}
                                    >
                                        <img
                                            className='mx-auto h-12 w-12'
                                            src='https://www.svgrepo.com/show/357902/image-upload.svg'
                                            alt=''
                                        />

                                        <h3 className='mt-2 text-sm font-medium text-gray-900'>
                                            <label
                                                htmlFor='file-upload'
                                                className='relative cursor-pointer'
                                            >
                                                <span>
                                                    {t(
                                                        "settings.drag_and_drop"
                                                    )}
                                                </span>
                                                <span className='text-indigo-600'>
                                                    {" "}
                                                    {t("settings.or_browse")}
                                                </span>
                                                <span>
                                                    {" "}
                                                    {t("settings.to_upload")}
                                                </span>
                                            </label>
                                        </h3>
                                    </div>
                                    {previewSrc && (
                                        <div className='absolute h-60 w-70  flex items-center justify-center overflow-hidden  absolute top-0 left-0 object-cover'>
                                            <img
                                                src={previewSrc}
                                                className='h-full w-full'
                                            />
                                        </div>
                                    )}
                                    {showButton && previewSrc && (
                                        <button
                                            className='absolute top-1 right-1 z-40 rounded-full bg-red-500 text-white text-sm w-8 h-8 flex items-center justify-center'
                                            onMouseEnter={() =>
                                                setShowButton(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowButton(false)
                                            }
                                            onClick={handleDeleteLogo}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>

                                <div className='flex flex-wrap w-full'>
                                    <div className='w-full lg:w-6/12 px-4'>
                                        <div className='relative w-full mb-3'>
                                            <label
                                                className='block  text-blueGray-600 text-sm  mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.restaurant_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='restaurantName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                className='border  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.restaurantName}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-6/12 px-4'>
                                        <div className='relative w-full mb-3'>
                                            <label
                                                className='block  text-blueGray-600 text-sm  mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.email_address")}{" "}
                                                {isEditable &&
                                                user.emailVerified === false ? (
                                                    <a
                                                        className='ml-1 underline cursor-pointer text-red-500'
                                                        style={{
                                                            style: "font-size: 12px",
                                                        }}
                                                        onClick={verifyEmail}
                                                    >
                                                        {t(
                                                            "settings.verify_your_email"
                                                        )}
                                                    </a>
                                                ) : null}
                                            </label>
                                            <input
                                                type='email'
                                                name='email'
                                                onChange={handleChange}
                                                readOnly={true}
                                                className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={
                                                    //googleProvider === true
                                                    user.email
                                                    //: formData.email
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-6/12 px-4'>
                                        <div className='relative w-full mb-3'>
                                            <label
                                                className='block text-blueGray-600 text-sm  mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.first_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='firstName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.firstName}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-6/12 px-4'>
                                        <div className='relative w-full mb-3'>
                                            <label
                                                className='block text-blueGray-600 text-sm  mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.last_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='lastName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.lastName}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-6 border-b-1 border-blueGray-300' />

                            <h6 className='text-blue-600 text-base mt-3 mb-6  '>
                                {t("settings.contact_information")}
                            </h6>
                            <div className='flex flex-wrap'>
                                <div className='w-full lg:w-12/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.address")}
                                        </label>
                                        <input
                                            type='text'
                                            name='address'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.address}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.city")}
                                        </label>
                                        <input
                                            type='email'
                                            name='city'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.city}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.country")}
                                        </label>
                                        <input
                                            type='text'
                                            name='country'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.country}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.postal_code")}
                                        </label>
                                        <input
                                            type='text'
                                            name='postalCode'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.postalCode}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.phone_number")}
                                        </label>
                                        <input
                                            type='text'
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.phoneNumber}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className='mt-6 border-b-1 border-blueGray-300' />

                            <h6 className='text-blue-600 text-base mt-3 mb-6 '>
                                {t("settings.description")}
                            </h6>
                            <div className='flex flex-wrap'>
                                <div className='w-full lg:w-12/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.description")}
                                        </label>
                                        <textarea
                                            type='text'
                                            name='about'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            rows='4'
                                            value={formData.about}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr
                            className={
                                googleProvider
                                    ? "hidden"
                                    : "mt-6 border-b-1 border-blueGray-300"
                            }
                        />

                        <form className={googleProvider && "hidden"}>
                            <h6 className='text-blue-600 text-base mt-3 mb-6  '>
                                {t("settings.reset_your_password")}
                            </h6>
                            <div className='flex flex-wrap'>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.enter_your_password")}
                                        </label>
                                        <input
                                            type='password'
                                            name='password'
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={currentPassword}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-4/12 px-4'>
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t(
                                                "settings.enter_your_new_password"
                                            )}
                                        </label>
                                        <input
                                            type='password'
                                            name='newPassword'
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={newPassword}
                                        />
                                    </div>
                                </div>

                                <button
                                    className='bg-orange-400 text-white   text-sm px-4 py-2 rounded shadow hover:bg-orange-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-6 mb-3'
                                    type='submit'
                                    onClick={handleChangePassword}
                                >
                                    {t("settings.reset")}
                                </button>
                            </div>
                        </form>

                        <hr className='mt-6 border-b-1 border-blueGray-300' />

                        <form>
                            <h6 className='text-blue-600 text-base mt-3 mb-6  '>
                                {t("settings.delete_your_account")}
                            </h6>
                            <div className='flex flex-wrap'>
                                <div
                                    className={
                                        googleProvider
                                            ? "hidden"
                                            : "w-full lg:w-4/12 px-4"
                                    }
                                >
                                    <div className='relative w-full mb-3'>
                                        <label
                                            className='block text-blueGray-600 text-sm  mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.enter_your_password")}
                                        </label>
                                        <input
                                            type='password'
                                            name='password'
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            readOnly={!isEditable}
                                            className='border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <button
                                    className='bg-orange-400 text-white   text-sm px-4 py-2 rounded shadow hover:bg-orange-600 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-6 mb-3'
                                    type='submit'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setConfirmationDelete(true);
                                    }}
                                >
                                    {t("settings.delete")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {confirmationDelete && (
                <div
                    class='relative z-50'
                    aria-labelledby='modal-title'
                    role='dialog'
                    aria-modal='true'
                >
                    <div class='fixed inset-0 bg-gray-500 z-50 bg-opacity-75 transition-opacity'></div>

                    <div class='fixed inset-0 z-50 w-screen overflow-y-auto'>
                        <div class='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <div class='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div class='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <div class='sm:flex sm:items-start'>
                                        <div class='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                            <svg
                                                class='h-6 w-6 text-red-600'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                aria-hidden='true'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                                                />
                                            </svg>
                                        </div>
                                        <div class='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                            <h3
                                                class='text-base font-semibold leading-6 text-gray-900'
                                                id='modal-title'
                                            >
                                                {t(
                                                    "settings.delete_your_account"
                                                )}
                                            </h3>
                                            <div class='mt-2'>
                                                <p class='text-sm text-gray-500'>
                                                    {t(
                                                        "settings.delete_message"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        onClick={handleDeleteAccount}
                                        class='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                                    >
                                        {t("settings.delete")}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setConfirmationDelete(false)
                                        }
                                        class='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                    >
                                        {t("settings.cancel")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
