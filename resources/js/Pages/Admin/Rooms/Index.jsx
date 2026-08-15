import {
    Head,
    Link,
    router,
    usePage,
} from '@inertiajs/react';

import { useState } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';
import {
    Power,
    Hammer,
    CheckCircle2,
    Plus,
    Pencil,
    Trash2,
} from 'lucide-react';


const statuses = {
    available: {
        text: 'خالی',
        className:
            'bg-emerald-100 text-emerald-700',
    },

    occupied: {
        text: 'اشغال',
        className:
            'bg-red-100 text-red-700',
    },

    pending: {
        text: 'رزرو در انتظار',
        className:
            'bg-amber-100 text-amber-700',
    },

    maintenance: {
        text: 'در تعمیر',
        className:
            'bg-orange-100 text-orange-700',
    },

    inactive: {
        text: 'غیرفعال',
        className:
            'bg-slate-200 text-slate-600',
    },
};


export default function Index({ rooms }) {
    const [filter, setFilter] = useState('all');

    const { errors } = usePage().props;

    const deleteRoom = (room) => {
        const confirmed = confirm(
            `آیا از حذف اتاق ${room.room_number} مطمئن هستید؟`
        );

        if (!confirmed) {
            return;
        }

        router.delete(
            `/admin/rooms/${room.id}`,
            {
                preserveScroll: true,
            }
        );
    };

    const toggleActive = (room) => {
        router.patch(
            `/admin/rooms/${room.id}/toggle-active`,
            {},
            {
                preserveScroll: true,
            }
        );
    };


    const changeStatus = (
        room,
        operationalStatus
    ) => {
        router.patch(
            `/admin/rooms/${room.id}/status`,
            {
                operational_status:
                    operationalStatus,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const filteredRooms =
    filter === 'all'
        ? rooms
        : rooms.filter(
            (room) => room.current_status === filter
        );


    return (
        <AdminLayout>

            <Head title="مدیریت اتاق‌ها" />

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-black text-slate-900">
                        مدیریت اتاق‌ها
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        مشاهده و تغییر وضعیت اتاق‌های هتل
                    </p>
                </div>


                <Link
                    href="/admin/rooms/create"
                    className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
                >
                    <Plus size={18} />

                    افزودن اتاق
                </Link>

            </div>

            
                        <div className="mb-4 flex flex-wrap gap-2">
                            {[
                                ['all', 'همه'],
                                ['available', 'خالی'],
                                ['occupied', 'اشغال'],
                                ['pending', 'در انتظار رزرو'],
                                ['maintenance', 'در تعمیر'],
                                ['inactive', 'غیرفعال'],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    onClick={() => setFilter(value)}
                                    className={`rounded-xl px-4 py-2 text-sm ${filter === value
                                            ? 'bg-slate-950 text-white'
                                            : 'border bg-white text-slate-600'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>


                        {errors?.room && (
                            <div className="mb-5 rounded-xl bg-red-100 p-4 text-sm text-red-700">
                                {errors.room}
                            </div>
                        )}


            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                <table className="w-full text-right">

                    <thead className="bg-slate-50 text-sm text-slate-500">
                        <tr>
                            <th className="p-4">
                                شماره
                            </th>

                            <th className="p-4">
                                نام اتاق
                            </th>

                            <th className="p-4">
                                نوع
                            </th>

                            <th className="p-4">
                                ظرفیت
                            </th>

                            <th className="p-4">
                                قیمت
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


                        {filteredRooms.map((room) => {

                            const status =
                                statuses[
                                room.current_status
                                ];

                            return (
                                <tr
                                    key={room.id}
                                    className="border-t border-slate-100"
                                >

                                    <td className="p-4 font-bold">
                                        {room.room_number}
                                    </td>


                                    <td className="p-4">
                                        {room.title}
                                    </td>


                                    <td className="p-4">
                                        {room.type}
                                    </td>


                                    <td className="p-4">
                                        {room.capacity} نفر
                                    </td>


                                    <td className="p-4">
                                        {Number(
                                            room.price
                                        ).toLocaleString(
                                            'fa-IR'
                                        )}
                                    </td>


                                    <td className="p-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                                        >
                                            {status.text}
                                        </span>

                                    </td>


                                    <td className="p-4">

                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                onClick={() =>
                                                    toggleActive(
                                                        room
                                                    )
                                                }
                                                className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs"
                                            >
                                                <Power size={15} />

                                                {room.is_active
                                                    ? 'غیرفعال'
                                                    : 'فعال'}
                                            </button>


                                            {room.operational_status ===
                                                'ready' ? (

                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            room,
                                                            'maintenance'
                                                        )
                                                    }
                                                    className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs"
                                                >
                                                    <Hammer
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    تعمیر
                                                </button>


                                            ) : (

                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            room,
                                                            'ready'
                                                        )
                                                    }
                                                    className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs"
                                                >
                                                    <CheckCircle2
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    آماده
                                                </button>

                                            )}

                                            <Link
                                                href={`/admin/rooms/${room.id}/edit`}
                                                className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700"
                                            >
                                                <Pencil size={15} />

                                                ویرایش
                                            </Link>


                                            <button
                                                onClick={() => deleteRoom(room)}
                                                className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                                            >
                                                <Trash2 size={15} />

                                                حذف
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
}