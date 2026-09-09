<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ReservationController;

use App\Http\Controllers\User\UserRoomController;
use App\Http\Controllers\User\UserReservationController;
use App\Http\Controllers\User\UserDashboardController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Room;


/*
|--------------------------------------------------------------------------
| Home
|--------------------------------------------------------------------------
*/

Route::get('/', function () {

    $featuredRooms = Room::query()
        ->where('is_active', true)
        ->where('operational_status', 'ready')
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('HotelHomepage', [
        'featuredRooms' => $featuredRooms,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);

})->name('home');

/*
|--------------------------------------------------------------------------
| Public Rooms
|--------------------------------------------------------------------------
|
| مشاهده اتاق‌ها نیاز به لاگین ندارد.
| کاربر فقط هنگام رزرو مجبور به ورود می‌شود.
|
*/

Route::get(
    '/rooms',
    [UserRoomController::class, 'index']
)->name('rooms.index');


Route::get(
    '/rooms/{room}',
    [UserRoomController::class, 'show']
)->name('rooms.show');


/*
|--------------------------------------------------------------------------
| Authenticated User
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | User Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [UserDashboardController::class, 'index']
    )->name('user.dashboard');


    /*
    |--------------------------------------------------------------------------
    | User Reservations
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/my-reservations',
        [UserReservationController::class, 'index']
    )->name('reservations.index');


    Route::post(
        '/reservations',
        [UserReservationController::class, 'store']
    )->name('reservations.store');


    Route::patch(
        '/my-reservations/{reservation}/cancel',
        [UserReservationController::class, 'cancel']
    )->name('reservations.cancel');


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/profile',
        [ProfileController::class, 'edit']
    )->name('profile.edit');


    Route::patch(
        '/profile',
        [ProfileController::class, 'update']
    )->name('profile.update');


    Route::delete(
        '/profile',
        [ProfileController::class, 'destroy']
    )->name('profile.destroy');
});


/*
|--------------------------------------------------------------------------
| Admin Panel
|--------------------------------------------------------------------------
*/

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admin'])
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/dashboard',
            [AdminDashboardController::class, 'index']
        )->name('dashboard');


        /*
        |--------------------------------------------------------------------------
        | Rooms
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'rooms',
            RoomController::class
        )->except([
            'show'
        ]);


        Route::patch(
            '/rooms/{room}/toggle-active',
            [RoomController::class, 'toggleActive']
        )->name('rooms.toggle-active');


        Route::patch(
            '/rooms/{room}/status',
            [RoomController::class, 'updateOperationalStatus']
        )->name('rooms.status');


        /*
        |--------------------------------------------------------------------------
        | Reservations
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/reservations',
            [ReservationController::class, 'index']
        )->name('reservations.index');


        Route::patch(
            '/reservations/{reservation}/approve',
            [ReservationController::class, 'approve']
        )->name('reservations.approve');


        Route::patch(
            '/reservations/{reservation}/reject',
            [ReservationController::class, 'reject']
        )->name('reservations.reject');
    });


require __DIR__ . '/auth.php';
