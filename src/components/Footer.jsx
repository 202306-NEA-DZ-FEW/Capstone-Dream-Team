import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("common");

    return (
        <footer className='bg-white h-100 text-[#192655] p-6'>
            <div className='flex items-center flex-row '>
                <img
                    src='images/home/Navbar/logo.png'
                    alt='Logo'
                    width='100'
                    height='100'
                />

                <div className=' ml-auto'>
                    <h2 className='font-bold mb-2'>
                        Subscribe to our newsletter
                    </h2>
                    <form action='#'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='mb-2 h-10'
                        />
                        <button
                            className='border p-2 bg-amber-400'
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between '>
                <div className='text-center md:text-left'>
                    <p>© 2021 Buy me a meal. All rights reserved.</p>
                    <p>3348 Nw 23rd Ave, Suite A, Gainesville, FL 32605</p>
                    <p>+1 352-505-9106</p>
                    <p>support@buymeameal.com</p>
                </div>

                <div className='font-bold mb-2 md:flex md:flex-col md:items-center flex-grid justify-center'>
                    <Link href='/home' passHref>
                        <h1 className='cursor-pointer'>{t("footer.home")}</h1>
                    </Link>
                    <Link href='/meals' passHref>
                        <h1 className='cursor-pointer'>{t("footer.meals")}</h1>
                    </Link>
                    <Link href='/blog' passHref>
                        <h1 className='cursor-pointer'>{t("footer.blog")}</h1>
                    </Link>
                </div>
                <div>
                    <h2 className='font-bold mr-20 mb-2'>
                        {t("footer.followUs")}
                    </h2>
                    <div className='flex flex-col'>
                        <p href='#'>LinkedIn</p>
                        <p href='#'>Instagram</p>
                        <p href='#'>Facebook</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
