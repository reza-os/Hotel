import {
    Head,
    Link,
    useForm,
} from '@inertiajs/react';

import {
    ArrowRight,
    BedDouble,
    Users,
    CalendarDays,
} from 'lucide-react';


export default function Show({
    room,
    booking,
}) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        room_id: room.id,
        check_in: booking?.check_in ?? '',
        check_out: booking?.check_out ?? '',
        guests: booking?.guests ?? 1,
    });


    const calculateNights = () => {

        if (
            !data.check_in ||
            !data.check_out
        ) {
            return 0;
        }

        const checkIn =
            new Date(data.check_in);

        const checkOut =
            new Date(data.check_out);

        const difference =
            checkOut - checkIn;

        if (difference <= 0) {
            return 0;
        }

        return Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        );
    };


    const nights = calculateNights();

    const totalPrice =
        nights * Number(room.price);


    const submit = (e) => {
        e.preventDefault();

        post('/reservations');
    };


    return (
        <>
            <Head title={room.title} />

            <div
                dir="rtl"
                className="min-h-screen bg-slate-100"
            >

                <main className="mx-auto max-w-7xl px-6 py-10">

                    <Link
                        href="/rooms"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600"
                    >
                        <ArrowRight size={18} />

                        بازگشت به اتاق‌ها
                    </Link>


                    <div className="grid gap-8 lg:grid-cols-3">


                        {/* اطلاعات اتاق */}

                        <div className="overflow-hidden rounded-2xl bg-white lg:col-span-2">

                            {room.image ? (

                                <img
                                    src={`/storage/${room.image}`}
                                    alt={room.title}
                                    className="h-96 w-full object-cover"
                                />

                            ) : (

                                <div className="flex h-96 items-center justify-center bg-slate-200">

                                    <BedDouble
                                        size={70}
                                        className="text-slate-400"
                                    />

                                </div>
                            )}


                            <div className="p-7">

                                <h1 className="text-3xl font-black text-slate-900">
                                    {room.title}
                                </h1>


                                <p className="mt-2 text-slate-500">
                                    اتاق شماره {room.room_number}
                                </p>


                                <div className="mt-5 flex items-center gap-2">

                                    <Users size={18} />

                                    ظرفیت {room.capacity} نفر

                                </div>


                                {room.description && (

                                    <p className="mt-6 leading-8 text-slate-600">
                                        {room.description}
                                    </p>

                                )}


                                {room.amenities?.length > 0 && (

                                    <div className="mt-7">

                                        <h3 className="mb-3 font-bold">
                                            امکانات اتاق
                                        </h3>

                                        <div className="flex flex-wrap gap-2">

                                            {room.amenities.map(
                                                (amenity) => (

                                                    <span
                                                        key={amenity}
                                                        className="rounded-lg bg-slate-100 px-3 py-2 text-sm"
                                                    >
                                                        {amenity}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* فرم رزرو */}

                        <div>

                            <form
                                onSubmit={submit}
                                className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm"
                            >

                                <h2 className="text-xl font-black">
                                    رزرو اتاق
                                </h2>


                                <div className="mt-6">

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


                                <div className="mt-4">

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


                                <div className="mt-4">

                                    <label className="mb-2 block text-sm font-bold">
                                        تعداد مهمانان
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        max={room.capacity}
                                        value={data.guests}
                                        onChange={(e) =>
                                            setData(
                                                'guests',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border-slate-300"
                                    />

                                    {errors.guests && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.guests}
                                        </p>
                                    )}

                                </div>


                                {errors.reservation && (

                                    <div className="mt-5 rounded-xl bg-red-100 p-3 text-sm text-red-700">
                                        {errors.reservation}
                                    </div>

                                )}


                                <div className="mt-6 border-t pt-5">

                                    <div className="flex justify-between text-sm">

                                        <span>
                                            قیمت هر شب
                                        </span>

                                        <span>
                                            {Number(
                                                room.price
                                            ).toLocaleString(
                                                'fa-IR'
                                            )}
                                            {' '}تومان
                                        </span>

                                    </div>


                                    <div className="mt-3 flex justify-between text-sm">

                                        <span>
                                            تعداد شب
                                        </span>

                                        <span>
                                            {nights}
                                        </span>

                                    </div>


                                    <div className="mt-5 flex justify-between border-t pt-4">

                                        <span className="font-bold">
                                            مبلغ کل
                                        </span>

                                        <span className="text-lg font-black">
                                            {totalPrice.toLocaleString(
                                                'fa-IR'
                                            )}
                                            {' '}تومان
                                        </span>

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        nights <= 0
                                    }
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white disabled:opacity-50"
                                >
                                    <CalendarDays size={18} />

                                    {processing
                                        ? 'در حال ثبت...'
                                        : 'ثبت درخواست رزرو'}
                                </button>

                            </form>

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}