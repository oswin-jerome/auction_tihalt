import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import UserLayout from "@/Layouts/UserLayout";
import { Auction } from "@/types";
import { Link } from "@inertiajs/react";
import { Clock } from "lucide-react";
import moment from "moment";

const Participated = ({ auctions }: { auctions: Auction[] }) => {
    return (
        <UserLayout>
            <div className="grid grid-cols-4 gap-4">
                {auctions.map((auction) => {
                    return (
                        <Card key={auction.id} className="flex flex-col">
                            <CardHeader>
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    // src={auction.image}
                                    // alt={auction.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h3 className="font-semibold text-lg mb-2">
                                    {auction.product_name}
                                </h3>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Current Bid
                                    </span>
                                    <span className="font-medium">
                                        {auction.highest_bid?.amount}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Your Bid
                                    </span>
                                    <span className="font-medium">
                                        {auction.my_bids[0]?.amount}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {moment(auction.end_time).fromNow()}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Badge
                                // variant={
                                //     auction.status === "active"
                                //         ? "default"
                                //         : auction.status === "won"
                                //         ? "success"
                                //         : auction.status === "lost"
                                //         ? "destructive"
                                //         : "secondary"
                                // }
                                >
                                    {auction.status.charAt(0).toUpperCase() +
                                        auction.status.slice(1)}
                                </Badge>
                                <Button variant="outline" asChild>
                                    <Link
                                        href={route(
                                            "user.auctions.show",
                                            auction.id
                                        )}
                                    >
                                        View Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </UserLayout>
    );
};

export default Participated;
