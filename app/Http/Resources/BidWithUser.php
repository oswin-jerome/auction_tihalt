<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BidWithUser extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['auction'] = $this->auction;
        $data['user'] = $this->user;
        $topBid = $this->auction->bids()->orderBy("amount", "ASC")->first();
        if ($topBid->amount == $this->amount) {
            $data['status'] = "active";
        } else {
            $data['status'] = "outbid";
        }
        return $data;
    }
}
