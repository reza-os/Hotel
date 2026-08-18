import {
    Link,
    usePage,
} from '@inertiajs/react';

import {
    LayoutDashboard,
    BedDouble,
    CalendarDays,
    User,
    LogOut,
    Hotel,
} from 'lucide-react';


export default function UserLayout({
    children,
}) {

    const { auth } = usePage().props;

    const currentPath =
        window.location.pathname;


    const links = [
        {
            title: 'داشبورد',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'رزرو اتاق',
            href: '/rooms',
            icon: BedDouble,
        },
        {
            title: 'رزروهای من',
            href: '/my-reservations',
            icon: CalendarDays,
        },
        {
            title: 'پروفایل',
            href: '/profile',
            icon: User,
        },
    ];


    return (
        <div
            dir="rtl"
            className="min-h-screen bg-slate-100"
        >

            <header className="border-b bg-white">

                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                            <Hotel size={23} />
                        </div>

                        <div>
                            <p className="font-black">
                                هتل
                            </p>

                            <p className="text-xs text-slate-500">
                                خوش آمدید {auth?.user?.name}
                            </p>
                        </div>

                    </div>


                    <nav className="flex flex-wrap gap-2">

                        {links.map((item) => {

                            const Icon = item.icon;

                            const active =
                                currentPath ===
                                    item.href ||
                                (
                                    item.href !==
                                    '/dashboard' &&
                                    currentPath.startsWith(
                                        item.href
                                    )
                                );

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm ${
                                        active
                                            ? 'bg-slate-950 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <Icon size={17} />

                                    {item.title}
                                </Link>
                            );
                        })}


                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut size={17} />

                            خروج
                        </Link>

                    </nav>

                </div>

            </header>


            <main className="mx-auto max-w-7xl px-6 py-8">
                {children}
            </main>

        </div>
    );
}