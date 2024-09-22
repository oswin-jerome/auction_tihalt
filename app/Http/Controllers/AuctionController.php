<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuctionRequest;
use App\Http\Requests\UpdateAuctionRequest;
use App\Http\Resources\AuctionResource;
use App\Http\Resources\AuctionResourceAdmin;
use App\Models\Auction;
use Inertia\Inertia;

class AuctionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Auction::all();

        return Inertia::render("Admin/Auction/Index", [
            "auctions" => Auction::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/Auction/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuctionRequest $request)
    {
        $auction = Auction::create($request->validated());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Auction $auction)
    {
        return Inertia::render("Admin/Auction/Show", [
            "auction" => new AuctionResourceAdmin($auction)
        ]);
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
    public function update(UpdateAuctionRequest $request, Auction $auction)
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
}
