import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowRight, Save } from 'lucide-react';

export default function Edit({ room }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        room_number: room.room_number ?? '',
        title: room.title ?? '',
        type: room.type ?? '',
        capacity: room.capacity ?? 1,
        price: room.price ?? '',
        description: room.description ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/admin/rooms/${room.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="ویرایش اتاق" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">
                        ویرایش اتاق {room.room_number}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        اطلاعات اتاق را ویرایش کنید
                    </p>
                </div>

                <Link
                    href="/admin/rooms"
                    className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm"
                >
                    <ArrowRight size={18} />
                    بازگشت
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="rounded-2xl border border-slate-200 bg-white p-6"
            >
                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            شماره اتاق
                        </label>

                        <input
                            value={data.room_number}
                            onChange={(e) =>
                                setData('room_number', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        />

                        {errors.room_number && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.room_number}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            عنوان اتاق
                        </label>

                        <input
                            value={data.title}
                            onChange={(e) =>
                                setData('title', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        />

                        {errors.title && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            نوع اتاق
                        </label>

                        <select
                            value={data.type}
                            onChange={(e) =>
                                setData('type', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        >
                            <option value="single">
                                یک نفره
                            </option>

                            <option value="double">
                                دو نفره
                            </option>

                            <option value="suite">
                                سوئیت
                            </option>

                            <option value="deluxe">
                                دلوکس
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            ظرفیت
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.capacity}
                            onChange={(e) =>
                                setData('capacity', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        />

                        {errors.capacity && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.capacity}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-bold">
                            قیمت هر شب
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={data.price}
                            onChange={(e) =>
                                setData('price', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        />

                        {errors.price && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-bold">
                            توضیحات
                        </label>

                        <textarea
                            rows="5"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full rounded-xl border-slate-300"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        disabled={processing}
                        className="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-white disabled:opacity-50"
                    >
                        <Save size={18} />

                        {processing
                            ? 'در حال ذخیره...'
                            : 'ذخیره تغییرات'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}