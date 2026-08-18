<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoomController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'check_in' => [
                'nullable',
                'required_with:check_out',
                'date',
                'after_or_equal:today',
            ],

            'check_out' => [
                'nullable',
                'required_with:check_in',
                'date',
                'after:check_in',
            ],

            'guests' => [
                'nullable',
                'integer',
                'min:1',
            ],
        ]);

        $rooms = Room::query()
            ->where('is_active', true)
            ->where('operational_status', 'ready');


        // فیلتر ظرفیت
        if (!empty($validated['guests'])) {
            $rooms->where(
                'capacity',
                '>=',
                $validated['guests']
            );
        }


        // فیلتر بر اساس تاریخ
        if (
            !empty($validated['check_in']) &&
            !empty($validated['check_out'])
        ) {
            $rooms->whereDoesntHave(
                'reservations',
                function ($query) use ($validated) {

                    $query
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
                        );
                }
            );
        }


        return Inertia::render(
            'User/Rooms/Index',
            [
                'rooms' => $rooms
                    ->orderBy('room_number')
                    ->get(),

                'filters' => [
                    'check_in' =>
                        $validated['check_in'] ?? '',

                    'check_out' =>
                        $validated['check_out'] ?? '',

                    'guests' =>
                        $validated['guests'] ?? '',
                ],
            ]
        );
    }
}