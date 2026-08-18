<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ReservationController;

Route::middleware(['auth'])->group(function () {

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


    Route::get('/dashboard', function () {

        if (auth()->user()->is_admin) {
            return redirect(
                route('admin.dashboard', absolute: false)
            );
        }

        return Inertia::render('User/Dashboard');

    })->name('user.dashboard');


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