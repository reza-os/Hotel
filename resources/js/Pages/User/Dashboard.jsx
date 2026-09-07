import {
    Head,
    Link,
} from '@inertiajs/react';

import UserLayout from '@/Layouts/UserLayout';

import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    History,
    BedDouble,
    ArrowLeft,
} from 'lucide-react';


const statusInfo = {
    pending: {
        label: 'در انتظار تایید',
        className:
            'bg-amber-100 text-amber-700',
    },

    confirmed: {
        label: 'تایید شده',
        className:
            'bg-emerald-100 text-emerald-700',
    },

    rejected: {
        label: 'رد شده',
        className:
            'bg-red-100 text-red-700',
    },

    cancelled: {
        label: 'لغو شده',
        className:
            'bg-gray-100 text-gray-600',
    },

    completed: {
        label: 'تکمیل شده',
        className:
            'bg-blue-100 text-blue-700',
    },
};


function StatCard({
    title,
    value = 0,
    icon: Icon,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-black text-gray-900">
                        {value}
                    </p>

                </div>

                <div className="rounded-xl bg-[#F8F1D9] p-3 text-[#A98518]">
                    <Icon size={23} />
                </div>

            </div>

        </div>
    );
}


function StatusBadge({ status }) {

    const info =
        statusInfo[status] ?? {
            label: 'نامشخص',
            className:
                'bg-gray-100 text-gray-600',
        };

    return (
        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1.5
                text-xs
                font-bold
                ${info.className}
            `}
        >
            {info.label}
        </span>
    );
}


export default function Dashboard({
    stats = {},
    nextReservation = null,
    recentReservations = [],
}) {

    return (
        <UserLayout>

            <Head title="داشبورد کاربری" />


            {/* Welcome */}

            <section
                className="
                    mb-8
                    overflow-hidden
                    rounded-3xl
                    bg-gray-950
                    px-7
                    py-8
                    text-white
                    md:px-10
                "
            >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <span className="text-sm font-medium text-[#C9A227]">
                            پنل کاربری
                        </span>

                        <h1 className="mt-2 text-3xl font-black">
                            اقامت بعدی خود را مدیریت کنید
                        </h1>

                        <p className="mt-3 max-w-xl leading-8 text-gray-400">
                            وضعیت رزروهای خود را مشاهده کنید یا
                            یک اتاق جدید برای اقامت بعدی انتخاب کنید.
                        </p>

                    </div>


                    <Link
                        href="/rooms"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-[#C9A227]
                            px-6
                            py-3
                            font-bold
                            text-white
                            transition
                            hover:bg-[#b69120]
                        "
                    >
                        رزرو اتاق جدید

                        <ArrowLeft size={18} />
                    </Link>

                </div>

            </section>


            {/* Stats */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                    title="همه رزروها"
                    value={stats.total ?? 0}
                    icon={CalendarDays}
                />

                <StatCard
                    title="در انتظار تایید"
                    value={stats.pending ?? 0}
                    icon={Clock3}
                />

                <StatCard
                    title="تایید شده"
                    value={stats.confirmed ?? 0}
                    icon={CheckCircle2}
                />

                <StatCard
                    title="تکمیل شده"
                    value={stats.completed ?? 0}
                    icon={History}
                />

            </div>


            {/* Next reservation */}

            <section className="mt-9">

                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-black text-gray-900">
                        رزرو آینده
                    </h2>

                    <Link
                        href="/my-reservations"
                        className="text-sm font-medium text-[#A98518]"
                    >
                        همه رزروها
                    </Link>

                </div>


                {nextReservation ? (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-gray-100
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div className="grid gap-6 md:grid-cols-4 md:items-center">

                            <div>

                                <p className="text-xs text-gray-500">
                                    اتاق
                                </p>

                                <h3 className="mt-1 text-lg font-black">
                                    {nextReservation.room?.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    شماره اتاق{' '}
                                    {nextReservation.room?.room_number}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    تاریخ ورود
                                </p>

                                <p className="mt-2 font-bold">
                                    {nextReservation.check_in}
                                </p>

                            </div>


                            <div>

                                <p className="text-xs text-gray-500">
                                    تاریخ خروج
                                </p>

                                <p className="mt-2 font-bold">
                                    {nextReservation.check_out}
                                </p>

                            </div>


                            <div>

                                <p className="mb-2 text-xs text-gray-500">
                                    وضعیت
                                </p>

                                <StatusBadge
                                    status={
                                        nextReservation.status
                                    }
                                />

                            </div>

                        </div>

                    </div>

                ) : (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-gray-300
                            bg-white
                            p-10
                            text-center
                        "
                    >

                        <BedDouble
                            size={44}
                            className="mx-auto text-gray-300"
                        />

                        <h3 className="mt-4 font-bold text-gray-800">
                            هنوز رزرو فعالی ندارید
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            اتاق مناسب خود را انتخاب و رزرو کنید.
                        </p>

                        <Link
                            href="/rooms"
                            className="
                                mt-5
                                inline-flex
                                rounded-xl
                                bg-gray-950
                                px-5
                                py-2.5
                                text-sm
                                text-white
                            "
                        >
                            مشاهده اتاق‌ها
                        </Link>

                    </div>

                )}

            </section>


            {/* Recent reservations */}

            <section
                className="
                    mt-9
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                "
            >

                <div className="flex items-center justify-between border-b p-5">

                    <div>

                        <h2 className="font-black">
                            آخرین رزروها
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            آخرین درخواست‌های رزرو شما
                        </p>

                    </div>


                    <Link
                        href="/my-reservations"
                        className="text-sm font-medium text-[#A98518]"
                    >
                        مشاهده همه
                    </Link>

                </div>


                {recentReservations.length === 0 ? (

                    <div className="p-10 text-center text-sm text-gray-500">
                        هنوز رزروی ثبت نشده است.
                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[650px] text-right">

                            <thead className="bg-gray-50 text-sm text-gray-500">

                                <tr>
                                    <th className="p-4">
                                        اتاق
                                    </th>

                                    <th className="p-4">
                                        ورود
                                    </th>

                                    <th className="p-4">
                                        خروج
                                    </th>

                                    <th className="p-4">
                                        وضعیت
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {recentReservations.map(
                                    (reservation) => (

                                        <tr
                                            key={reservation.id}
                                            className="border-t border-gray-100"
                                        >

                                            <td className="p-4 font-medium">
                                                {reservation.room?.title ??
                                                    'اتاق'}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {reservation.check_in}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {reservation.check_out}
                                            </td>

                                            <td className="p-4">

                                                <StatusBadge
                                                    status={
                                                        reservation.status
                                                    }
                                                />

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </UserLayout>
    );
}