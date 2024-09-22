<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AuctionResourceAdmin extends JsonResource
{
    public static $wrap = "";
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['bids'] = BidWithUser::collection($this->bids()->orderBy("amount", "ASC")->get());
        $data['highest_bid'] = $this->bids()->orderBy("amount", "ASC")->first();
        $data['winner'] = $this->winner;
        $data['winner_bid'] = $this->winningBid;
        if ($this->start_time < Carbon::now()) {
            $data['status'] = "active";
        }
        if ($this->end_time < Carbon::now()) {
            $data['status'] = "closed";
        }
        return $data;
    }
}
