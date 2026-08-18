import {
    Head,
    Link,
} from '@inertiajs/react';


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
    return (
        <>
            <Head title="رزروهای من" />

            <div
                dir="rtl"
                className="min-h-screen bg-slate-100 p-8"
            >

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
        </>
    );
}