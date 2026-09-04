import React from "react";
import { Link } from "@inertiajs/react";

import {
    FaInstagram,
    FaTelegramPlane,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";


export default function Footer({ hotel }) {

    const quickLinks = [
        {
            title: "صفحه اصلی",
            href: "/",
        },
        {
            title: "اتاق‌ها",
            href: "/rooms",
        },
        {
            title: "امکانات",
            href: "/facilities",
        },
        {
            title: "درباره ما",
            href: "/about",
        },
        {
            title: "تماس با ما",
            href: "/contact",
        },
    ];


    return (
        <footer
            dir="rtl"
            className="
                bg-[#090D13]
                text-white
            "
        >

            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    grid-cols-1
                    gap-12
                    px-6
                    py-16
                    sm:grid-cols-2
                    lg:grid-cols-4
                    md:px-10
                    lg:px-12
                "
            >

                {/* Hotel */}

                <div>

                    <img
                        src="/pictures/logo.png"
                        alt={hotel.name}
                        className="
                            mb-5
                            w-36
                            object-contain
                        "
                    />


                    <p
                        className="
                            leading-8
                            text-gray-400
                        "
                    >
                        {hotel.short_description}
                    </p>


                    <div className="mt-6 flex gap-3">

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-lg
                                bg-white/10
                                transition
                                hover:bg-[#C9A227]
                            "
                        >
                            <FaInstagram />
                        </a>


                        <a
                            href="#"
                            aria-label="Telegram"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-lg
                                bg-white/10
                                transition
                                hover:bg-[#C9A227]
                            "
                        >
                            <FaTelegramPlane />
                        </a>

                    </div>

                </div>


                {/* Quick Links */}

                <div>

                    <h3 className="mb-6 text-lg font-bold">
                        دسترسی سریع
                    </h3>


                    <div className="flex flex-col gap-4">

                        {quickLinks.map((link) => (

                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    text-gray-400
                                    transition
                                    hover:text-[#C9A227]
                                "
                            >
                                {link.title}
                            </Link>

                        ))}

                    </div>

                </div>


                {/* Contact */}

                <div>

                    <h3 className="mb-6 text-lg font-bold">
                        اطلاعات تماس
                    </h3>


                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            text-sm
                            text-gray-400
                        "
                    >

                        <div className="flex gap-3">

                            <FaPhoneAlt className="mt-1 text-[#C9A227]" />

                            <span>
                                {hotel.phone}
                            </span>

                        </div>


                        <div className="flex gap-3">

                            <FaEnvelope className="mt-1 text-[#C9A227]" />

                            <span>
                                {hotel.email}
                            </span>

                        </div>


                        <div className="flex gap-3">

                            <FaMapMarkerAlt
                                className="
                                    mt-1
                                    shrink-0
                                    text-[#C9A227]
                                "
                            />

                            <span className="leading-7">
                                {hotel.address}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Reservation */}

                <div>

                    <h3 className="mb-6 text-lg font-bold">
                        رزرو آنلاین
                    </h3>


                    <p
                        className="
                            mb-5
                            leading-8
                            text-gray-400
                        "
                    >
                        اتاق مورد نظر خود را آنلاین بررسی و
                        رزرو کنید.
                    </p>


                    <Link
                        href="/rooms"
                        className="
                            inline-flex
                            rounded-lg
                            bg-[#C9A227]
                            px-6
                            py-3
                            font-medium
                            transition
                            hover:bg-[#b69120]
                        "
                    >
                        رزرو اتاق
                    </Link>

                </div>

            </div>


            <div
                className="
                    border-t
                    border-white/10
                    px-6
                    py-5
                    text-center
                    text-sm
                    text-gray-500
                "
            >
                © {new Date().getFullYear()} تمامی حقوق برای
                هتل آریا محفوظ است.
            </div>

        </footer>
    );
}