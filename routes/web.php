<?php

use App\Http\Controllers\AppLogController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserAuctionController;
use App\Http\Controllers\User\UserBidController;
use App\Http\Middleware\ValidateAdminMiddleware;
use App\Http\Resources\AuctionResource;
use App\Models\AppLog;
use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    $auctions = Auction::with("winner")->where("winner_id", "<>", null)->orderBy("created_at", "ASC")->get();



    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        "auctions" => $auctions
    ]);
})->name("home");


Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix("admin")->name("admin.")->middleware(['auth', 'verified', ValidateAdminMiddleware::class])->group(function () {
    Route::resource("auction", AuctionController::class);
    Route::post("auction/{auction}/end", function (Auction $auction) {

        $topBid = $auction->bids()->orderBy("amount", "ASC")->first();
        if ($topBid != null) {
            $auction->bid_id = $topBid->id;
            $auction->winner_id = $topBid->user->id;
        }

        $auction->status = "completed";
        $auction->save();

        AppLog::create([
            "event" => "Auction Closed",
            "message" =>
            "Auction closed for amount: " . $topBid->amount,
        ]);

        return back();
    })->name("auction.end");
    Route::resource("bids", BidController::class);
    Route::resource("logs", AppLogController::class);
});

Route::name("user.")->middleware(['auth', 'verified'])->group(function () {
    Route::resource("bids", UserBidController::class);

    Route::resource("auctions", UserAuctionController::class);
    Route::post("/auctions/{auction}/bids", [UserAuctionController::class, "add_bid"])->name("add_bid");

    Route::get("participated", function () {

        $bids = Bid::where("user_id", Auth::id())->pluck("auction_id");
        $auctions = Auction::whereIn("id", $bids)->get();
        return Inertia::render("User/Participated/Index", [
            "auctions" => AuctionResource::collection($auctions)
        ]);
    })->name("participated");

    Route::get("winnings", function () {

        $auctions = Auction::where("winner_id", Auth::id())->get();
        return Inertia::render("User/Participated/Index", [
            "auctions" => AuctionResource::collection($auctions)
        ]);
    })->name("winnings");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
