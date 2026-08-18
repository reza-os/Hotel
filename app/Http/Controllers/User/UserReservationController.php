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
    public function index(Request $request)
    {
        $reservations = Reservation::with('room')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render(
            'User/Reservations/Index',
            [
                'reservations' => $reservations,
            ]
        );
    }


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
            | اتاق را قفل می‌کنیم
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

            if ($validated['guests'] > $room->capacity) {
                throw ValidationException::withMessages([
                    'guests' =>
                        'تعداد مهمانان بیشتر از ظرفیت اتاق است.',
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | بررسی تداخل رزرو
            |--------------------------------------------------------------------------
            */

            $conflict = Reservation::where(
                'room_id',
                $room->id
            )
                ->whereIn(
                    'status',
                    [
                        'pending',
                        'confirmed',
                    ]
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
            | قیمت را در Backend حساب می‌کنیم
            |--------------------------------------------------------------------------
            */

            $totalPrice =
                $nights * (int) $room->price;


            /*
            |--------------------------------------------------------------------------
            | ثبت رزرو
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
}