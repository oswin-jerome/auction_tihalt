<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuctionResource;
use App\Models\AppLog;
use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserAuctionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(
            "User/Auction/Index",
            [
                "auctions" => Auction::all()
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Auction $auction)
    {
        // return new AuctionResource($auction);
        return Inertia::render(
            "User/Auction/Show",
            [
                "auction" => new AuctionResource($auction)
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Auction $auction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Auction $auction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Auction $auction)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function add_bid(Auction $auction, Request $request)
    {
        $data = $request->validate([
            "amount" => "required|numeric"
        ]);

        $bid = new Bid();
        $bid->amount = $data['amount'];
        $bid->auction_id = $auction->id;
        $bid->user_id = Auth::id();

        $bid->save();

        AppLog::create([
            "event" => "Payment received",
            "message" => "Joining fee Rs." . $auction->joining_fee . " received"
        ]);

        AppLog::create([
            "event" => "New Bid",
            "message" =>
            "New Bid for auction: " . $auction->product_name,
        ]);


        return back();
    }
}
