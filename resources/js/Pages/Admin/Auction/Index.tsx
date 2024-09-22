import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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

const IndexPage = ({ auctions }: { auctions: Auction[] }) => {
    return (
        <Authenticated>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle>Auctions</CardTitle>
                            <CardDescription>
                                List of all auctions you have added
                            </CardDescription>
                        </div>
                        <Link href={route("admin.auction.create")}>
                            <Button>Add new</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Product Price</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auctions.map((auction) => {
                                return (
                                    <TableRow key={auction.id}>
                                        <TableCell>{auction.id}</TableCell>
                                        <TableCell>
                                            {auction.product_name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={"outline"}
                                                className="border-green-600 text-green-600"
                                            >
                                                {auction.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            {auction.starting_price}
                                        </TableCell>
                                        <TableCell>
                                            {auction.joining_fee}
                                        </TableCell>
                                        <TableCell>
                                            {moment(auction.start_time).format(
                                                "D MMM Y"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {moment(auction.end_time).format(
                                                "D MMM Y"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={route(
                                                    "admin.auction.show",
                                                    auction.id
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
        </Authenticated>
    );
};

export default IndexPage;
