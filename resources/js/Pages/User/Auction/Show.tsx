import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/Components/ui/separator";
import UserLayout from "@/Layouts/UserLayout";
import { cn } from "@/lib/utils";
import { Auction } from "@/types";
import { useForm } from "@inertiajs/react";
import { Clock, DollarSign } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const ShowAuction = ({ auction }: { auction: Auction }) => {
    const [bidAmount, setBidAmount] = useState("");
    const { data, setData, post, processing } = useForm({
        amount: 0,
    });
    // Mock data - replace with actual data fetching in a real application
    const auctionData = {
        name: "Vintage Leather Armchair",
        description:
            "A beautiful, well-preserved leather armchair from the 1960s. Perfect for any vintage enthusiast or interior designer looking to add a touch of retro charm to their space.",
        startingPrice: 500,
        currentBid: 750,
        myBids: [600, 700],
        endTime: new Date("2023-07-30T15:00:00"),
    };

    const handleBid = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle bid submission logic here
        if (data.amount >= parseInt(auction.starting_price)) {
            alert("Bid can't be higher than starting amount");
            return;
        }
        // if (
        //     data.amount >=
        //     (auction.highest_bid?.amount ?? parseInt(auction.starting_price))
        // ) {
        //     alert("Bid can't be less than lowest amount");
        //     return;
        // }

        if (!confirm("Do you want to pay?")) {
            return;
        }

        post(route("user.add_bid", auction.id), {
            onSuccess: () => {
                alert("Bid added");
            },
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const timeRemaining = () => {
        const now = new Date();
        const diff = auctionData.endTime.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${days}d ${hours}h ${minutes}m`;
    };

    return (
        <UserLayout>
            <div className="mt-10">
                <Card className="shadow-none border-none">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold">
                            {auction.product_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <p className="text-muted-foreground">
                            {auction.product_description}
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <Label className="text-sm font-medium">
                                    Product Price
                                </Label>
                                <p className="text-2xl font-semibold">
                                    {auction.starting_price}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">
                                    Joining Fee
                                </Label>
                                <p className="text-2xl font-semibold text-primary">
                                    {auction.joining_fee}
                                </p>
                            </div>
                            {/* <div>
                                <Label className="text-sm font-medium">
                                    Current Highest Bid
                                </Label>
                                <p className="text-2xl font-semibold text-primary">
                                    {auction.highest_bid?.amount ??
                                        auction.starting_price}
                                </p>
                            </div> */}
                        </div>
                        <div>
                            <Label className="text-sm font-medium">
                                Your Bids
                            </Label>
                            <ul className="list-disc list-inside">
                                {auction.my_bids.map((bid, index) => (
                                    <li
                                        key={index}
                                        className="text-muted-foreground"
                                    >
                                        {formatCurrency(bid.amount)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-5 w-5" />
                            <span>
                                Auction ends in:{" "}
                                {moment(auction.end_time).fromNow()}
                            </span>
                            <Badge
                                variant={"outline"}
                                className={cn({
                                    "border-orange-600 text-orange-600":
                                        auction.status == "upcoming",
                                    "border-green-600 text-green-600":
                                        auction.status == "active",
                                    "border-blue-600 text-blue-600":
                                        auction.status == "completed",
                                })}
                            >
                                {auction.status}
                            </Badge>
                        </div>
                        <Separator />
                        <form onSubmit={handleBid} className="space-y-4">
                            <Label htmlFor="bid-amount">Place Your Bid</Label>
                            <div className="flex gap-2">
                                <div className="relative flex-grow">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="bid-amount"
                                        type="number"
                                        placeholder="Enter bid amount"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData(
                                                "amount",
                                                e.target.valueAsNumber
                                            )
                                        }
                                        className="pl-10"
                                        // min={auctionData.currentBid + 1}
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <Button
                                    disabled={
                                        processing || auction.status != "active"
                                    }
                                    type="submit"
                                >
                                    Place Bid
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                        By placing a bid, you agree to our terms and conditions.
                    </CardFooter>
                </Card>
            </div>
        </UserLayout>
    );
};

export default ShowAuction;
