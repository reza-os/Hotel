import {
    Head,
    Link,
    router,
    usePage,
} from '@inertiajs/react';

import UserLayout from '@/Layouts/UserLayout';

import { X } from 'lucide-react';


const statusLabels = {
    pending: 'در انتظار تایید',
    confirmed: 'تایید شده',
    rejected: 'رد شده',
    cancelled: 'لغو شده',
    completed: 'تکمیل شده',
};


export default function Index({
    reservations = [],
}) {


    const { errors } = usePage().props;

    const cancelReservation = (reservation) => {
        if (!confirm('آیا از لغو این رزرو مطمئن هستید؟')) {
            return;
        }

        router.patch(
            `/my-reservations/${reservation.id}/cancel`,
            {},
            {
                preserveScroll: true,
            }
        );
    };


   return (
    <UserLayout>
            <Head title="رزروهای من" />

           

                <div className="mx-auto max-w-6xl">

                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-2xl font-black">
                                رزروهای من
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                مشاهده وضعیت درخواست‌های رزرو
                            </p>
                        </div>

                        <Link
                            href="/rooms"
                            className="rounded-xl bg-slate-950 px-4 py-2 text-sm text-white"
                        >
                            رزرو جدید
                        </Link>

                    </div>


                    {errors?.reservation && (
                        <div className="mb-5 rounded-xl bg-red-100 p-4 text-sm text-red-700">
                            {errors.reservation}
                        </div>
                    )}


                    <div className="overflow-hidden rounded-2xl bg-white">

                        <table className="w-full text-right">

                            <thead className="bg-slate-50">
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
                                        مبلغ
                                    </th>

                                    <th className="p-4">
                                        وضعیت
                                    </th>

                                    <th className="p-4">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>


                            <tbody>

                                {reservations.map(
                                    (reservation) => (

                                        <tr
                                            key={reservation.id}
                                            className="border-t"
                                        >

                                            <td className="p-4">
                                                {reservation.room?.title}
                                                <div className="text-xs text-slate-500">
                                                    اتاق{' '}
                                                    {reservation.room?.room_number}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                {reservation.check_in}
                                            </td>

                                            <td className="p-4">
                                                {reservation.check_out}
                                            </td>

                                            <td className="p-4">
                                                {Number(
                                                    reservation.total_price
                                                ).toLocaleString(
                                                    'fa-IR'
                                                )}
                                                {' '}تومان
                                            </td>

                                            <td className="p-4 font-bold">
                                                {statusLabels[reservation.status] ?? 'نامشخص'}
                                            </td>

                                            <td className="p-4">

                                                {reservation.can_cancel ? (
                                                    <button
                                                        onClick={() =>
                                                            cancelReservation(reservation)
                                                        }
                                                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600"
                                                    >
                                                        <X size={15} />

                                                        لغو رزرو
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        -
                                                    </span>
                                                )}

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