import {
    Head,
    Link,
    useForm,
} from '@inertiajs/react';

import {
    BedDouble,
    Users,
    Search,
    Wifi,
    Tv,
    Wind,
    Bath,
} from 'lucide-react';


const typeLabels = {
    single: 'یک نفره',
    double: 'دو نفره',
    suite: 'سوئیت',
    deluxe: 'دلوکس',
};


export default function Index({
    rooms = [],
    filters = {},
}) {

    const {
        data,
        setData,
        get,
        processing,
        errors,
    } = useForm({
        check_in: filters.check_in ?? '',
        check_out: filters.check_out ?? '',
        guests: filters.guests ?? '',
    });


    const search = (e) => {
        e.preventDefault();

        get('/rooms', {
            preserveScroll: true,
            preserveState: true,
        });
    };


    return (
        <>
            <Head title="اتاق‌های هتل" />

            <div
                dir="rtl"
                className="min-h-screen bg-slate-100"
            >

                {/* Header */}

                <header className="border-b bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                        <div>
                            <h1 className="text-xl font-black text-slate-900">
                                رزرو هتل
                            </h1>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-slate-600"
                            >
                                داشبورد
                            </Link>

                            <Link
                                href="/rooms"
                                className="text-sm font-bold text-slate-950"
                            >
                                اتاق‌ها
                            </Link>
                        </div>

                    </div>
                </header>


                <main className="mx-auto max-w-7xl px-6 py-10">

                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900">
                            انتخاب اتاق
                        </h2>

                        <p className="mt-2 text-slate-500">
                            تاریخ اقامت و تعداد مهمانان را انتخاب کنید.
                        </p>
                    </div>


                    {/* جستجو */}

                    <form
                        onSubmit={search}
                        className="mb-10 grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-4"
                    >

                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                تاریخ ورود
                            </label>

                            <input
                                type="date"
                                value={data.check_in}
                                onChange={(e) =>
                                    setData(
                                        'check_in',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border-slate-300"
                            />

                            {errors.check_in && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.check_in}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                تاریخ خروج
                            </label>

                            <input
                                type="date"
                                value={data.check_out}
                                onChange={(e) =>
                                    setData(
                                        'check_out',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border-slate-300"
                            />

                            {errors.check_out && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.check_out}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                تعداد مهمان
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={data.guests}
                                onChange={(e) =>
                                    setData(
                                        'guests',
                                        e.target.value
                                    )
                                }
                                placeholder="مثلاً 2"
                                className="w-full rounded-xl border-slate-300"
                            />
                        </div>


                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-white"
                            >
                                <Search size={18} />

                                جستجوی اتاق
                            </button>
                        </div>

                    </form>


                    {/* اتاق‌ها */}

                    {rooms.length === 0 ? (

                        <div className="rounded-2xl bg-white p-12 text-center">
                            <BedDouble
                                size={45}
                                className="mx-auto mb-4 text-slate-400"
                            />

                            <h3 className="font-bold text-slate-800">
                                اتاقی پیدا نشد
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                تاریخ یا تعداد مهمانان را تغییر دهید.
                            </p>
                        </div>

                    ) : (

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {rooms.map((room) => (

                                <div
                                    key={room.id}
                                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                                >

                                    {room.image ? (

                                        <img
                                            src={`/storage/${room.image}`}
                                            alt={room.title}
                                            className="h-52 w-full object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-52 items-center justify-center bg-slate-200">
                                            <BedDouble
                                                size={50}
                                                className="text-slate-400"
                                            />
                                        </div>

                                    )}


                                    <div className="p-5">

                                        <div className="flex items-start justify-between">

                                            <div>
                                                <h3 className="text-lg font-black text-slate-900">
                                                    {room.title}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    اتاق {room.room_number}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                                                {typeLabels[room.type] ?? room.type}
                                            </span>

                                        </div>


                                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">

                                            <Users size={17} />

                                            ظرفیت {room.capacity} نفر

                                        </div>


                                        {/* امکانات */}

                                        {room.amenities?.length > 0 && (

                                            <div className="mt-4 flex flex-wrap gap-2">

                                                {room.amenities.includes('wifi') && (
                                                    <span className="rounded-lg bg-slate-100 p-2">
                                                        <Wifi size={16} />
                                                    </span>
                                                )}

                                                {room.amenities.includes('tv') && (
                                                    <span className="rounded-lg bg-slate-100 p-2">
                                                        <Tv size={16} />
                                                    </span>
                                                )}

                                                {room.amenities.includes('air_conditioner') && (
                                                    <span className="rounded-lg bg-slate-100 p-2">
                                                        <Wind size={16} />
                                                    </span>
                                                )}

                                                {room.amenities.includes('private_bathroom') && (
                                                    <span className="rounded-lg bg-slate-100 p-2">
                                                        <Bath size={16} />
                                                    </span>
                                                )}

                                            </div>

                                        )}


                                        <div className="mt-6 flex items-center justify-between border-t pt-4">

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    هر شب
                                                </p>

                                                <p className="font-black text-slate-900">
                                                    {Number(
                                                        room.price
                                                    ).toLocaleString(
                                                        'fa-IR'
                                                    )}
                                                    {' '}تومان
                                                </p>
                                            </div>


                                          <Link
    href={`/rooms/${room.id}?check_in=${filters.check_in ?? ''}&check_out=${filters.check_out ?? ''}&guests=${filters.guests ?? ''}`}
    className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
>
    مشاهده و رزرو
</Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>
        </>
    );
}