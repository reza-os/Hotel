<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();

            $table->string('room_number')->unique();
            $table->string('title');
            $table->string('type');
            $table->unsignedInteger('capacity')->default(1);
            $table->decimal('price', 12, 0);

            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('operational_status', [
                'ready',
                'maintenance',
            ])->default('ready');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};