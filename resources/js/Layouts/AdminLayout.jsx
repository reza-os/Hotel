import { Link, usePage } from '@inertiajs/react';

import {
    LayoutDashboard,
    BedDouble,
    CalendarCheck,
    Users,
    Star,
    ChartNoAxesCombined,
    Settings,
    LogOut,
    Hotel,
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

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
        {
            title: 'مشتریان',
            href: '/admin/customers',
            icon: Users,
        },
        {
            title: 'نظرات',
            href: '/admin/reviews',
            icon: Star,
        },
        {
            title: 'گزارش‌ها',
            href: '/admin/reports',
            icon: ChartNoAxesCombined,
        },
        {
            title: 'تنظیمات',
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    const currentPath = window.location.pathname;

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-slate-100"
        >
            <aside className="fixed right-0 top-0 z-40 h-screen w-64 border-l border-slate-800 bg-slate-950 text-white">
                <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
                        <Hotel size={24} />
                    </div>

                    <div>
                        <h1 className="font-bold">
                            مدیریت هتل
                        </h1>

                        <p className="text-xs text-slate-400">
                            Hotel Management
                        </p>
                    </div>
                </div>

                <nav className="space-y-2 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const active =
                            currentPath === item.href ||
                            (
                                item.href !== '/admin/dashboard' &&
                                currentPath.startsWith(item.href)
                            );

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                    active
                                        ? 'bg-white text-slate-950'
                                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                }`}
                            >
                                <Icon size={20} />

                                <span>
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                    >
                        <LogOut size={20} />

                        خروج
                    </Link>
                </div>
            </aside>

            <main className="mr-64 min-h-screen">
                <header className="flex h-20 items-center justify-between border-b bg-white px-8">
                    <div>
                        <h2 className="font-bold text-slate-800">
                            پنل مدیریت هتل
                        </h2>
                    </div>

                    <div className="text-left">
                        <p className="font-medium text-slate-800">
                            {auth?.user?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            مدیر سیستم
                        </p>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}