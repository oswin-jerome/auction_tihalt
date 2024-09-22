import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import UserLayout from "@/Layouts/UserLayout";
import { cn } from "@/lib/utils";
import { Auction } from "@/types";
import { Link } from "@inertiajs/react";
import { Clock, DollarSign } from "lucide-react";
import moment from "moment";

const AuctionList = ({ auctions }: { auctions: Auction[] }) => {
    return (
        <UserLayout>
            <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {auctions.map((auction) => {
                    return (
                        <Card key={auction.id}>
                            <CardHeader>
                                <CardTitle>{auction.product_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    // src={auction.imageUrl÷
                                    src="https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <p className="text-sm text-gray-600 mb-2">
                                    {auction.product_description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                                        <span className="font-bold">
                                            ${auction.starting_price}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                        <span>
                                            {moment(auction.end_time).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Link
                                    href={route(
                                        "user.auctions.show",
                                        auction.id
                                    )}
                                >
                                    <Button className="w-full">
                                        Place Bid
                                    </Button>
                                </Link>
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
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </UserLayout>
    );
};

export default AuctionList;
