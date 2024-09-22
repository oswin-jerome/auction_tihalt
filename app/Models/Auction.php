<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function winner()
    {
        return $this->hasOne(User::class, "id", "winner_id");
    }

    public function winningBid()
    {
        return $this->hasOne(Bid::class, "id", "bid_id");
    }
}
