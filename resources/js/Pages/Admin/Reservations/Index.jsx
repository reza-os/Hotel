import { Head, router, usePage } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";

import { Check, X } from "lucide-react";

const labels = {
    pending: "در انتظار",
    confirmed: "تایید شده",
    rejected: "رد شده",
    cancelled: "لغو شده",
    completed: "تکمیل شده",
};

export default function Index({ reservations = [] }) {
    const { errors } = usePage().props;

    const approve = (reservation) => {
        if (!confirm("آیا این رزرو تایید شود؟")) {
            return;
        }

        router.patch(
            `/admin/reservations/${reservation.id}/approve`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const reject = (reservation) => {
        if (!confirm("آیا از رد این رزرو مطمئن هستید؟")) {
            return;
        }

        router.patch(
            `/admin/reservations/${reservation.id}/reject`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AdminLayout>
            <Head title="مدیریت رزروها" />

            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900">
                    مدیریت رزروها
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    تایید یا رد درخواست‌های رزرو مشتریان
                </p>
            </div>

            {errors?.reservation && (
                <div className="mb-5 rounded-xl bg-red-100 p-4 text-sm text-red-700">
                    {errors.reservation}
                </div>
            )}

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[1000px] text-right">
                    <thead className="bg-slate-50 text-sm text-slate-500">
                        <tr>
                            <th className="p-4">مشتری</th>

                            <th className="p-4">اتاق</th>

                            <th className="p-4">ورود</th>

                            <th className="p-4">خروج</th>

                            <th className="p-4">مهمان</th>

                            <th className="p-4">مبلغ</th>

                            <th className="p-4">وضعیت</th>

                            <th className="p-4">عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.length === 0 && (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="p-10 text-center text-slate-500"
                                >
                                    هنوز رزروی ثبت نشده است.
                                </td>
                            </tr>
                        )}
                        {reservations.map((reservation) => (
                            <tr
                                key={reservation.id}
                                className="border-t border-slate-100"
                            >
                                <td className="p-4">
                                    <div className="font-medium">
                                        {reservation.user?.name}
                                    </div>

                                    <div className="text-xs text-slate-500">
                                        {reservation.user?.email}
                                    </div>
                                </td>

                                <td className="p-4">
                                    اتاق {reservation.room?.room_number}
                                </td>

                                <td className="p-4">{reservation.check_in}</td>

                                <td className="p-4">{reservation.check_out}</td>

                                <td className="p-4">{reservation.guests}</td>

                                <td className="p-4">
                                    {Number(
                                        reservation.total_price,
                                    ).toLocaleString("fa-IR")}{" "}
                                    تومان
                                </td>

                                <td className="p-4">
                                    {labels[reservation.status]}
                                </td>

                                <td className="p-4">
                                    {reservation.status === "pending" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    approve(reservation)
                                                }
                                                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs text-white"
                                            >
                                                <Check size={15} />
                                                تایید
                                            </button>

                                            <button
                                                onClick={() =>
                                                    reject(reservation)
                                                }
                                                className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs text-white"
                                            >
                                                <X size={15} />
                                                رد
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
