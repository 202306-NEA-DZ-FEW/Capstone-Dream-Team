import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("common");

    return (
        <section className='bg-white'>
            <div className='max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8'>
                <nav className='flex flex-wrap justify-center space-x-8 -mx-5 -my-2'>
                    <div className='px-5 py-2'>
                        <Link href='/about' passHref>
                            <p className='text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer'>
                                {t("footer.home")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/blogs' passHref>
                            <p className='text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer'>
                                {t("footer.blog")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/team' passHref>
                            <p className='text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer'>
                                {t("footer.meals")}
                            </p>
                        </Link>
                    </div>
                    <div className='px-5 py-2'>
                        <Link href='/aboutus' passHref>
                            <p className='text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer'>
                                {t("footer.aboutus")}
                            </p>
                        </Link>
                    </div>
                </nav>

                <p className='mt-8 text-base leading-6 text-center text-gray-400'>
                    <div className='flex items-center justify-center'>
                        <img
                            src='images/home/Navbar/logo.png'
                            alt='Logo'
                            width='50'
                            height='50'
                        />
                        <span> {t("footer.copyright")}</span>
                    </div>
                </p>
            </div>
        </section>
    );
}
