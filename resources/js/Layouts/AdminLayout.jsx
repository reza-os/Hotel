import { useState } from 'react';

import {
    Link,
    usePage,
} from '@inertiajs/react';

import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    LogOut,
    Hotel,
    Menu,
    X,
    Home,
} from 'lucide-react';


export default function AdminLayout({ children }) {

    const { auth } = usePage().props;

    const page = usePage();

    const currentPath =
        page.url.split('?')[0];

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | منوهای اصلی
    |--------------------------------------------------------------------------
    |
    | فعلاً فقط صفحاتی که واقعاً در پروژه داریم نمایش می‌دهیم.
    |
    */

    const menuItems = [
        {
            title: 'داشبورد',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },

        {
            title: 'اتاق‌ها',
            href: '/admin/rooms',
            icon: BedDouble,
        },

        {
            title: 'رزروها',
            href: '/admin/reservations',
            icon: CalendarCheck,
        },
    ];


    const isActive = (href) => {

        if (href === '/admin/dashboard') {
            return currentPath === href;
        }

        return (
            currentPath === href ||
            currentPath.startsWith(`${href}/`)
        );
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <div
            dir="rtl"
            className="min-h-screen bg-slate-100"
        >

            {/* =========================
                Mobile Overlay
            ========================== */}

            {sidebarOpen && (

                <button
                    type="button"
                    aria-label="بستن منو"
                    onClick={closeSidebar}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        lg:hidden
                    "
                />

            )}


            {/* =========================
                Sidebar
            ========================== */}

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-64
                    flex-col
                    border-l
                    border-slate-800
                    bg-slate-950
                    text-white
                    transition-transform
                    duration-300

                    lg:translate-x-0

                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : 'translate-x-full'
                    }
                `}
            >

                {/* Sidebar Header */}

                <div
                    className="
                        flex
                        h-20
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-slate-800
                        px-5
                    "
                >

                    <Link
                        href="/admin/dashboard"
                        onClick={closeSidebar}
                        className="flex items-center gap-3"
                    >

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#C9A227]
                                text-white
                            "
                        >
                            <Hotel size={24} />
                        </div>


                        <div>

                            <h1 className="font-bold">
                                مدیریت هتل آریا
                            </h1>

                            <p className="text-xs text-slate-400">
                                Admin Panel
                            </p>

                        </div>

                    </Link>


                    {/* Close mobile */}

                    <button
                        type="button"
                        onClick={closeSidebar}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-300
                            hover:bg-slate-800
                            lg:hidden
                        "
                    >
                        <X size={21} />
                    </button>

                </div>


                {/* Navigation */}

                <nav
                    className="
                        flex-1
                        space-y-2
                        overflow-y-auto
                        p-4
                    "
                >

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        const active =
                            isActive(item.href);


                        return (

                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeSidebar}
                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition

                                    ${
                                        active
                                            ? 'bg-[#C9A227] text-white'
                                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                    }
                                `}
                            >

                                <Icon size={19} />

                                <span>
                                    {item.title}
                                </span>

                            </Link>

                        );

                    })}


                    {/* Home */}

                    <div
                        className="
                            my-4
                            border-t
                            border-slate-800
                        "
                    />


                    <Link
                        href="/"
                        onClick={closeSidebar}
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-slate-900
                            hover:text-white
                        "
                    >
                        <Home size={19} />

                        مشاهده سایت
                    </Link>

                </nav>


                {/* Logout */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-slate-800
                        p-4
                    "
                >

                    <div className="mb-3 px-4">

                        <p
                            className="
                                truncate
                                text-sm
                                font-bold
                                text-white
                            "
                        >
                            {auth?.user?.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            مدیر سیستم
                        </p>

                    </div>


                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-red-400
                            transition
                            hover:bg-red-500/10
                        "
                    >
                        <LogOut size={19} />

                        خروج
                    </Link>

                </div>

            </aside>


            {/* =========================
                Main Content
            ========================== */}

            <main
                className="
                    min-h-screen
                    lg:mr-64
                "
            >

                {/* Header */}

                <header
                    className="
                        sticky
                        top-0
                        z-30
                        flex
                        min-h-16
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        bg-white/95
                        px-4
                        backdrop-blur
                        sm:px-6
                        lg:h-20
                        lg:px-8
                    "
                >

                    <div className="flex items-center gap-3">

                        {/* Hamburger */}

                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                text-slate-700
                                lg:hidden
                            "
                            aria-label="باز کردن منو"
                        >
                            <Menu size={22} />
                        </button>


                        <div>

                            <h2
                                className="
                                    text-sm
                                    font-bold
                                    text-slate-800
                                    sm:text-base
                                "
                            >
                                پنل مدیریت هتل
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    hidden
                                    text-xs
                                    text-slate-500
                                    sm:block
                                "
                            >
                                مدیریت اتاق‌ها و رزروها
                            </p>

                        </div>

                    </div>


                    {/* User */}

                    <div className="min-w-0 text-left">

                        <p
                            className="
                                max-w-[120px]
                                truncate
                                text-sm
                                font-medium
                                text-slate-800
                                sm:max-w-[200px]
                            "
                        >
                            {auth?.user?.name}
                        </p>

                        <p
                            className="
                                hidden
                                text-xs
                                text-slate-500
                                sm:block
                            "
                        >
                            مدیر سیستم
                        </p>

                    </div>

                </header>


                {/* Page Content */}

                <div
                    className="
                        p-4
                        sm:p-6
                        lg:p-8
                    "
                >
                    {children}
                </div>

            </main>

        </div>
    );
}