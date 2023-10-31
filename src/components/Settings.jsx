import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db, storage } from "@/util/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
    updateProfile,
    sendEmailVerification,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import { useTranslation } from "next-i18next";

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
    const [previewSrc, setPreviewSrc] = useState("");

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
                if (user) {
                    console.log(user);
                    const userId = user.uid;
                    const docRef = doc(db, "restaurant", userId);
                    const docSnap = await getDoc(docRef);
                    const data = docSnap.data();

                    setFormData({
                        restaurantId: userId,
                        restaurantName: data.restaurantName,
                        email: data.email,
                        firstName: data.firstName ? data.firstName : " ",
                        lastName: data.lastName ? data.lastName : " ",
                        address: data.address ? data.address : "",
                        city: data.city ? data.city : "",
                        country: data.country ? data.country : "",
                        postalCode: data.postalCode ? data.postalCode : "",
                        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
                        about: data.about ? data.about : "",
                    });

                    if (data.image) {
                        setPreviewSrc(data.image);
                    }

                    console.log(userId);
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
        const user = auth.currentUser;
        const userId = user.uid;
        const docRef = doc(db, "restaurant", userId);

        if (
            user.email === formData.email ||
            (user.email !== formData.email && user.emailVerified === true)
        ) {
            // Update restaurant object in firestore
            await updateDoc(docRef, formData);

            // Update displayName/restaurantName
            if (user.displayName !== formData.restaurantName) {
                updateProfile(auth.currentUser, {
                    displayName: formData.restaurantName,
                });
            }

            // Update email
            updateEmail(auth.currentUser, formData.email);
        } else if (
            user.email !== formData.email &&
            user.emailVerified === false
        ) {
            return alert("please verify your email in order to update it");
        }
        setIsEditable(false);
    };

    // Function to verify email
    const verifyEmail = async () => {
        auth.languageCode = router.locale;
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("Email verification sent!");
            })
            .catch((error) => {
                alert("Please try again");
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
                    console.log("Password updated");
                })
                .catch((error) => {
                    // An error ocurred
                    console.log(error);
                    alert("Wrong password, please enter valid password");
                });
        } catch (error) {
            // Handle error
            console.error("Error updating password:", error);
        }
    };

    // Function to hundle delete account
    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            await reauthenticateWithCredential(user, credential)
                .then(() => {
                    // User re-authenticated.
                    deleteUser(user);
                    router.push("/");
                    deleteDoc(doc(db, "restaurant", user.uid));
                    if (previewSrc) {
                        const desertRef = ref(storage, previewSrc);
                        // Delete the logo image from storage
                        deleteObject(desertRef);
                    }

                    // account deleted successfully
                    console.log("account deleted");
                })
                .catch((error) => {
                    // An error ocurred
                    console.log(error);
                    alert("Wrong password, please enter valid password");
                });
        } catch (error) {
            // Handle error
            console.error("Error deleting account:", error);
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
                alert("Please upload a valid image file (JPEG, PNG, GIF).");
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
                alert("Please upload a valid image file (JPEG, PNG, GIF).");
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

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css'
                />
                <link
                    rel='stylesheet'
                    href='https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
                />
            </Head>

            <section class=' py-1 bg-blueGray-50'>
                <div class='w-full lg:w-8/12 px-4 mx-auto mt-6' />
                <div class='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
                    <div class='rounded-t bg-white mb-0 px-6 py-6'>
                        <div class='text-center flex justify-between'>
                            <h6 class='text-blueGray-700 text-xl font-bold '>
                                {t("settings.my_account")}
                            </h6>
                            <div>
                                {isEditable ? (
                                    <button
                                        class='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                        type='submit'
                                        onClick={handleFormSubmit}
                                    >
                                        {t("settings.save")}
                                    </button>
                                ) : null}
                                <button
                                    class='bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={handleSettings}
                                >
                                    {t("settings.settings")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class='flex-auto px-4 lg:px-10 py-10 pt-0'>
                        <form>
                            <h6 class='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                                {t("settings.user_information")}
                            </h6>

                            <div class='flex flex-wrap sm:flex sm:flex-nowrap justify-center sm:justify-start'>
                                <div
                                    className={` relative h-60 w-70 p-6 ml-4 mr-4 mb-4 ${
                                        isDragOver ? "border-indigo-600" : ""
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type='file'
                                        className='absolute  inset-0 h-60 w-70 opacity-0 z-50'
                                        onChange={handleFileChange}
                                    />
                                    <div className='text-center'>
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
                                                <input
                                                    id='file-upload'
                                                    name='file-upload'
                                                    type='file'
                                                    className='sr-only'
                                                />
                                            </label>
                                        </h3>
                                    </div>
                                    {previewSrc && (
                                        <div
                                            class='absolute h-60 w-70  flex items-center justify-center overflow-hidden  absolute top-0 left-0 object-cover'
                                            style={{ "z-index": 10 }}
                                        >
                                            <img
                                                src={previewSrc}
                                                className='h-full w-full '
                                            />
                                        </div>
                                    )}
                                </div>

                                <div class='flex flex-wrap w-full'>
                                    <div class='w-full lg:w-6/12 px-4'>
                                        <div class='relative w-full mb-3'>
                                            <label
                                                class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.restaurant_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='restaurantName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.restaurantName}
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full lg:w-6/12 px-4'>
                                        <div class='relative w-full mb-3'>
                                            <label
                                                class='block  text-blueGray-600 text-xs font-bold mb-2'
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
                                                readOnly={!isEditable}
                                                class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.email}
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full lg:w-6/12 px-4'>
                                        <div class='relative w-full mb-3'>
                                            <label
                                                class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.first_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='firstName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.firstName}
                                            />
                                        </div>
                                    </div>
                                    <div class='w-full lg:w-6/12 px-4'>
                                        <div class='relative w-full mb-3'>
                                            <label
                                                class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                                htmlfor='grid-password'
                                            >
                                                {t("settings.last_name")}
                                            </label>
                                            <input
                                                type='text'
                                                name='lastName'
                                                onChange={handleChange}
                                                readOnly={!isEditable}
                                                class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                                value={formData.lastName}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class='mt-6 border-b-1 border-blueGray-300' />

                            <h6 class='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                                {t("settings.contact_information")}
                            </h6>
                            <div class='flex flex-wrap'>
                                <div class='w-full lg:w-12/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.address")}
                                        </label>
                                        <input
                                            type='text'
                                            name='address'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.address}
                                        />
                                    </div>
                                </div>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.city")}
                                        </label>
                                        <input
                                            type='email'
                                            name='city'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.city}
                                        />
                                    </div>
                                </div>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.country")}
                                        </label>
                                        <input
                                            type='text'
                                            name='country'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.country}
                                        />
                                    </div>
                                </div>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.postal_code")}
                                        </label>
                                        <input
                                            type='text'
                                            name='postalCode'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.postalCode}
                                        />
                                    </div>
                                </div>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.phone_number")}
                                        </label>
                                        <input
                                            type='text'
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={formData.phoneNumber}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr class='mt-6 border-b-1 border-blueGray-300' />

                            <h6 class='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                                {t("settings.description")}
                            </h6>
                            <div class='flex flex-wrap'>
                                <div class='w-full lg:w-12/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                            htmlfor='grid-password'
                                        >
                                            {t("settings.description")}
                                        </label>
                                        <textarea
                                            type='text'
                                            name='about'
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            rows='4'
                                            value={formData.about}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr class='mt-6 border-b-1 border-blueGray-300' />

                        <form>
                            <h6 class='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                                {t("settings.reset_your_password")}
                            </h6>
                            <div class='flex flex-wrap'>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
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
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={currentPassword}
                                        />
                                    </div>
                                </div>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
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
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={newPassword}
                                        />
                                    </div>
                                </div>

                                <button
                                    class='bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-6 mb-3'
                                    type='submit'
                                    onClick={handleChangePassword}
                                >
                                    {t("settings.reset")}
                                </button>
                            </div>
                        </form>

                        <hr class='mt-6 border-b-1 border-blueGray-300' />

                        <form>
                            <h6 class='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                                {t("settings.delete_your_account")}
                            </h6>
                            <div class='flex flex-wrap'>
                                <div class='w-full lg:w-4/12 px-4'>
                                    <div class='relative w-full mb-3'>
                                        <label
                                            class='block uppercase text-blueGray-600 text-xs font-bold mb-2'
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
                                            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <button
                                    class='bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-6 mb-3'
                                    type='submit'
                                    onClick={handleDeleteAccount}
                                >
                                    {t("settings.delete")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
