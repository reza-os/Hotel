import React, { useState } from "react";

import { Link, usePage } from "@inertiajs/react";

import { FaRegUser, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

const hotelInfo = {
    name: "Aria Hotel",
    phone: "09392738068",
};

const menuItems = [
    {
        title: "صفحه اصلی",
        href: "/",
        active: true,
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
        title: "گالری",
        href: "/gallery",
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

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const { auth } = usePage().props;

    const user = auth?.user;

    return (
        <nav
            dir="rtl"
            className="
            absolute
            top-0
            right-0
            w-full
            z-50
            h-24
            px-6
            md:px-12
            flex
            items-center
            justify-between
            bg-black/30
            backdrop-blur-sm
            text-white
            "
        >
            {/* Logo */}

            <Link href="/">
                <img
                    src="/pictures/logo.png"
                    alt={hotelInfo.name}
                    className="
                    w-32
                    md:w-40
                    object-contain
                    "
                />
            </Link>

            {/* Desktop Menu */}

            <div
                className="
                hidden
                lg:flex
                items-center
                gap-8
                "
            >
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`
                            relative
                            text-sm
                            xl:text-base
                            font-medium
                            transition
                            duration-300

                            ${item.active ? "text-gold" : "hover:text-gold"}

                            `}
                    >
                        {item.title}

                        {item.active && (
                            <span
                                className="
                                    absolute
                                    -bottom-3
                                    right-0
                                    w-full
                                    h-[2px]
                                    bg-gold
                                    "
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Actions Desktop */}

            <div
                className="
                hidden
                md:flex
                items-center
                gap-6
                "
            >
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href={
                                user.is_admin
                                    ? "/admin/dashboard"
                                    : "/dashboard"
                            }
                        >
                            {user.is_admin ? "پنل مدیریت" : "پنل کاربری"}
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-red-300"
                        >
                            خروج
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login">ورود</Link>

                        <Link
                            href="/register"
                            className="rounded-lg bg-[#C9A227] px-4 py-2"
                        >
                            ثبت نام
                        </Link>
                    </div>
                )}

                <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                >
                    <FaPhoneAlt size={17} />

                    <span>{hotelInfo.phone}</span>
                </div>
            </div>

            {/* Mobile Button */}

            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="
                lg:hidden
                text-xl
                "
            >
                {openMenu ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu */}

            {openMenu && (
                <div
                    className="
                    absolute
                    top-24
                    right-0
                    w-full
                    bg-black/90
                    p-6
                    flex
                    flex-col
                    gap-6
                    lg:hidden
                    "
                >
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="
                                hover:text-gold
                                transition
                                "
                        >
                            {item.title}
                        </Link>
                    ))}

                    <div className="flex flex-col gap-3">
                        <a
                            href="/login"
                            className="
            flex
            items-center
            gap-2
        "
                        >
                            <FaRegUser />
                            ورود
                        </a>

                        <a
                            href="/register"
                            className="
            rounded-lg
            bg-[#C9A227]
            px-4
            py-2
            text-center
            font-bold
            text-white
        "
                        >
                            ثبت نام
                        </a>
                    </div>

                    <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                    >
                        <FaPhoneAlt />

                        {hotelInfo.phone}
                    </div>
                </div>
            )}
        </nav>
    );
}
