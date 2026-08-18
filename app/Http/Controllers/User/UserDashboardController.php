<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $reservations = Reservation::with('room')
            ->where('user_id', $userId)
            ->get();

        $stats = [
            'total' => $reservations->count(),
            'pending' => $reservations->where('status', 'pending')->count(),
            'confirmed' => $reservations->where('status', 'confirmed')->count(),
            'completed' => $reservations->where('status', 'completed')->count(),
        ];

        $nextReservation = Reservation::with('room')
            ->where('user_id', $userId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where('check_in', '>=', now()->toDateString())
            ->orderBy('check_in')
            ->first();

        $recentReservations = Reservation::with('room')
            ->where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/Dashboard', [
            'stats' => $stats,
            'nextReservation' => $nextReservation,
            'recentReservations' => $recentReservations,
        ]);
    }
}