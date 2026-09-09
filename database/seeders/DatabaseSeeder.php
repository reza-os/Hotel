<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Admin
        |--------------------------------------------------------------------------
        */

        $admin = User::updateOrCreate(
            [
                'email' => 'admin@aria.test',
            ],
            [
                'name' => 'مدیر هتل آریا',
                'password' => Hash::make('12345678'),
            ]
        );

        $admin->is_admin = true;
        $admin->save();


        /*
        |--------------------------------------------------------------------------
        | User
        |--------------------------------------------------------------------------
        */

        $user = User::updateOrCreate(
            [
                'email' => 'user@aria.test',
            ],
            [
                'name' => 'رضا احمدی',
                'password' => Hash::make('12345678'),
            ]
        );

        $user->is_admin = false;
        $user->save();


        /*
        |--------------------------------------------------------------------------
        | Rooms
        |--------------------------------------------------------------------------
        */

        Room::updateOrCreate(
            [
                'room_number' => '101',
            ],
            [
                'title' => 'اتاق استاندارد دو نفره',
                'type' => 'double',
                'capacity' => 2,
                'price' => 2500000,

                'description' =>
                    'اتاقی آرام و مجهز برای اقامت دو نفر با امکانات رفاهی مناسب.',

                'image' => '/pictures/gallery-1.png',

                'amenities' => [
                    'WiFi',
                    'تلویزیون',
                    'صبحانه',
                ],

                'is_active' => true,
                'operational_status' => 'ready',
            ]
        );


        Room::updateOrCreate(
            [
                'room_number' => '201',
            ],
            [
                'title' => 'اتاق دلوکس',
                'type' => 'deluxe',
                'capacity' => 3,
                'price' => 3900000,

                'description' =>
                    'اتاق دلوکس با فضای بزرگ، طراحی مدرن و امکانات کامل برای اقامتی راحت.',

                'image' => '/pictures/about-hotel.png',

                'amenities' => [
                    'WiFi',
                    'تلویزیون',
                    'صبحانه',
                    'مینی بار',
                ],

                'is_active' => true,
                'operational_status' => 'ready',
            ]
        );


        Room::updateOrCreate(
            [
                'room_number' => '301',
            ],
            [
                'title' => 'سوئیت رویال',
                'type' => 'suite',
                'capacity' => 4,
                'price' => 5900000,

                'description' =>
                    'سوئیت بزرگ و لوکس مناسب خانواده با فضای بیشتر و امکانات ویژه.',

                'image' => '/pictures/hotel-banner.png',

                'amenities' => [
                    'WiFi',
                    'تلویزیون',
                    'صبحانه',
                    'مینی بار',
                    'حمام اختصاصی',
                ],

                'is_active' => true,
                'operational_status' => 'ready',
            ]
        );


        /*
        |--------------------------------------------------------------------------
        | Room Under Maintenance
        |--------------------------------------------------------------------------
        */

        Room::updateOrCreate(
            [
                'room_number' => '401',
            ],
            [
                'title' => 'اتاق VIP',
                'type' => 'deluxe',
                'capacity' => 2,
                'price' => 4800000,

                'description' =>
                    'اتاق ویژه هتل که در حال حاضر برای تعمیرات غیرفعال است.',

                'image' => '/pictures/gallery-4.png',

                'amenities' => [
                    'WiFi',
                    'تلویزیون',
                ],

                'is_active' => true,
                'operational_status' => 'maintenance',
            ]
        );
    }
}