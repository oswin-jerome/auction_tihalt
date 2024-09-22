import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Auction } from "@/types";
import { Link } from "@inertiajs/react";
import moment from "moment";

const ShowPage = ({ auction }: { auction: Auction }) => {
    return (
        <Authenticated>
            <div className="grid gap-4">
                <Card>
                    <CardHeader className="">
                        <div className="flex justify-between">
                            <div>
                                <CardTitle>{auction.product_name}</CardTitle>
                                <CardDescription>
                                    {auction.product_description}
                                </CardDescription>
                            </div>
                            <div>
                                <Link
                                    href={route(
                                        "admin.auction.end",
                                        auction.id
                                    )}
                                    method="post"
                                >
                                    <Button>END Auction</Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="productName">
                                    Product Price
                                </Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={auction.starting_price}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">Joining Fee</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={auction.joining_fee}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">Start Time</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={moment(auction.start_time).format(
                                        "D MMM Y"
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">End Time</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={moment(auction.end_time).format(
                                        "D MMM Y"
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">Status</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={auction.status}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">Winning Bid</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={auction?.winner_bid?.amount}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="productName">Winner</Label>
                                <Input
                                    readOnly
                                    placeholder="Enter the product name"
                                    value={auction?.winner?.name}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <div>
                                <CardTitle>Bids</CardTitle>
                                <CardDescription>
                                    List of all bids made
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auction.bids?.map((bid) => {
                                    return (
                                        <TableRow key={bid.id}>
                                            <TableCell>{bid.id}</TableCell>
                                            <TableCell>
                                                {bid.user.name}
                                            </TableCell>

                                            <TableCell>{bid.amount}</TableCell>
                                            <TableCell>
                                                {moment(bid.created_at).format(
                                                    "D MMM Y"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route(
                                                        "admin.auction.show",
                                                        bid.id
                                                    )}
                                                >
                                                    View
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
};

export default ShowPage;
