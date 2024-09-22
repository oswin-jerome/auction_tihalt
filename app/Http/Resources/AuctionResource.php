<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AuctionResource extends JsonResource
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
        $data['my_bids'] = $this->bids()->where("user_id", Auth::id())->orderBy("amount", "ASC")->get();
        $data['highest_bid'] = $this->bids()->orderBy("amount", "ASC")->first();

        return $data;
    }
}
