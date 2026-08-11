import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowRight, Save } from 'lucide-react';

export default function Create() {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        room_number: '',
        title: '',
        type: '',
        capacity: 1,
        price: '',
        description: '',
    });


    const submit = (e) => {
        e.preventDefault();

        post('/admin/rooms');
    };


    return (
        <AdminLayout>

            <Head title="افزودن اتاق" />


            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-black text-slate-900">
                        افزودن اتاق
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        اطلاعات اتاق جدید را وارد کنید
                    </p>
                </div>


                <Link
                    href="/admin/rooms"
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm"
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


                    {/* شماره اتاق */}

                    <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            شماره اتاق
                        </label>

                        <input
                            type="text"
                            value={data.room_number}
                            onChange={(e) =>
                                setData(
                                    'room_number',
                                    e.target.value
                                )
                            }
                            placeholder="مثلاً 101"
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        />

                        {errors.room_number && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.room_number}
                            </p>
                        )}
                    </div>


                    {/* عنوان */}

                    <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            عنوان اتاق
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                setData(
                                    'title',
                                    e.target.value
                                )
                            }
                            placeholder="مثلاً اتاق دلوکس"
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        />

                        {errors.title && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>


                    {/* نوع */}

                    <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            نوع اتاق
                        </label>

                        <select
                            value={data.type}
                            onChange={(e) =>
                                setData(
                                    'type',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        >
                            <option value="">
                                انتخاب نوع
                            </option>

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

                        {errors.type && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.type}
                            </p>
                        )}
                    </div>


                    {/* ظرفیت */}

                    <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            ظرفیت
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.capacity}
                            onChange={(e) =>
                                setData(
                                    'capacity',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        />

                        {errors.capacity && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.capacity}
                            </p>
                        )}
                    </div>


                    {/* قیمت */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            قیمت هر شب
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    e.target.value
                                )
                            }
                            placeholder="مثلاً 3500000"
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        />

                        {errors.price && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.price}
                            </p>
                        )}

                    </div>


                    {/* توضیحات */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-bold text-slate-700">
                            توضیحات
                        </label>

                        <textarea
                            rows="5"
                            value={data.description}
                            onChange={(e) =>
                                setData(
                                    'description',
                                    e.target.value
                                )
                            }
                            placeholder="توضیحات مربوط به اتاق..."
                            className="w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                        />

                        {errors.description && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}

                    </div>

                </div>


                <div className="mt-8 flex justify-end">

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
                    >
                        <Save size={18} />

                        {processing
                            ? 'در حال ثبت...'
                            : 'ثبت اتاق'}
                    </button>

                </div>

            </form>

        </AdminLayout>
    );
}