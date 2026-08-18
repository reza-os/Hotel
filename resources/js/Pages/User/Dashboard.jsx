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
} from 'lucide-react';


const statusLabels = {
    pending: 'در انتظار تایید',
    confirmed: 'تایید شده',
    rejected: 'رد شده',
    cancelled: 'لغو شده',
    completed: 'تکمیل شده',
};


function StatCard({
    title,
    value,
    icon: Icon,
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-black">
                        {value}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3">
                    <Icon size={23} />
                </div>

            </div>

        </div>
    );
}


export default function Dashboard({
    stats,
    nextReservation,
    recentReservations = [],
}) {

    return (
        <UserLayout>

            <Head title="داشبورد کاربری" />


            <div className="mb-8">

                <h1 className="text-2xl font-black text-slate-900">
                    داشبورد من
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    وضعیت رزروهای شما
                </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                    title="همه رزروها"
                    value={stats.total}
                    icon={CalendarDays}
                />

                <StatCard
                    title="در انتظار"
                    value={stats.pending}
                    icon={Clock3}
                />

                <StatCard
                    title="تایید شده"
                    value={stats.confirmed}
                    icon={CheckCircle2}
                />

                <StatCard
                    title="تکمیل شده"
                    value={stats.completed}
                    icon={History}
                />

            </div>


            {/* رزرو آینده */}

            <div className="mt-8">

                <h2 className="mb-4 text-lg font-black">
                    رزرو آینده
                </h2>


                {nextReservation ? (

                    <div className="rounded-2xl bg-slate-950 p-6 text-white">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    اتاق
                                </p>

                                <h3 className="mt-1 text-xl font-black">
                                    {nextReservation.room?.title}
                                </h3>

                                <p className="mt-1 text-sm text-slate-300">
                                    شماره اتاق{' '}
                                    {nextReservation.room?.room_number}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-400">
                                    ورود
                                </p>

                                <p className="mt-1 font-bold">
                                    {nextReservation.check_in}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-400">
                                    خروج
                                </p>

                                <p className="mt-1 font-bold">
                                    {nextReservation.check_out}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-400">
                                    وضعیت
                                </p>

                                <p className="mt-1 font-bold">
                                    {
                                        statusLabels[
                                            nextReservation.status
                                        ]
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed bg-white p-10 text-center">

                        <BedDouble
                            size={42}
                            className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-slate-500">
                            رزرو فعالی ندارید.
                        </p>

                        <Link
                            href="/rooms"
                            className="mt-4 inline-block rounded-xl bg-slate-950 px-5 py-2 text-sm text-white"
                        >
                            رزرو اتاق
                        </Link>

                    </div>

                )}

            </div>


            {/* آخرین رزروها */}

            <div className="mt-8 rounded-2xl border bg-white">

                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="font-black">
                        آخرین رزروها
                    </h2>

                    <Link
                        href="/my-reservations"
                        className="text-sm text-slate-600"
                    >
                        مشاهده همه
                    </Link>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-right">

                        <thead className="bg-slate-50 text-sm text-slate-500">

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
                                        className="border-t"
                                    >

                                        <td className="p-4">
                                            {reservation.room?.title}
                                        </td>

                                        <td className="p-4">
                                            {reservation.check_in}
                                        </td>

                                        <td className="p-4">
                                            {reservation.check_out}
                                        </td>

                                        <td className="p-4">
                                            {
                                                statusLabels[
                                                    reservation.status
                                                ]
                                            }
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </UserLayout>
    );
}