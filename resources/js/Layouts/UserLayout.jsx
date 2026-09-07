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
    Home,
} from 'lucide-react';


export default function UserLayout({ children }) {

    const page = usePage();

    const { auth } = page.props;

    const currentPath =
        page.url.split('?')[0];


    const links = [
        {
            title: 'صفحه اصلی',
            href: '/',
            icon: Home,
        },
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
            className="min-h-screen bg-[#F8F6F1]"
        >

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

                <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Brand */}

                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-[#C9A227]">
                                <Hotel size={23} />
                            </div>

                            <div>
                                <p className="font-black text-gray-900">
                                    هتل آریا
                                </p>

                                <p className="text-xs text-gray-500">
                                    خوش آمدید، {auth?.user?.name}
                                </p>
                            </div>
                        </Link>


                        {/* Navigation */}

                        <nav className="flex flex-wrap items-center gap-2">

                            {links.map((item) => {

                                const Icon = item.icon;

                                const active =
                                    item.href === '/'
                                        ? currentPath === '/'
                                        : currentPath === item.href ||
                                          currentPath.startsWith(
                                              `${item.href}/`
                                          );

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            px-3
                                            py-2.5
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                active
                                                    ? 'bg-gray-950 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#A98518]'
                                            }
                                        `}
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
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition
                                    hover:bg-red-50
                                "
                            >
                                <LogOut size={17} />

                                خروج
                            </Link>

                        </nav>

                    </div>

                </div>

            </header>


            <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                {children}
            </main>

        </div>
    );
}