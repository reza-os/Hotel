import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

import {
    BedDouble,
    Bed,
    CalendarCheck,
    Hammer,
    Power,
    Clock3,
    DoorOpen,
    ArrowLeft,
} from 'lucide-react';


const statusLabels = {
    pending: 'در انتظار',
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

                    <p className="mt-2 text-3xl font-black text-slate-900">
                        {value}
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}


export default function Dashboard({
    stats,
    recentReservations,
}) {
    return (
        <AdminLayout>

            <Head title="داشبورد مدیریت" />

            <div>
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-900">
                        داشبورد
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        نمای کلی وضعیت هتل
                    </p>
                </div>


                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="کل اتاق‌ها"
                        value={stats.totalRooms}
                        icon={BedDouble}
                    />

                    <StatCard
                        title="اتاق‌های خالی امروز"
                        value={stats.availableRooms}
                        icon={DoorOpen}
                    />

                    <StatCard
                        title="اتاق‌های اشغال"
                        value={stats.occupiedRooms}
                        icon={Bed}
                    />

                    <StatCard
                        title="رزرو آینده"
                        value={stats.futureReservedRooms}
                        icon={CalendarCheck}
                    />

                    <StatCard
                        title="در حال تعمیر"
                        value={stats.maintenanceRooms}
                        icon={Hammer}
                    />

                    <StatCard
                        title="اتاق غیرفعال"
                        value={stats.inactiveRooms}
                        icon={Power}
                    />

                    <StatCard
                        title="رزرو در انتظار"
                        value={stats.pendingReservations}
                        icon={Clock3}
                    />

                    <StatCard
                        title="اتاق فعال"
                        value={stats.activeRooms}
                        icon={BedDouble}
                    />

                </div>


                <div className="mt-8 rounded-2xl border border-slate-200 bg-white">

                    <div className="flex items-center justify-between border-b border-slate-200 p-5">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                آخرین رزروها
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                آخرین درخواست‌های ثبت شده
                            </p>
                        </div>

                        <Link
                            href="/admin/reservations"
                            className="flex items-center gap-2 text-sm font-medium text-slate-700"
                        >
                            مشاهده همه

                            <ArrowLeft size={17} />
                        </Link>
                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full text-right">

                            <thead className="bg-slate-50 text-sm text-slate-500">
                                <tr>
                                    <th className="p-4">
                                        مشتری
                                    </th>

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
                                            className="border-t border-slate-100"
                                        >
                                            <td className="p-4">
                                                {reservation.user?.name ?? 'کاربر حذف شده'}
                                            </td>

                                            <td className="p-4">
                                                اتاق {reservation.room?.room_number}
                                            </td>

                                            <td className="p-4">
                                                {reservation.check_in}
                                            </td>

                                            <td className="p-4">
                                                {reservation.check_out}
                                            </td>

                                            <td className="p-4">
                                                {statusLabels[
                                                    reservation.status
                                                ]}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>

                        </table>

                    </div>

                </div>
            </div>

        </AdminLayout>
    );
}