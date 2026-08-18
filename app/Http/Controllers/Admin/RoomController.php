<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $today = today();

        $rooms = Room::with([
            'reservations' => function ($query) use ($today) {
                $query
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->whereDate('check_in', '<=', $today)
                    ->whereDate('check_out', '>', $today);
            }
        ])
            ->latest()
            ->get()
            ->map(function ($room) {

                if (!$room->is_active) {
                    $room->current_status = 'inactive';

                    return $room;
                }

                if ($room->operational_status === 'maintenance') {
                    $room->current_status = 'maintenance';

                    return $room;
                }

                $confirmed = $room->reservations
                    ->firstWhere('status', 'confirmed');

                if ($confirmed) {
                    $room->current_status = 'occupied';

                    return $room;
                }

                $pending = $room->reservations
                    ->firstWhere('status', 'pending');

                if ($pending) {
                    $room->current_status = 'pending';

                    return $room;
                }

                $room->current_status = 'available';

                return $room;
            });

        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => $rooms,
        ]);
    }


    public function toggleActive(Room $room)
    {
        $room->update([
            'is_active' => !$room->is_active,
        ]);

        return back()->with(
            'success',
            'وضعیت اتاق با موفقیت تغییر کرد.'
        );
    }


    public function updateOperationalStatus(
        Request $request,
        Room $room
    ) {
        $validated = $request->validate([
            'operational_status' => [
                'required',
                'in:ready,maintenance',
            ],
        ]);

        $room->update($validated);

        return back()->with(
            'success',
            'وضعیت اتاق بروزرسانی شد.'
        );
    }
    public function create()
    {
        return Inertia::render('Admin/Rooms/Create');
    }

    public function edit(Room $room)
    {
        return Inertia::render('Admin/Rooms/Edit', [
            'room' => $room,
        ]);
    }
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|unique:rooms,room_number,' . $room->id,
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $room->update($validated);

        return back()->with(
            'success',
            'اتاق با موفقیت بروزرسانی شد.'
        );
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|unique:rooms,room_number',
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Room::create($validated);

        return back()->with(
            'success',
            'اتاق با موفقیت ایجاد شد.'
        );

    }
    
    public function destroy(Room $room)
{
    if ($room->reservations()->exists()) {
        return back()->withErrors([
            'room' => 'این اتاق دارای سابقه رزرو است و نمی‌توان آن را حذف کرد. می‌توانید آن را غیرفعال کنید.',
        ]);
    }

    $room->delete();

    return back()->with(
        'success',
        'اتاق با موفقیت حذف شد.'
    );
}
    
    

}