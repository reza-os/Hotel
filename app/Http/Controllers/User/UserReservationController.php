<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserReservationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | رزروهای کاربر
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $reservations = Reservation::with('room')
            ->where(
                'user_id',
                $request->user()->id
            )
            ->latest()
            ->get()
            ->map(function ($reservation) {

                /*
                 * فقط رزرو pending یا confirmed
                 * که تاریخ ورودش نرسیده، قابل لغو است.
                 */

                $reservation->can_cancel =
                    in_array(
                        $reservation->status,
                        ['pending', 'confirmed']
                    )
                    &&
                    Carbon::parse(
                        $reservation->check_in
                    )->gt(today());

                return $reservation;
            });

        return Inertia::render(
            'User/Reservations/Index',
            [
                'reservations' => $reservations,
            ]
        );
    }


    /*
    |--------------------------------------------------------------------------
    | ثبت رزرو
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => [
                'required',
                'exists:rooms,id',
            ],

            'check_in' => [
                'required',
                'date',
                'after_or_equal:today',
            ],

            'check_out' => [
                'required',
                'date',
                'after:check_in',
            ],

            'guests' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        DB::transaction(function () use (
            $request,
            $validated
        ) {

            /*
            |--------------------------------------------------------------------------
            | قفل اتاق برای جلوگیری از رزرو هم‌زمان
            |--------------------------------------------------------------------------
            */

            $room = Room::where(
                'id',
                $validated['room_id']
            )
                ->lockForUpdate()
                ->firstOrFail();


            /*
            |--------------------------------------------------------------------------
            | بررسی فعال بودن اتاق
            |--------------------------------------------------------------------------
            */

            if (
                !$room->is_active ||
                $room->operational_status !== 'ready'
            ) {
                throw ValidationException::withMessages([
                    'reservation' =>
                        'این اتاق در حال حاضر قابل رزرو نیست.',
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | بررسی ظرفیت
            |--------------------------------------------------------------------------
            */

            if (
                $validated['guests'] >
                $room->capacity
            ) {
                throw ValidationException::withMessages([
                    'guests' =>
                        'تعداد مهمانان بیشتر از ظرفیت اتاق است.',
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | بررسی تداخل زمانی
            |--------------------------------------------------------------------------
            */

            $conflict = Reservation::where(
                'room_id',
                $room->id
            )
                ->whereIn(
                    'status',
                    ['pending', 'confirmed']
                )
                ->where(
                    'check_in',
                    '<',
                    $validated['check_out']
                )
                ->where(
                    'check_out',
                    '>',
                    $validated['check_in']
                )
                ->exists();

            if ($conflict) {
                throw ValidationException::withMessages([
                    'reservation' =>
                        'این اتاق در تاریخ انتخاب‌شده قابل رزرو نیست.',
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | محاسبه تعداد شب
            |--------------------------------------------------------------------------
            */

            $checkIn = Carbon::parse(
                $validated['check_in']
            );

            $checkOut = Carbon::parse(
                $validated['check_out']
            );

            $nights = $checkIn->diffInDays(
                $checkOut
            );


            /*
            |--------------------------------------------------------------------------
            | محاسبه قیمت نهایی در Backend
            |--------------------------------------------------------------------------
            */

            $totalPrice =
                $nights * (int) $room->price;


            /*
            |--------------------------------------------------------------------------
            | ایجاد رزرو
            |--------------------------------------------------------------------------
            */

            Reservation::create([
                'user_id' =>
                    $request->user()->id,

                'room_id' =>
                    $room->id,

                'check_in' =>
                    $validated['check_in'],

                'check_out' =>
                    $validated['check_out'],

                'guests' =>
                    $validated['guests'],

                'total_price' =>
                    $totalPrice,

                'status' =>
                    'pending',
            ]);
        });


        return redirect()
            ->route('reservations.index')
            ->with(
                'success',
                'درخواست رزرو شما ثبت شد و منتظر تایید مدیر است.'
            );
    }


    /*
    |--------------------------------------------------------------------------
    | لغو رزرو
    |--------------------------------------------------------------------------
    */

    public function cancel(
        Request $request,
        Reservation $reservation
    ) {

        /*
         * کاربر نباید بتواند رزرو کاربر دیگر
         * را با تغییر ID در URL لغو کند.
         */

        if (
            $reservation->user_id !==
            $request->user()->id
        ) {
            abort(403);
        }


        /*
         * فقط pending و confirmed قابل لغو هستند.
         */

        if (
            !in_array(
                $reservation->status,
                ['pending', 'confirmed']
            )
        ) {
            return back()->withErrors([
                'reservation' =>
                    'این رزرو قابل لغو نیست.',
            ]);
        }


        /*
         * بعد از رسیدن تاریخ ورود لغو ممنوع است.
         */

        if (
            Carbon::parse(
                $reservation->check_in
            )->lte(today())
        ) {
            return back()->withErrors([
                'reservation' =>
                    'در تاریخ ورود یا بعد از آن امکان لغو رزرو وجود ندارد.',
            ]);
        }


        $reservation->update([
            'status' => 'cancelled',
        ]);


        return back()->with(
            'success',
            'رزرو با موفقیت لغو شد.'
        );
    }
}