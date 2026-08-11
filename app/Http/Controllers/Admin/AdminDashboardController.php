<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Room;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = today();

        $totalRooms = Room::count();

        $activeRooms = Room::where('is_active', true)->count();

        $inactiveRooms = Room::where('is_active', false)->count();

        $maintenanceRooms = Room::where(
            'operational_status',
            'maintenance'
        )->count();


        /*
        |--------------------------------------------------------------------------
        | اتاق‌های اشغال امروز
        |--------------------------------------------------------------------------
        */

        $occupiedRooms = Room::whereHas('reservations', function ($query) use ($today) {
            $query
                ->where('status', 'confirmed')
                ->whereDate('check_in', '<=', $today)
                ->whereDate('check_out', '>', $today);
        })->count();


        /*
        |--------------------------------------------------------------------------
        | اتاق‌های رزرو شده برای آینده
        |--------------------------------------------------------------------------
        */

        $futureReservedRooms = Room::whereHas('reservations', function ($query) use ($today) {
            $query
                ->where('status', 'confirmed')
                ->whereDate('check_in', '>', $today);
        })->count();


        /*
        |--------------------------------------------------------------------------
        | اتاق‌های خالی امروز
        |--------------------------------------------------------------------------
        */

        $availableRooms = Room::where('is_active', true)
            ->where('operational_status', 'ready')
            ->whereDoesntHave('reservations', function ($query) use ($today) {
                $query
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->whereDate('check_in', '<=', $today)
                    ->whereDate('check_out', '>', $today);
            })
            ->count();


        $pendingReservations = Reservation::where(
            'status',
            'pending'
        )->count();


        $recentReservations = Reservation::with([
            'user:id,name,email',
            'room:id,room_number,title',
        ])
            ->latest()
            ->take(5)
            ->get();


        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalRooms' => $totalRooms,
                'activeRooms' => $activeRooms,
                'availableRooms' => $availableRooms,
                'occupiedRooms' => $occupiedRooms,
                'futureReservedRooms' => $futureReservedRooms,
                'maintenanceRooms' => $maintenanceRooms,
                'inactiveRooms' => $inactiveRooms,
                'pendingReservations' => $pendingReservations,
            ],

            'recentReservations' => $recentReservations,
        ]);
    }
}