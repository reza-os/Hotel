<?php

use App\Http\Controllers\ProfileController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin Controllers
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ReservationController;

// User Controllers
use App\Http\Controllers\User\UserRoomController;
use App\Http\Controllers\User\UserReservationController;
use App\Http\Controllers\User\UserDashboardController;


/*
|--------------------------------------------------------------------------
| صفحه اصلی
|--------------------------------------------------------------------------
*/

Route::get('/', function () {

    return Inertia::render('HotelHomepage', [
        'canLogin' =>
            Route::has('login'),

        'canRegister' =>
            Route::has('register'),

        'laravelVersion' =>
            Application::VERSION,

        'phpVersion' =>
            PHP_VERSION,
    ]);

});


Route::get('/forgotpass', function () {

    return Inertia::render('ForgotPassword');

});


/*
|--------------------------------------------------------------------------
| مسیرهای کاربران لاگین شده
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {


    /*
    |--------------------------------------------------------------------------
    | پنل مدیریت
    |--------------------------------------------------------------------------
    */

    Route::middleware(['admin'])->group(function () {

        Route::get(
            '/admin/dashboard',
            [AdminDashboardController::class, 'index']
        )->name('admin.dashboard');


        Route::resource(
            '/admin/rooms',
            RoomController::class
        );


        Route::resource(
            '/admin/reservations',
            ReservationController::class
        );

    });


    /*
    |--------------------------------------------------------------------------
    | داشبورد کاربر
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [UserDashboardController::class, 'index']
    )->name('user.dashboard');


    /*
    |--------------------------------------------------------------------------
    | اتاق‌های هتل برای کاربران
    |--------------------------------------------------------------------------
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
    | رزروهای کاربر
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
    | پروفایل
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



require __DIR__ . '/auth.php';