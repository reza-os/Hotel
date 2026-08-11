<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with([
            'user:id,name,email',
            'room:id,room_number,title',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Admin/Reservations/Index',
            [
                'reservations' => $reservations,
            ]
        );
    }


    public function approve(Reservation $reservation)
    {
        if ($reservation->status !== 'pending') {
            return back()->withErrors([
                'reservation' => 'این رزرو دیگر در انتظار تایید نیست.',
            ]);
        }

        $conflict = Reservation::where(
            'room_id',
            $reservation->room_id
        )
            ->where('id', '!=', $reservation->id)
            ->where('status', 'confirmed')

            // تداخل زمانی
            ->where('check_in', '<', $reservation->check_out)
            ->where('check_out', '>', $reservation->check_in)

            ->exists();

        if ($conflict) {
            return back()->withErrors([
                'reservation' =>
                    'این اتاق در تاریخ انتخاب شده قبلاً رزرو شده است.',
            ]);
        }

        $reservation->update([
            'status' => 'confirmed',
        ]);

        return back()->with(
            'success',
            'رزرو با موفقیت تایید شد.'
        );
    }


    public function reject(Reservation $reservation)
    {
        if ($reservation->status !== 'pending') {
            return back()->withErrors([
                'reservation' => 'این رزرو دیگر در انتظار بررسی نیست.',
            ]);
        }

        $reservation->update([
            'status' => 'rejected',
        ]);

        return back()->with(
            'success',
            'رزرو رد شد.'
        );
    }
}