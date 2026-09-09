import React, { useState } from "react";
import { Head, Link, router ,usePage } from "@inertiajs/react";

import {
    FaArrowLeft,
    FaBed,
    FaCalendarAlt,
    FaCar,
    FaCoffee,
    FaConciergeBell,
    FaEnvelope,
    FaMapMarkerAlt,
    FaParking,
    FaPhoneAlt,
    FaQuoteRight,
    FaStar,
    FaSwimmingPool,
    FaUser,
    FaUsers,
    FaUtensils,
    FaWifi,
} from "react-icons/fa";

import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";

export default function Home({
    hotel = null,
    featuredRooms = [],
    facilities = [],
    testimonials = [],
}) {
    /*
    |--------------------------------------------------------------------------
    | اطلاعات موقت
    |--------------------------------------------------------------------------
    |
    | بعداً این اطلاعات از Laravel دریافت می‌شوند.
    | اگر بک‌اند اطلاعات ارسال کند، اطلاعات بک‌اند استفاده می‌شود.
    |
    */

    const hotelData = hotel ?? {
        name: "هتل آریا",
        english_name: "ARIA HOTEL",

        phone: "09392738068",
        email: "info@ariahotel.ir",

        address: "تهران، خیابان ولیعصر، هتل آریا",

        description:
            "هتل آریا با محیطی آرام، طراحی مدرن و امکانات رفاهی کامل، تجربه‌ای متفاوت از اقامت را برای مهمانان خود فراهم می‌کند.",

        short_description:
            "ترکیبی از آرامش، کیفیت و مهمان‌نوازی برای ساختن اقامتی خاطره‌انگیز.",

        hero_image: "/pictures/hotel-banner.png",

        about_image: "/pictures/about-hotel.png",
    };

    /*
    |--------------------------------------------------------------------------
    | اتاق‌های موقت
    |--------------------------------------------------------------------------
    */

    const roomData = featuredRooms;

    /*
    |--------------------------------------------------------------------------
    | امکانات موقت
    |--------------------------------------------------------------------------
    */

    const facilityData =
        facilities.length > 0
            ? facilities
            : [
                {
                    id: 1,
                    title: "اینترنت رایگان",
                    description:
                        "اینترنت پرسرعت در اتاق‌ها و بخش‌های عمومی هتل.",

                    icon: "wifi",
                },

                {
                    id: 2,
                    title: "رستوران",
                    description:
                        "رستوران با منوی متنوع غذاهای ایرانی و بین‌المللی.",

                    icon: "restaurant",
                },

                  {
                      id: 3,
                      title: "پارکینگ اختصاصی",
                      description: "پارکینگ امن و اختصاصی برای مهمانان هتل.",

                    icon: "parking",
                },

                {
                    id: 4,
                    title: "خدمات ۲۴ ساعته",
                    description:
                        "پاسخگویی و خدمات‌رسانی در تمام ساعات شبانه‌روز.",

                    icon: "service",
                },

                {
                    id: 5,
                    title: "استخر",
                    description:
                        "فضای آرام و مجهز برای استراحت و تفریح مهمانان.",

                    icon: "pool",
                },

                  {
                      id: 6,
                      title: "صبحانه",
                      description: "صبحانه متنوع و تازه برای شروع یک روز عالی.",

                    icon: "breakfast",
                },
            ];

    const testimonialData =
        testimonials.length > 0
            ? testimonials
            : [
                {
                    id: 1,
                    name: "علی رضایی",

                    comment:
                        "محیط هتل بسیار آرام و تمیز بود و برخورد کارکنان واقعاً عالی بود.",

                    rating: 5,
                },

                {
                    id: 2,
                    name: "سارا احمدی",

                    comment:
                        "اتاق دلوکس بسیار زیبا بود و کیفیت خدمات از چیزی که انتظار داشتم بهتر بود.",

                    rating: 5,
                },

                {
                    id: 3,
                    name: "محمد کریمی",

                    comment:
                        "دسترسی مناسب، محیط تمیز و صبحانه خوب. تجربه اقامت بسیار رضایت‌بخشی بود.",

                    rating: 4,
                },
            ];

    /*
    |--------------------------------------------------------------------------
    | فرم جستجوی اتاق
    |--------------------------------------------------------------------------
    */

    const [filters, setFilters] = useState({
        check_in: "",
        check_out: "",
        guests: 1,
        room_type: "",
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const searchRooms = (event) => {
        event.preventDefault();

        /*
         * بعداً این اطلاعات به Laravel ارسال می‌شوند:
         *
         * /rooms?check_in=...&check_out=...
         */

        router.get("/rooms", filters);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("fa-IR").format(price);
    };

    const getRoomImage = (image) => {
        if (!image) {
            return "/pictures/rooms/default-room.png";
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("/")
        ) {
            return image;
        }

        return `/storage/${image}`;
    };


    const getRoomImage = (image) => {
        if (!image) {
            return "/pictures/rooms/room-1.jpg";
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("/")
        ) {
            return image;
        }

        return `/storage/${image}`;
    };




    return (
        <>
            <Head title={hotelData.name} />

            <main dir="rtl" className="bg-white text-gray-900">
                {/* =====================================
                    HERO
                ====================================== */}

                <section className="relative min-h-[780px]">
                    <img
                        src={hotelData.hero_image}
                        alt={hotelData.name}
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-l
                            from-black/75
                            via-black/45
                            to-black/20
                        "
                    />

                    <Navbar />

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            min-h-[780px]
                            max-w-7xl
                            items-center
                            px-6
                            pt-28
                            md:px-10
                            lg:px-12
                        "
                    >
                        <div className="max-w-2xl text-white">
                            <span
                                className="
                                    mb-5
                                    inline-block
                                    text-sm
                                    font-medium
                                    tracking-wider
                                    text-[#D4AF37]
                                    md:text-base
                                "
                            >
                                {hotelData.english_name}
                            </span>

                            <h1
                                className="
                                    mb-6
                                    text-4xl
                                    font-bold
                                    leading-[1.6]
                                    md:text-5xl
                                    lg:text-6xl
                                "
                            >
                                اقامتی متفاوت،
                                <br />
                                آرامشی ماندگار
                            </h1>

                            <p
                                className="
                                    mb-9
                                    max-w-xl
                                    text-base
                                    leading-9
                                    text-gray-200
                                    md:text-lg
                                "
                            >
                                {hotelData.short_description}
                            </p>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-4
                                "
                            >
                                <Link
                                    href="/rooms"
                                    className="
                                        rounded-lg
                                        bg-[#C9A227]
                                        px-7
                                        py-3.5
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-[#b69120]
                                    "
                                >
                                    مشاهده اتاق‌ها
                                </Link>

                                <a
                                    href="#about"
                                    className="
                                        rounded-lg
                                        border
                                        border-white/50
                                        px-7
                                        py-3.5
                                        text-white
                                        transition
                                        hover:bg-white
                                        hover:text-gray-900
                                    "
                                >
                                    درباره هتل
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Booking Search */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-1/2
                            z-20
                            w-[92%]
                            max-w-7xl
                            -translate-x-1/2
                            translate-y-1/2
                        "
                    >
                        <form
                            onSubmit={searchRooms}
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                rounded-2xl
                                bg-white
                                p-5
                                shadow-2xl
                                md:grid-cols-2
                                lg:grid-cols-5
                                lg:p-7
                            "
                        >
                            <BookingField
                                icon={<FaCalendarAlt />}
                                label="تاریخ ورود"
                            >
                                <input
                                    type="date"
                                    name="check_in"
                                    value={filters.check_in}
                                    onChange={handleFilterChange}
                                    className="booking-input"
                                />
                            </BookingField>

                            <BookingField
                                icon={<FaCalendarAlt />}
                                label="تاریخ خروج"
                            >
                                <input
                                    type="date"
                                    name="check_out"
                                    value={filters.check_out}
                                    onChange={handleFilterChange}
                                    className="booking-input"
                                />
                            </BookingField>

                            <BookingField
                                icon={<FaUsers />}
                                label="تعداد مهمان"
                            >
                                <select
                                    name="guests"
                                    value={filters.guests}
                                    onChange={handleFilterChange}
                                    className="booking-input"
                                >
                                    <option value="1">۱ نفر</option>
                                    <option value="2">۲ نفر</option>
                                    <option value="3">۳ نفر</option>
                                    <option value="4">۴ نفر</option>
                                    <option value="5">۵ نفر</option>
                                </select>
                            </BookingField>

                            <BookingField icon={<FaBed />} label="نوع اتاق">
                                <select
                                    name="room_type"
                                    value={filters.room_type}
                                    onChange={handleFilterChange}
                                    className="booking-input"
                                >
                                    <option value="">همه اتاق‌ها</option>
                                    <option value="standard">استاندارد</option>

                                    <option value="deluxe">دلوکس</option>

                                    <option value="suite">سوئیت</option>
                                </select>
                            </BookingField>

                            <button
                                type="submit"
                                className="
                                    min-h-[74px]
                                    rounded-xl
                                    bg-[#C9A227]
                                    px-6
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-[#b69120]
                                "
                            >
                                جستجوی اتاق
                            </button>
                        </form>
                    </div>
                </section>

                {/* =====================================
                    ABOUT
                ====================================== */}

                <section
                    id="about"
                    className="
                        mx-auto
                        grid
                        max-w-7xl
                        grid-cols-1
                        gap-12
                        px-6
                        pb-24
                        pt-40
                        md:px-10
                        lg:grid-cols-2
                        lg:items-center
                        lg:px-12
                    "
                >
                    <div className="relative">
                        <img
                            src={hotelData.about_image}
                            alt={`درباره ${hotelData.name}`}
                            className="
                                h-[450px]
                                w-full
                                rounded-2xl
                                object-cover
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-6
                                -left-3
                                rounded-xl
                                bg-[#C9A227]
                                px-8
                                py-6
                                text-white
                                shadow-lg
                                md:left-8
                            "
                        >
                            <strong className="block text-3xl">+۱۰</strong>

                            <span className="text-sm">سال تجربه میزبانی</span>
                        </div>
                    </div>

                    <div>
                        <SectionTitle
                            eyebrow="درباره هتل"
                            title="مهمان‌نوازی در قلب هتل آریا"
                        />

                        <p
                            className="
                                mt-6
                                leading-9
                                text-gray-600
                            "
                        >
                            {hotelData.description}
                        </p>

                        <p
                            className="
                                mt-4
                                leading-9
                                text-gray-600
                            "
                        >
                            تلاش ما فراهم کردن محیطی آرام، امکانات مناسب و خدمات
                            حرفه‌ای است تا اقامت شما به تجربه‌ای خاطره‌انگیز
                            تبدیل شود.
                        </p>

                        <Link
                            href="/about"
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-3
                                font-medium
                                text-[#A98518]
                                transition
                                hover:gap-4
                            "
                        >
                            بیشتر درباره هتل
                            <FaArrowLeft />
                        </Link>
                    </div>
                </section>

                {/* =====================================
                    ROOMS
                ====================================== */}

                <section
                    className="
                        bg-[#F8F6F1]
                        py-24
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            px-6
                            md:px-10
                            lg:px-12
                        "
                    >
                        <SectionTitle
                            centered
                            eyebrow="اقامت در آریا"
                            title="اتاق‌های منتخب هتل"
                            description="اتاقی متناسب با نیاز خود انتخاب کنید و اقامتی آرام و راحت را تجربه کنید."
                        />

                        <div
                            className="
                                mt-12
                                grid
                                grid-cols-1
                                gap-8
                                md:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {roomData.map((room) => (
                                <article
                                    key={room.id}
                                    className="
                                        group
                                        overflow-hidden
                                        rounded-2xl
                                        bg-white
                                        shadow-sm
                                        transition
                                        duration-300
                                        hover:-translate-y-2
                                        hover:shadow-xl
                                    "
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={getRoomImage(room.image)}
                                            alt={room.title}
                                            className="
                                                h-64
                                                w-full
                                                object-cover
                                                transition
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                right-4
                                                top-4
                                                rounded-full
                                                bg-black/60
                                                px-4
                                                py-2
                                                text-sm
                                                text-white
                                                backdrop-blur
                                            "
                                        >
                                            ظرفیت {room.capacity} نفر
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <h3
                                            className="
                                                mb-3
                                                text-xl
                                                font-bold
                                            "
                                        >
                                            {room.title}
                                        </h3>

                                        <p
                                            className="
                                                mb-5
                                                min-h-[64px]
                                                text-sm
                                                leading-8
                                                text-gray-600
                                            "
                                        >
                                            {room.description}
                                        </p>

                                        <div
                                            className="
                                                mb-6
                                                flex
                                                flex-wrap
                                                gap-2
                                            "
                                        >
                                            {room.amenities?.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    className="
                                                     rounded-full
                                                      bg-gray-100
                                                      px-3
                                                      py-1.5
                                                      text-xs
                                                        text-gray-600
                                                            "
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div
                                            className="
                                                flex
                                                items-end
                                                justify-between
                                                gap-4
                                                border-t
                                                border-gray-100
                                                pt-5
                                            "
                                        >
                                            <div>
                                                <span className="text-xs text-gray-500">
                                                    شروع قیمت از
                                                </span>

                                                <p
                                                    className="
                                                        mt-1
                                                        font-bold
                                                        text-[#A98518]
                                                    "
                                                >
                                                    {formatPrice(room.price)}

                                                    <span
                                                        className="
                                                            mr-1
                                                            text-xs
                                                            font-normal
                                                        "
                                                    >
                                                        تومان / شب
                                                    </span>
                                                </p>
                                            </div>

                                            <Link
                                                href={`/rooms/${room.id}`}
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-[#C9A227]
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-[#A98518]
                                                    transition
                                                    hover:bg-[#C9A227]
                                                    hover:text-white
                                                "
                                            >
                                                مشاهده اتاق
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/rooms"
                                className="
                                    inline-flex
                                    rounded-lg
                                    bg-gray-900
                                    px-8
                                    py-3.5
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-[#C9A227]
                                "
                            >
                                مشاهده همه اتاق‌ها
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================
                    FACILITIES
                ====================================== */}

                <section className="py-24">
                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            px-6
                            md:px-10
                            lg:px-12
                        "
                    >
                        <SectionTitle
                            centered
                            eyebrow="امکانات هتل"
                            title="هر آنچه برای یک اقامت راحت نیاز دارید"
                            description="خدمات و امکانات هتل آریا برای فراهم کردن آرامش و آسایش مهمانان طراحی شده‌اند."
                        />

                        <div
                            className="
                                mt-14
                                grid
                                grid-cols-1
                                gap-6
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {facilityData.map((facility) => (
                                <div
                                    key={facility.id}
                                    className="
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        p-7
                                        transition
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-[#C9A227]/40
                                        hover:shadow-lg
                                    "
                                >
                                    <div
                                        className="
                                            mb-5
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#F8F1D9]
                                            text-2xl
                                            text-[#A98518]
                                        "
                                    >
                                        <FacilityIcon type={facility.icon} />
                                    </div>

                                    <h3 className="mb-3 text-lg font-bold">
                                        {facility.title}
                                    </h3>

                                    <p className="leading-8 text-gray-600">
                                        {facility.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    STATS
                ====================================== */}

                <section
                    className="
                        bg-gray-950
                        py-16
                        text-white
                    "
                >
                    <div
                        className="
                            mx-auto
                            grid
                            max-w-7xl
                            grid-cols-2
                            gap-8
                            px-6
                            text-center
                            md:grid-cols-4
                            md:px-10
                        "
                    >
                        <Stat number="+۳۰" label="اتاق و سوئیت" />

                        <Stat number="+۱۰" label="سال تجربه" />

                        <Stat number="+۵۰۰۰" label="مهمان راضی" />

                        <Stat number="۲۴/۷" label="پشتیبانی" />
                    </div>
                </section>

                {/* =====================================
                    GALLERY
                ====================================== */}

                <section className="bg-[#F8F6F1] py-24">
                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            px-6
                            md:px-10
                            lg:px-12
                        "
                    >
                        <SectionTitle
                            centered
                            eyebrow="گالری تصاویر"
                            title="نگاهی به فضای هتل آریا"
                        />

                        <div
                            className="
                                mt-12
                                grid
                                grid-cols-2
                                gap-4
                                md:grid-cols-4
                            "
                        >
                            {[
                                "/pictures/gallery-1.png",
                                "/pictures/gallery-2.png",
                                "/pictures/gallery-3.png",
                                "/pictures/gallery-4.png",
                            ].map((image) => (
                                <img
                                    key={image}
                                    src={image}
                                    alt="گالری هتل آریا"
                                    className="
                                        h-56
                                        w-full
                                        rounded-xl
                                        object-cover
                                        transition
                                        duration-300
                                        hover:scale-[1.02]
                                        md:h-72
                                    "
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    TESTIMONIAL
                ====================================== */}

                <section className="py-24">
                    <div
                        className="
                            mx-auto
                            max-w-7xl
                            px-6
                            md:px-10
                            lg:px-12
                        "
                    >
                        <SectionTitle
                            centered
                            eyebrow="نظر مهمانان"
                            title="تجربه اقامت در هتل آریا"
                        />

                        <div
                            className="
                                mt-12
                                grid
                                grid-cols-1
                                gap-7
                                md:grid-cols-3
                            "
                        >
                            {testimonialData.map((testimonial) => (
                                <article
                                    key={testimonial.id}
                                    className="
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        p-7
                                        shadow-sm
                                    "
                                >
                                    <FaQuoteRight
                                        className="
                                            mb-5
                                            text-3xl
                                            text-[#C9A227]
                                        "
                                    />

                                    <p
                                        className="
                                            min-h-[100px]
                                            leading-8
                                            text-gray-600
                                        "
                                    >
                                        {testimonial.comment}
                                    </p>

                                    <div
                                        className="
                                            mt-6
                                            flex
                                            items-center
                                            justify-between
                                            border-t
                                            pt-5
                                        "
                                    >
                                        <strong>{testimonial.name}</strong>

                                        <div className="flex gap-1 text-[#C9A227]">
                                            {Array.from(
                                                {
                                                    length: testimonial.rating,
                                                },
                                                (_, index) => (
                                                    <FaStar key={index} />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    CONTACT
                ====================================== */}

                <section
                    id="contact"
                    className="
                        bg-gray-950
                        py-24
                        text-white
                    "
                >
                    <div
                        className="
                            mx-auto
                            grid
                            max-w-7xl
                            grid-cols-1
                            gap-12
                            px-6
                            md:px-10
                            lg:grid-cols-2
                            lg:px-12
                        "
                    >
                        <div>
                            <span
                                className="
                                    mb-3
                                    block
                                    font-medium
                                    text-[#C9A227]
                                "
                            >
                                تماس با ما
                            </span>

                            <h2
                                className="
                                    mb-6
                                    text-3xl
                                    font-bold
                                    md:text-4xl
                                "
                            >
                                برای رزرو یا دریافت اطلاعات با ما در ارتباط
                                باشید
                            </h2>

                            <p
                                className="
                                    mb-8
                                    max-w-xl
                                    leading-9
                                    text-gray-400
                                "
                            >
                                همکاران ما در تمام ساعات شبانه‌روز آماده
                                پاسخگویی به سوالات شما هستند.
                            </p>

                            <ContactItem
                                icon={<FaPhoneAlt />}
                                title="شماره تماس"
                                value={hotelData.phone}
                                href={`tel:${hotelData.phone}`}
                            />

                            <ContactItem
                                icon={<FaEnvelope />}
                                title="ایمیل"
                                value={hotelData.email}
                                href={`mailto:${hotelData.email}`}
                            />

                            <ContactItem
                                icon={<FaMapMarkerAlt />}
                                title="آدرس"
                                value={hotelData.address}
                            />
                        </div>

                        <form
                            className="
                                rounded-2xl
                                bg-white
                                p-7
                                text-gray-900
                                md:p-9
                            "
                        >
                            <h3
                                className="
                                    mb-7
                                    text-2xl
                                    font-bold
                                "
                            >
                                ارسال پیام
                            </h3>

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    md:grid-cols-2
                                "
                            >
                                <ContactInput
                                    label="نام و نام خانوادگی"
                                    type="text"
                                />

                                <ContactInput label="شماره تماس" type="tel" />
                            </div>

                            <div className="mt-5">
                                <ContactInput label="ایمیل" type="email" />
                            </div>

                            <div className="mt-5">
                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    پیام شما
                                </label>

                                <textarea
                                    rows="5"
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        outline-none
                                        transition
                                        focus:border-[#C9A227]
                                    "
                                />
                            </div>

                            <button
                                type="button"
                                className="
                                    mt-5
                                    w-full
                                    rounded-lg
                                    bg-[#C9A227]
                                    px-6
                                    py-3.5
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-[#b69120]
                                "
                            >
                                ارسال پیام
                            </button>
                        </form>
                    </div>
                </section>

                {/* =====================================
                    CTA
                ====================================== */}

                <section
                    className="
                        bg-[#C9A227]
                        px-6
                        py-14
                        text-white
                    "
                >
                    <div
                        className="
                            mx-auto
                            flex
                            max-w-7xl
                            flex-col
                            items-center
                            justify-between
                            gap-7
                            text-center
                            md:flex-row
                            md:text-right
                        "
                    >
                        <div>
                            <h2 className="text-2xl font-bold md:text-3xl">
                                برای یک اقامت خاطره‌انگیز آماده‌اید؟
                            </h2>

                            <p className="mt-3 text-white/80">
                                همین حالا اتاق مناسب خود را پیدا کنید.
                            </p>
                        </div>

                        <Link
                            href="/rooms"
                            className="
                                rounded-lg
                                bg-gray-950
                                px-8
                                py-3.5
                                font-medium
                                text-white
                                transition
                                hover:bg-gray-800
                            "
                        >
                            رزرو اتاق
                        </Link>
                    </div>
                </section>

                <Footer hotel={hotelData} />
            </main>
        </>
    );
}

/*
|--------------------------------------------------------------------------
| Component های کوچک صفحه
|--------------------------------------------------------------------------
*/

function SectionTitle({ eyebrow, title, description, centered = false }) {
    return (
        <div
            className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
        >
            <span
                className="
                    mb-3
                    block
                    font-medium
                    text-[#A98518]
                "
            >
                {eyebrow}
            </span>

            <h2
                className="
                    text-3xl
                    font-bold
                    leading-normal
                    md:text-4xl
                "
            >
                {title}
            </h2>

            {description && (
                <p
                    className="
                        mt-5
                        leading-8
                        text-gray-600
                    "
                >
                    {description}
                </p>
            )}
        </div>
    );
}

function BookingField({ icon, label, children }) {
    return (
        <div
            className="
                flex
                min-h-[74px]
                items-center
                gap-4
                rounded-xl
                border
                border-gray-200
                px-4
            "
        >
            <span className="text-xl text-[#C9A227]">{icon}</span>

            <div className="min-w-0 flex-1">
                <label
                    className="
                        mb-1
                        block
                        text-xs
                        text-gray-500
                    "
                >
                    {label}
                </label>

                {children}
            </div>
        </div>
    );
}

function FacilityIcon({ type }) {
    const icons = {
        wifi: <FaWifi />,
        restaurant: <FaUtensils />,
        parking: <FaParking />,
        service: <FaConciergeBell />,
        pool: <FaSwimmingPool />,
        breakfast: <FaCoffee />,
        car: <FaCar />,
    };

    return icons[type] ?? <FaStar />;
}

function Stat({ number, label }) {
    return (
        <div>
            <strong
                className="
                    block
                    text-3xl
                    text-[#C9A227]
                    md:text-4xl
                "
            >
                {number}
            </strong>

            <span
                className="
                    mt-2
                    block
                    text-sm
                    text-gray-300
                "
            >
                {label}
            </span>
        </div>
    );
}

function ContactItem({ icon, title, value, href }) {
    const content = (
        <div
            className="
                flex
                items-center
                gap-4
            "
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/10
                    text-[#C9A227]
                "
            >
                {icon}
            </div>

            <div>
                <span className="text-sm text-gray-400">{title}</span>

                <p className="mt-1">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="mb-5">
            {href ? <a href={href}>{content}</a> : content}
        </div>
    );
}

function ContactInput({ label, type }) {
    return (
        <div>
            <label
                className="
                    mb-2
                    block
                    text-sm
                    font-medium
                "
            >
                {label}
            </label>

            <input
                type={type}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-[#C9A227]
                "
            />
        </div>
    );
}
