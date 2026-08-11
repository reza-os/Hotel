<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('room_id')
                ->constrained()
                ->restrictOnDelete();

            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedInteger('guests');
            $table->decimal('total_price', 12, 0);
            $table->enum('status', [
                'pending',
                'confirmed',
                'rejected',
                'cancelled',
                'completed',
            ])->default('pending');
            $table->text('admin_note')->nullable();
            $table->timestamps();
            $table->index(['check_in', 'check_out']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};