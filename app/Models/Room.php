<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;


    protected $fillable = [
        'room_number',
        'title',
        'type',
        'capacity',
        'price',
        'description',
        'image',
        'amenities',
        'is_active',
        'operational_status',
    ];


    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:0',
            'amenities' => 'array',
        ];
    }


    /*
    |--------------------------------------------------------------------------
    | هر اتاق چند رزرو دارد
    |--------------------------------------------------------------------------
    */

    public function reservations(): HasMany
    {
        return $this->hasMany(
            Reservation::class
        );
    }


    /*
    |--------------------------------------------------------------------------
    | هر اتاق یک نوع دارد
    |--------------------------------------------------------------------------
    */

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(
            RoomType::class
        );
    }
}
